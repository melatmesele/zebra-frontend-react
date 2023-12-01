// POST request to the Laravel backend
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const register = async (formData) =>{
    fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', // Ensure Laravel returns JSON
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // Handle success (e.g., redirect, show message)
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors here (e.g., show error message)
    });
}



export const Login = async (formData) => {
    
  try {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', // Ensure Laravel returns JSON
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    if (response.ok) {
      const data = await response.json();
      const { user, authorization } = data;
      Cookies.set('token', authorization.token, { expires: 7, path: '/' }); // Set the token in a cookie
      console.log('User data:', user); // Log the user data
      console.log('Token:', authorization.token); // Log the token
      
       // Return the user and token
      return { user, token: authorization.token };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

