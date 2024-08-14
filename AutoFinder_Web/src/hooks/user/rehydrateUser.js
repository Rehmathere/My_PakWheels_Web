import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";


const useRehydrateUser = () => {
  const {user , dispatch} = useContext(UserContext)

  async function rehydrateUser(){

    
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/user/rehydrateUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(response.data.ok) {
          console.log("here")
          dispatch({type:"LOGIN" , payload : response.data.data})
        }
        return response.data.data
      } catch (error) {
        localStorage.removeItem("token")
        return null
      }
    }
  }
  return ( {rehydrateUser} );
}
 
export default useRehydrateUser;