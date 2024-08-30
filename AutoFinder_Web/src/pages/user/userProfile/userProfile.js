import { useOutletContext } from "react-router-dom";


const UserProfile = () => {

  const [user] = useOutletContext()


  return ( 
    <div className="UserProfile" style={{height:"50vh"}}>
      <h1 style={{textAlign:"center"}}>User Profile</h1>
      <div style={{border:"none" , display:"flex" , flexDirection:"column",width:"40%" , margin:"auto"}}>
        <p><b>User ID : </b> {user?user._id:""} </p>
        <p><b>Name : </b> {user?user.name:""} </p>
        <p><b>Email : </b> {user?user.email:""} </p>
        <p><b>Phone Number : </b> {user?user.phoneNumber:""} </p>
      </div>
    </div>
   );
}
 
export default UserProfile;