
import axios from "axios";
import { createContext, useContext,useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData,clearUser } from "../redux/userSlice";

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({children}) =>{

     const dispatch = useDispatch();

  // 🔥 user fetch function
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/getcurrentuser`,
        { withCredentials: true }
      );
       console.log("contex clg",res.data);
      dispatch(setUserData(res?.data?.data));
    } catch (error) {
      dispatch(clearUser());
    }
  };

  // 🔥 app load par user fetch
  useEffect(() => {
    fetchUser();
  }, []);

    return(
        <UserContext.Provider value={{
            fetchUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider


