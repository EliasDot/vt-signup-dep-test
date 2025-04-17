// api.ts
import {Event, User} from './../app/types/index';


const api_url = "http://localhost:3000/api"


export const signin = async (user: string, password: string): Promise<boolean> => {
  const url = api_url + "/signin";
  const data = {
    user,
    password
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const getEvents = async (): Promise<Event[] | undefined> => {
  const url = api_url + "/event";
  try {
    const response = await fetch(url, {
      method: "GET"
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
export const signup = async (user: string, password: string): Promise<boolean> => {
  const url = api_url + "/signup";
  const data = {
    user,
    password
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const participate = async (a_name: string, e_name : string, e_date : string, cancel : boolean): Promise<boolean> => {
  const url = api_url + "/new_participation";
  const data = {
    a_name,
    e_name,
    e_date,
    cancel
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};


export const getParticpants = async (): Promise<User[] | undefined> => {
  const url = api_url + "/participates";
  try {
    const response = await fetch(url, {
      method: "GET"
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error api:InsertEvent: ", error);
    return [];
  }
}


export const getParticpantsForEvent = async (e_name: string, e_date: string): Promise<User[] | undefined> => {
  const url = api_url + "/participatesForEvent";
  
  const data = {
    e_name,
    e_date
  };
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

//noch nicht getestet:

export const insertEvent = async (e_organizer : string, e_name : string, e_category : string, e_date : string, e_max_count : number, e_location : string) : Promise<boolean> => {
  const url = api_url + "/createEvent";
  const data = {
    e_organizer,
    e_name,
    e_category,
    e_date,
    e_max_count, 
    e_location
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return true;
  } catch (error) {
    console.log("Error api:InsertEvent: ", error);
    return false;
  }
}