import axios from 'axios';

export const signup = async (userData) => {
  const { data } = await axios.post('http://localhost:5000/api/users/signup', userData);
  return data.token;
};

export const login = async (credentials) => {
  const { data } = await axios.post('http://localhost:5000/api/users/login', credentials);
  return data.token;
};


export const updateProfile = async (formData) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error("No token found in localStorage");
    return;
  }

  try {
    const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Profile updated successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error updating profile:", error.response.data);
    } else {
      console.error("Error with the request:", error.message);
    }
  }
};
