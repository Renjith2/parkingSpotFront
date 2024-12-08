const { axiosInstance } = require(".");

export const updateBalance = async (payload)=>{
    try {
        console.log("1")  
        const response= await axiosInstance.post('/api/wallet/update',payload) 
        console.log("2")     
        return response.data
    } catch (error) {
        throw error
    }
}
