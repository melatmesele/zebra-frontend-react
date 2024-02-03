// POST request to the Laravel backend
const api =
  "https://zerba-laravel-o5hwor38v-fikremariams-projects.vercel.app/api";
export const register = async (formData) => {
  try {
    const response = await fetch(`${api}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", // Ensure Laravel returns JSON
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

        //LOGIN
export const Login = async (formData) => {
  try {
    const response = await fetch(`${api}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.token) {
        // Token is present in the response data
        localStorage.setItem("token", responseData.token); // Store the token in local storage
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
    throw error;
  }
};

             //LOOUT
export const Logout = async () => {
  const token = localStorage.getItem("token");
  try {

    const response = await fetch(`${api}/api/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    

    if (response.ok) {
      
      
      return true; // Indicate successful logout
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }
  } catch (error) {
    console.error('Logout failed:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

               // DATE PICKER
export const SelectedDate = async (startDate) => {
  const token = localStorage.getItem("token");

  try {
   
    const response = await fetch(`${api}/api/sprint`, {
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
export const GetFoamData = async () => {
  const token = localStorage.getItem("token");

  try {
    
    const response = await fetch(`${api}/api/foams`, {
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



export const AddFoamData = async (id, sold, profit) => {
   const token = localStorage.getItem("token");


  
  const data = { sold, profit };
 
  try {
   
    const response = await fetch(`${api}/api/foams/${id}`, {
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
      const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/cherks`, {
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
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/cherks/${id}`, {
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
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/my-costs`, {
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
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/my-costs/${id}`, {
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
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/ts-costs`, {
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
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/ts-costs/${id}`, {
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
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/inactive-sprints`, {
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
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/sprint-report/${id}`, {
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

      //Bergamo Api
export const getBergamoData = async () => {
  try {
      const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/totals`, {
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

export const addBergamoData = async (id, sold,bergamod) => {
  const data = { sold,bergamod };

  try {
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/totals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update bergamo data");
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
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/sprint/deactivate/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
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



// Get Expense
export const getExpenseData = async () => {
  try {
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/sprint/expense-data`, {
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


// Get Personal Expense 
export const getPersonalExpenseData = async () => {
  try {
       const token = localStorage.getItem("token");

    const response = await fetch(`${api}/api/sprint/personal-expense`, {
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




// POST  INITIAL DEBT
export const AddInitialDebtData = async (sprintId, debt) => {
  const data = { debt };

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${api}/api/sprint-debt/${sprintId}`,

      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update foam data");
    }

    const updatedData = await response.json();
    return updatedData.debt;
  } catch (error) {
    console.error("Error updating foam data:", error);
    throw error;
  }
};


// In your API helper functions
export const downloadSprintReport = async (sprintId) => {
  const token = localStorage.getItem("token");
  const url = `${api}/api/sprint/download-report/${sprintId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/pdf",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to download report.");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `sprintId-${sprintId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Error downloading the sprint report:", error);
    throw error;
  }
};

