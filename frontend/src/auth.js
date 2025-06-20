import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000/api/users",
});
// Set up interceptors if needed
export const registerUser = async (userData) => {
    try {
        const response = await API.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}
// Function to handle user login
export const loginUser = async (loginData) => {
    try {
        const response = await API.post('/login', loginData);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}
