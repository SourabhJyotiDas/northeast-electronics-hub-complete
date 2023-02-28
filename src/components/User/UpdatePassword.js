import React, { useEffect, useState } from 'react'
import "./updatePassword.css";
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, updatePassword } from "../../actions/userActions"
import Loader from '../layout/Loader';
import { Link, useNavigate } from 'react-router-dom'
import Metadata from '../layout/Metadata';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";


export default function UpdatePassword() {

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { error, isUpdated, loading } = useSelector(state => state.profile)

   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const updatePasswordSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);

      dispatch(updatePassword(myForm));
   };

   useEffect(() => {
      if (error) {
         //   alert.error(error);
         dispatch(clearErrors());
         // console.log(error)
      }

      if (isUpdated) {
         navigate("/account");
         dispatch({
            type: UPDATE_PASSWORD_RESET,
         });
      }
   }, [dispatch, error, isUpdated, navigate]);


   return (
      <>
         {loading ? (
            <Loader />
         ) : (
            <>
               <Metadata title="Change Password" />
               <div className="updatePasswordContainer">
                  <div className="updatePasswordBox">
                     <h2 className="updatePasswordHeading">Update Profile</h2>

                     <form className="updatePasswordForm" onSubmit={updatePasswordSubmit} >
                        <div className="loginPassword">
                           <VpnKeyIcon />
                           <input type="password" placeholder="Old Password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        </div>

                        <div className="loginPassword">
                           <LockOpenIcon />
                           <input type="password" placeholder="New Password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>

                        <div className="loginPassword">
                           <LockIcon />
                           <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className='underline text-blue-500  text-right'>
                           <Link to='/password/forgot'> Forgot Password</Link>
                        </div>
                        <input type="submit" value="Change" className="updatePasswordBtn" />
                     </form>
                  </div>
               </div>
            </>
         )}
      </>
   )
}
