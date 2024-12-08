const { axiosInstance } = require(".");

export const RegisterUser = async (payload)=>{
    try {
        const response= await axiosInstance.post('/api/user/register',payload)      
        return response.data
    } catch (error) {
        throw error
    }
}

export const LoginUser = async (payload)=>{
    try {
        const response = await axiosInstance.post('/api/user/login',payload)
        return response.data
    } catch (error) {
       throw error
    }
}