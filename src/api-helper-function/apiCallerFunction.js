// POST request to the Laravel backend
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const register = async (formData) => {
  try {
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // Ensure Laravel returns JSON
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message); // Throw an error with the error message from the backend
    }

    const data = await response.json();
    console.log("Success:", data);
    return data; // Return the data for further processing
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const Login = async (formData) => {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Add your authentication token or credentials here
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.token) {
        // Token is present in the response data
        // Perform the necessary actions with the token

        // return { token: responseData.token };
        console.log(responseData.token);
        Cookies.set("token", responseData.token, { expires: 10 });
        return responseData;
      } else {
        throw new Error("Token not found in the response data");
      }
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const getUserByEmail = async (formData) => {
  fetch(`http://localhost:8000/api/register=${formData.email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json", // Ensure Laravel returns JSON
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      // Handle success (e.g., redirect, show message)
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors here (e.g., show error message)
    });
};

export const logout = async () => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Clear the HTTP-only cookie containing the token
      // Get the current date and time
      const now = new Date();

      // Set the expiry time to be in the past (e.g., 1 second ago)
      const expiryTime = new Date(now.getTime() - 1000); // 1000 milliseconds = 1 second

      // Convert the expiry time to a UTC string
      const expiryTimeString = expiryTime.toUTCString();

      // Set the cookie with the expiry time in the past
      document.cookie = `token=; expires=${expiryTimeString}; path=/;`;

      return true; // Indicate successful logout
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }
  } catch (error) {
    console.error("Logout failed:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// api.js
export const SelectedDate = async (startDate) => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // Assuming Login function returns user data or token
    const response = await fetch("http://localhost:8000/api/sprint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Assuming the user object contains a token
      },
      body: JSON.stringify({ startDate }),
    });
    console.log(`1111111111  ${token}`);
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to send data to the backend");
    }

    const data = await response.json();
    console.log(data); // Log the response data for inspection

    return data; // Return the response data if needed
  } catch (error) {
    console.error("Error sending data to the backend:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// GET FOAM
export const getFoamData = async () => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch("http://localhost:8000/api/foams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
};
export const addFoamData = async (id, sold, profit) => {
  const data = { sold, profit };

  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch(`http://localhost:8000/api/foams/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update foam data");
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating foam data:", error);
    throw error;
  }
};
// CHERK API
export const getCherkData = async () => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch("http://localhost:8000/api/cherks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
};

export const addCherkData = async (id, sold, profit) => {
  const data = { sold, profit };

  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch(`http://localhost:8000/api/cherks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update foam data");
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating foam data:", error);
    throw error;
  }
};

// MY_COST API
export const getMyCostData = async () => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch("http://localhost:8000/api/my-costs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
};

export const addMyCostData = async (id, cost) => {
  const data = { cost };

  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch(`http://localhost:8000/api/my-costs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update foam data");
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating foam data:", error);
    throw error;
  }
};

// Ts-Cost API

export const getTsCostData = async () => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch("http://localhost:8000/api/ts-costs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
};

export const addTsCostData = async (id, cost) => {
  const data = { cost };

  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch(`http://localhost:8000/api/ts-costs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update foam data");
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating foam data:", error);
    throw error;
  }
};

//Get InActivate Sprint
export const getInactivateSprintData = async () => {
  // console.log("in getter")
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch("http://localhost:8000/api/inactive-sprints", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();
    // console.log("ddd", data)
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
};

//get Report

export const getReportData = async (id) => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch(
      `http://localhost:8000/api/sprint-report/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
};

//Bergamo Api
export const getBergamoData = async () => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch("http://localhost:8000/api/totals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
};

export const addBergamoData = async (id, sold, bergamod) => {
  const data = { sold, bergamod };

  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch(`http://localhost:8000/api/totals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update foam data");
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating foam data:", error);
    throw error;
  }
};

//  Get DEACTIVATED SPRINT
export const addDeactivateSprintData = async (id) => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch(
      `http://localhost:8000/api/sprint/deactivate/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update foam data");
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating foam data:", error);
    throw error;
  }
};

// Get Expense
export const getExpenseData = async () => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch(
      "http://localhost:8000/api/sprint/expense-data",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
};

// Get Personal Expense
export const getPersonalExpenseData = async () => {
  try {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const response = await fetch(
      "http://localhost:8000/api/sprint/personal-expense",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
};
