import api from "@/lib/axiosConfig";
import { registerSchema} from "@/lib/typechecker";
import axios from "axios";
import { MapPinned } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  handletoggle: (moveTo: string) => void;
  onClose: ()=>void
};

const baseUrl = import.meta.env.VITE_API_URL
const Registration = ({ handletoggle ,onClose}: Props) => {
    const [errors,setErrors] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        serverError:''
    })
    const [isSuccess,setIsSuccess] = useState(false)
    const navigate = useNavigate()
  const handleSubmit = async (formData:FormData) => {
        const userRegistrationDetails = Object.fromEntries(formData.entries())
        const parsedData = registerSchema.safeParse(userRegistrationDetails)

        if(!parsedData.success){
            for(const issue of parsedData.error.issues){
                setErrors(prev=>({...prev,[issue.path[0]]:issue.message}))
            }
            return
        }

        try{
            await api.post(`${baseUrl}/api/auth/register`,parsedData.data)
            setIsSuccess(true)
            setTimeout(()=>{
                navigate('/')
                onClose()
            },2000)
        }catch(error){
            if(axios.isAxiosError(error)){
                const message = error.response?.data.errorMessage
                setErrors(prev=>({...prev,serverError:message}))
            }
        }
  };
  return (
    <div className="flex flex-col items-center gap-5">
        {isSuccess ? <div className="flex flex-col gap-5 items-center">
            <div className="flex items-center">
        <MapPinned className="shrink-0" size={40} color="#ff6a00" />
        <p className=" text-mist-800 text-2xl font-sans">NomadNodes</p>
      </div>
      <p className="mt-5 text-2xl font-semibold">User successfully registered.</p>
        </div>:<><div className="flex items-center">
        <MapPinned className="shrink-0" size={40} color="#ff6a00" />
        <p className=" text-mist-800 text-2xl font-sans">NomadNodes</p>
      </div>
      <form
        action={handleSubmit}
        className="flex flex-col w-full items-center gap-5 pr-5 pl-5"
      >
        <div className="w-full">
         <input
          className="w-full  p-2 text-lg border-2 border-mist-800 rounded-2xl"
          name="firstName"
          type="text"
          placeholder="Enter First Name"
        />
        {errors.firstName && (
          <div className="text-sm font-light text-red-800 pl-2">{errors.firstName}</div>
        )}
        </div>
        <div className="w-full">
          <input
          className="w-full  p-2 text-lg border-2 border-mist-800 rounded-2xl"
          name="lastName"
          type="text"
          placeholder="Enter Last Name"
        />
        {errors.lastName && (
          <div className="text-sm font-light text-red-800 pl-2">{errors.lastName}</div>
        )}
        </div>
        <div className="w-full">
        <input
          className="w-full  p-2 text-lg border-2 border-mist-800 rounded-2xl"
          name="email"
          type="email"
          placeholder="Enter Email"
        />
        {errors.email && (
          <div className="text-sm font-light text-red-800 pl-2">{errors.email}</div>
        )}
        </div>
        <div className="w-full">
        <input
          className="w-full p-2 text-lg border-2 border-mist-800 rounded-2xl"
          name="password"
          type="password"
          placeholder="Enter Password"
        />
        {errors.password && (
          <div className="text-sm font-light text-red-800 pl-2">{errors.password}</div>
        )}
        </div>

         {errors.serverError && (
          <div className="text-sm font-light text-red-800 pl-2">{errors.serverError}</div>
        )}
        <button
          className="text-xl bg-mist-800 p-2 w-full text-white rounded-2xl"
          type="submit"
        >
          Login
        </button>
      </form>

      <div>
        <p>
          Already a user? 
          <span
            className="text-brand-secondary ml-2"
            onClick={() => handletoggle("login")}
          >
            Login
          </span>
        </p>
      </div></>}
      
    </div>
  );
};

export default Registration;
