import React from 'react'
import {useGoogleLogin} from "@react-oauth/google"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const GoogleLogin = () => {
    const navigate = useNavigate()

    const responseGoogle = async(authResult)=>{
        try {
            console.log(authResult)

             const res = await axios.post(
             `${import.meta.env.VITE_API_URL}/api/auth/google-auth`,
      {
        code: authResult.code, // auth-code from Google
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // future use (cookies)
      }
    );

    console.log(res.data);
    

    if(res.data?.success){
          
        navigate("/select-role")
    }

    // Save JWT
   

    // Optional: role check
    // if (!res.data.user.role) {
      // redirect to role selection page
      // navigate("/select-role");
    // }

        } catch (error) {
            console.log(`error while requesting google code`,error);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess:responseGoogle,
        onError:responseGoogle,
        flow:"auth-code"
    })


  return (
    <div>
        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100" onClick={googleLogin}>
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-5"
              />
              Continue with Google
            </button>
    </div>
  )
}

export default GoogleLogin