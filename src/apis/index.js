import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL:'http://localhost:9087',
    headers:{
        'Content-Type':'application/json',
        credentials:"include", 
        method:"post",
        authorization:`Bearer ${localStorage.getItem('token')}`,
    }

})

