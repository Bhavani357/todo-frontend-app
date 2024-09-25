import axios from 'axios';

export const getTodos = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error("No token found in localStorage");
    return;
  }

  try {
    const response = await axios.get('http://localhost:5000/api/todos/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Todos fetched successfully:", response.data); 
    return response.data;
  } catch (error) {
    // Handle specific error cases
    if (error.response) {
      console.error("Error fetching todos:", error.response.data);  // API error response
      if (error.response.status === 401) {
        console.error("Unauthorized: Token is invalid or expired");
        // You can add logic here to redirect to login or refresh the token
      }
    } else {
      console.error("Error with the request:", error.message);  // Request error
    }
  }
};


export const createTodo = async (todoData) => {
  const token = localStorage.getItem('token');
  console.log(token);
  const { data } = await axios.post('http://localhost:5000/api/todos/', todoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateTodo = async (id, status) => {
  const token = localStorage.getItem('token');
  await axios.put(`http://localhost:5000/api/todos/${id}`, status, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTodo = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`http://localhost:5000/api/todos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
