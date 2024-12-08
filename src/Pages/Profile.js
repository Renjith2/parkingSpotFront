import { useEffect, useState } from "react";
import { axiosInstance } from "../apis";
import WalletBalance from "./WalletBalance";



const Profile = ({token,setToken}) => {
   
    const boxStyle = {
        width: '500px',
        height: '450px',
        border: '2px solid black',
        backgroundColor: '#f0f0f0',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '10px'

    };
    const[userinfo,setUserInfo]=useState([])
    const [open,setOpen]=useState(false)
    const handleOpen=()=>{
     setOpen((prev)=>!prev)
    }
     
    useEffect(() => {
        console.log("poo-->",token)
        setToken(localStorage.getItem("token"));
        console.log("pooss-->",token)
    }, [setToken]);

    
    useEffect(() => {
        if (!token) return; 
        const fetchUserData = async () => {
            console.log("Pooff",token)
            try {
                const Info = await axiosInstance.get('/api/user/details',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },})
                const data= Info.data.user;
                console.log(data)
                setUserInfo(data);
            } catch (error) {
                console.error("Error fetching user details:", error.response?.data || error.message);

            }
        }
        fetchUserData()
    }, [open , token])
    return (
        <div style={boxStyle}>
            <div className="w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Profile Details</h2>
            </div>
            <div className="w-full flex justify-center items-center">
                <img className="w-20 h-20" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" />
            </div>
            <table className="mt-10 w-full text-left border-collapse">
                <tbody>
                    <tr>
                        <td className="font-bold text-lg py-2 border-b border-r border-gray-300 pr-4">
                            Name:
                        </td>
                        <td className="text-lg py-2 border-b pl-4">{userinfo.name || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td className="font-bold text-lg py-2 border-b border-r border-gray-300 pr-4">
                            Contact Number:
                        </td>
                        <td className="text-lg py-2 border-b pl-4">{userinfo.contactNumber || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td className="font-bold text-lg py-2 border-r border-gray-300 pr-4">
                            Wallet Balance:
                        </td>
                        <td className="text-lg py-2 pl-4">{userinfo.walletBalance || 'N/A'}</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-center items-center h-full w-full">
    <button onClick={handleOpen} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
        Add Wallet Balance
    </button>
</div>
<WalletBalance setOpen={setOpen} open={open} userinfo={userinfo} setUserInfo={setUserInfo} />
        </div>
    )
}

export default Profile


