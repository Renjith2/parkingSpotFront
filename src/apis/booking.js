const { axiosInstance } = require(".");

export const spotUpdateFunction = async (payload)=>{
    try {
        const response= await axiosInstance.post('/api/spot/update',payload)      
        return response.data
    } catch (error) {
        throw error
    }
}