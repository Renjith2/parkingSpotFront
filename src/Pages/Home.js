import { useEffect, useState } from "react";
import Parkingarea from "./Parkingarea"
import Profile from "./Profile"
import { useNavigate } from "react-router-dom";

const Home =()=>{
    const [bookingCompleted, setBookingCompleted] = useState(false);
    const [token, setToken] = useState(null);
    const handleBookingCompletion = () => {
        setBookingCompleted((prev) => !prev); 
    };
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        setToken(null); 
        navigate("/login"); 
    };

 

    


    return(
        <div>
        
        <div className="bg-gray-400 h-32 flex items-center justify-between px-6 mb-20">
            <img
                src="https://thumbs.dreamstime.com/b/playful-hand-drawn-chalk-textured-capital-letter-p-black-white-ideal-school-creative-lettering-design-projects-336405639.jpg"
                alt="profile"
                className="w-24 h-20 rounded-full object-cover"
                />
                 <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Logout
                </button>
        </div>
        <div className="mx-6 flex flex-row">
        <Parkingarea token={token} setToken={setToken} onBookingComplete={handleBookingCompletion}/>
        <div className="ml-20"> 
         <Profile key={bookingCompleted} token={token} setToken={setToken} />
        </div>
        </div>
        </div>
      
        
    )
}

export default Home


