const express = require('express');
const sqlite3 = require('sqlite3');
 
const app = express();
const PORT = 3000;
const cors = require('cors');
 
app.use(cors());
app.use(express.json());
 

// db
 
const db = new sqlite3.Database('./data/database.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    (err) ? console.error(err.message) : console.log('Database connected');
  });
  
db.run(
    `
        CREATE TABLE IF NOT EXISTS account (
            a_name TEXT PRIMARY KEY,
            a_password TEXT,
            a_count_participants INTEGER,
            a_count_logged_in INTEGER
    )
    `, (err) => {
        (err) ? console.log("Error creating table") : console.log("Table account created");
});

db.run(
    `
        CREATE TABLE IF NOT EXISTS event (
            e_organizer TEXT,
            e_name TEXT,
            e_category TEXT,
            e_date DATE,
            e_max_count INTEGER,
            e_location INTEGER,
            e_count_user INTEGER,
            PRIMARY KEY(e_name, e_date)           

    )
    `, (err) => {
        (err) ? console.error(err.message) : console.log("table event created");
});
 
db.run(
    `
        CREATE TABLE IF NOT EXISTS participates (
            a_name TEXT,
            e_name TEXT,
            e_date DATE,
            participated BOOLEAN,
            PRIMARY KEY(a_name, e_name, e_date)
            FOREIGN KEY(a_name) REFERENCES account(a_name),
            FOREIGN KEY(e_name) REFERENCES event(e_name),
            FOREIGN KEY(e_date) REFERENCES event(e_date)
    )
    `, (err) => {
        (err) ? console.error(err.message) : console.log("table participates created");
});
 

// test data
 
const fs = require('fs');
const csv = require('csv-parser');
 
function importCSVToTable(csvFile, tableName, columns) {
  fs.createReadStream(csvFile)
    .pipe(csv())
    .on('data', (row) => {
      const placeholders = columns.map(() => '?').join(',');
      const sql = `INSERT INTO ${tableName} (${columns.join(',')}) VALUES (${placeholders})`;
      
      db.run(sql, Object.values(row), (err) => {
        if (err) console.error(`Daten von ${tableName} schon importiert`);
      });
    })
    .on('end', () => {
      console.log(`${tableName}-Daten importiert!`);
    });
}
 
importCSVToTable(
    './csv/test_data_account.csv',
    'account',
    ['a_name', 'a_password', 'a_count_participants', 'a_count_logged_in']
  );
  
importCSVToTable(
    './csv/test_data_event.csv',
    'event',
    ['e_organizer', 'e_name', 'e_category', 'e_date', 'e_max_count', 'e_location', 'e_count_user']
  );
  
importCSVToTable(
    './csv/test_data_participates.csv',
    'participates',
    ['a_name', 'e_name', 'e_date', 'participated'],
  );
  
// apis

app.get("/api/account", (req, res) => {
    db.all('SELECT * FROM account', (err, rows) => {
        (err) ? res.status(500).send(err.message) : res.status(200).json(rows);
    })
});

app.get("/api/event", (req, res) => {
    db.all('SELECT * FROM event', (err, rows) => {
        (err) ? res.status(500).send(err.message) : res.status(200).json(rows);
    })
});

app.get("/api/participates", (req, res) => {
    db.all('SELECT * FROM participates', (err, rows) => {
        (err) ? res.status(500).send(err.message) : res.status(200).json(rows);
    })
});

app.post("/api/participatesForEvent", (req, res) => {
    const {e_name, e_date} = req.body;
    db.all('SELECT * FROM participates WHERE e_name = ? AND e_date = ?', [e_name, e_date], (err, rows) => {
        (err) ? res.status(500).send(err.message) : res.status(200).json(rows);
    })
})

app.post("/api/signin", (req, res) => {
    const { user, password } = req.body;

    db.get('SELECT a_password FROM account WHERE a_name = ?', [user], (err, row) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send(err.message);
            return;
        }

        if (row && row.a_password === password) {
            res.status(200).send("Success");
        } else {
            res.status(400).send("User is not registered");
        }
    });

})

app.post("/api/signup", (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send("User or password are empty");
    }

    // Check if the username already exists in the database
    db.get('SELECT a_name FROM account WHERE a_name = ?', [user], (err, row) => {
        if (err) {
            console.error('Error checking user existence:', err);
            return res.status(500).send('Error checking user existence:');
        }

        // If the row is not null, the user already exists
        if (row) {
            return res.status(400).send("User already exists"); // 409 Conflict
        }

        
        // Insert the new user with the  password into the database
        db.run('INSERT INTO account (a_name, a_password, a_count_participants, a_count_logged_in) VALUES (?, ?, ?, ?)', [user, password, 0, 0], function (err) {
            if (err) {
                console.error('Error inserting the user:', err);
                return res.status(500).send('Error inserting the user:');
            }
            console.log(`New user with ID ${this.lastID} was created.`);
            res.status(200).send("User successfully registered");
        });
    });
});


app.post("/api/deleteAccount", (req, res) => {
    const {user} = req.body;

    if (!user) {
        return res.status(400).send("User is empty");
    }

    db.run('DELETE FROM account WHERE a_name = ?', [user], function (err) {
        if (err) {
            console.log("Error during Delete from account");
            return res.status(500).send(err.message);
        }
    
        console.log(`Deleted user ${user} from account`);
    
        // Run second DELETE only if first was successful
        db.run('DELETE FROM event WHERE e_organizer = ?', [user], function (err) {
            if (err) {
                console.log("Error during Delete from event", err);
                return res.status(500).send(err.message);
            }
    
            console.log(`Deleted events organized by ${user}`);
            
            // Run third DELETE
            db.run('DELETE FROM participates WHERE a_name = ?', [user], function (err) {
                if (err) {
                    console.log("Error during Delete from event", err);
                    return res.status(500).send(err.message);
                }
            
                console.log(`Deleted events organized by ${user}`);
                res.status(200).send("Delete successful");
            });
        });
    });
});

app.post("/api/deleteEvent", (req, res) => {
    const {e_name, e_date} = req.body;

    db.run('DELETE FROM participates WHERE e_name = ? AND e_date = ?', [e_name, e_date], function (err) {
        if (err) {
            console.log("Error during Delete from event", err);
            return res.status(500).send(err.message);
        }

        db.run('DELETE FROM event WHERE e_name = ?', [e_name], function (err) {
            if (err) {
                console.log("Error during Delete from event", err);
                return res.status(500).send(err.message);
            }
        
            console.log(`Deleted events organized`);
            res.status(200).send("Delete successful");
        });
    });
});

app.post("/api/create_event", (req, res) => {
    const {e_organizer, e_name, e_category, e_date, e_max_count, e_location} = req.body;

    db.run(
            'INSERT INTO event(e_organizer, e_name, e_category, e_date, e_max_count, e_location, e_count_user) VALUES(?, ?, ?, ?, ?, ?, ?)', [e_organizer, e_name, e_category, e_date, e_max_count, e_location, 0]
        , (err) => {
            (err) ? res.status(500).send(err.message) : res.status(200).json({result: "success"});
    });

});

app.post("/api/new_participation", (req, res) => {
    const {a_name, e_name, e_date, cancel} = req.body;
    const participated = "False";

    db.get('SELECT e_count_user FROM event WHERE e_name = ? AND e_date = ?', [e_name, e_date], (err, row) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send(err.message);
            return;
        }
        if (cancel){
            e_count_user = row.e_count_user - 1;
        }else{
            e_count_user = row.e_count_user + 1;
        }
        db.run(
            "UPDATE event SET e_count_user = ? WHERE e_name = ? AND e_date = ?", [e_count_user, e_name, e_date], (err) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                if (cancel){
                    console.log("Try delete:", a_name, e_name, e_date);

                    db.run(
                        'DELETE FROM participates WHERE a_name = ? AND e_name = ? AND e_date = ?', [a_name, e_name, e_date], (err) =>{
                            (err) ? res.status(500).send(err.message) : res.status(200).json({result: "success"});
                        }
                    );
                }else{
                    db.run(
                        'INSERT INTO participates(a_name, e_name, e_date, participated) VALUES(?, ?, ?, ?)', [a_name, e_name, e_date, participated]
                        , (err) => {
                            (err) ? res.status(500).send(err.message) : res.status(200).json({result: "success"});
                        });
                }
            }
        );
    });
});

app.post("/api/set_participation", (req, res) => {
    const {a_name, e_name, e_date, participated} = req.body; 

    db.run(
        'UPDATE participates SET participated = ? WHERE a_name = ? AND e_name = ? AND e_date = ?', [participated, a_name, e_name, e_date]
        , (err) => {
            (err) ? res.status(500).send(err.message) : res.status(200).json({result: "success"});
    });
});

app.listen(PORT, () => console.log("App alive on localhost: " + PORT));
