# InoWeek VT-Signup

## API's
- input via parameters (?par=val&par2= ...)

| path                      | input                                                                 | result                                                             | type |   |
|---------------------------|-----------------------------------------------------------------------|--------------------------------------------------------------------|------|---|
| /api/account              | /                                                                     | account table                                                      | GET  |   |
| /api/event                | /                                                                     | event table                                                        | GET  |   |
| /api/participates         | /                                                                     | participates table                                                 | GET  |   |
| /api/participatesForEvent | e_name, e_date                                                        | participants of a specific event                                   | POST |   |
| /api/signin               | user, password                                                        | "success" (200) / "User is not registered" (400)                                   | POST |   |
| /api/signup               | user, password                                                        | "User already exists" (400) / "User successfully registered" (200) | POST |   |
| /api/deleteAccount        | user                                                                  | "User is empty" (400) / "Delete successful" (200)                  | POST |   |
| /api/deleteEvent          | e_name, e_date                                                        | "Delete successful" (200) / "Error during delete" (500)            | POST |   |
| /api/createEvent          | e_organizer, e_name, e_category, e_date, e_max_count, e_location      | "success" (200) / error message (500)                              | POST |   |
| /api/new_participation    | a_name, e_name, e_date, cancel (Boolean als String geschrieben)       | "success" (200) / "server error" (500) / error message (500)       | POST |   |
| /api/set_participation    | a_name, e_name, e_date, participated (Boolean als String geschrieben) | error message (500) / "success" (200)                              | POST     |   |

## Development: 
### Automatic start of Server with VS Code ">Tasks: Run Task": 
Start Client and Server

### Start Server
(in cd server)
#### With node 
```bash
npm install 
```
In the output, you'll find options to open the app
```bash
npm run dev
```
#### With podman: 
```bash
podman-compose up --build 
```

### Start Client (React Native App) 
(in cd client)
```bash
npm install
```
```bash
npm run start
```
##### Login 
Test data gets load via csv test user is: "user3", "password3"

## Hosting (with docker): 
(in cd vt-signup)
```bash
podman-compose up --build
```

### TODO: 
- Separate csv test data for development and hosting  