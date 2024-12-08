import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../apis/userApis";
import { nameValidation, passwordValidation, phoneValidation } from "../Validations/validation";




const Register =()=>{    
    const[form,setForm]=useState({
        name:"",
        contactNumber:"",
        password:""
    })
    const [message, setMessage] = useState("");
    const[error,setError]=useState({
        nameError:"",
        contactNumberError:"",
        passwordError:""
    })
    const navigate = useNavigate()
   
    const handleChange =(e)=>{
        const{id,value}=e.target;
        setForm((prev)=>({
            ...prev,
          [id]:value,
        }))
    }


    const validateForm = () => {
        const nameError = nameValidation(form.name);
        const contactNumberError = phoneValidation(form.contactNumber);
        const passwordError = passwordValidation(form.password);

        setError({
            nameError,
            contactNumberError,
            passwordError
        });

       
        return !nameError && !contactNumberError && !passwordError;
    };

    const formSubmit = async (e)=>{
        e.preventDefault();
        if (!validateForm()) {
            setMessage("Please fix the errors in the form.");
            return;
        }
        try {
            const response = await RegisterUser(form)
            if(response){
             setMessage(response.message)
            }
            if(response.token){
                localStorage.setItem('token',response.token)
                navigate('/home')
            }
        } catch (error) {
           
      setMessage(error.response?.data?.message)
        }

    }

    useEffect(()=>{
       if(localStorage.getItem("token")){
        navigate('/home')
       }
    },[])

    return(
       <div className="h-screen flex items-center justify-center bg-gray-400">
        <div className="bg-gray-200  p-8 rounded-lg shadow-lg w-96" >
            <div className="flex justify-center mb-6">
                <img
                src="https://thumbs.dreamstime.com/b/playful-hand-drawn-chalk-textured-capital-letter-p-black-white-ideal-school-creative-lettering-design-projects-336405639.jpg"
                alt="profile"
                className="w-24 h-24 rounded-full object-cover"
                />
            </div>
            <form onSubmit={formSubmit} className="space-y-4">
                <div>
                <label className="block text-gray-700" htmlFor="name">Name :</label>
                <input className="w-full p-2 border border-gray-400 rounded-md" onChange={handleChange} type="text" value={form.name}  id="name" />
                {error.nameError && <p className="text-red-500 text-sm">{error.nameError}</p>}
                </div>
                <div>
                <label className="block text-gray-700" htmlFor="email">Contact Number :</label>
                <input className="w-full p-2 border border-gray-400 rounded-md"  onChange={handleChange} type="text" value={form.contactNumber} id="contactNumber" />
                {error.contactNumberError && <p className="text-red-500 text-sm">{error.contactNumberError}</p>}
                </div>
                <div>


          
                <label className="block text-gray-700" htmlFor="password">Password :</label>
                <input className="w-full p-2 border border-gray-400 rounded-md"  onChange={handleChange} value={form.password} type="password"  id="password" />
                {error.passwordError && <p className="text-red-500 text-sm">{error.passwordError}</p>}
                </div>

                <button className="w-full bg-black text-white py-2 mt-2 rounded-md hover:bg-gray-800" type="submit">Submit</button>
            </form>
            {message && (
          <div className="mt-4 text-center">
            <p className="text-red-500">{message}</p>
          </div>
        )}
            <div className="mt-4 text-center">
                <p className="text-gray-700">
                    Already Registered ? {" "}
                    <Link to='/login' className="text-blue-500 hover:underline">
                    Login Here
                    </Link>
                </p>
            </div>
        </div>
       </div>
    )
}

export default Register