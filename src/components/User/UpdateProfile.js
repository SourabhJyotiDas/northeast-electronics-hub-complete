import React, { useEffect, useState } from 'react'
import "./updateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, loadUser, updateProfile } from "../../actions/userActions"
import Loader from '../layout/Loader';
import { useNavigate } from 'react-router-dom'
import Metadata from '../layout/Metadata';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';

export default function UpdateProfile() {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { user } = useSelector(state => state.user)
   const { error, isUpdated, loading } = useSelector(state => state.profile)

   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1545231027-637d2f6210f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")
   const [avatarPreview, setAvatarPreview] = useState("https://images.unsplash.com/photo-1545231027-637d2f6210f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")

   const updateProfileSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData()

      myForm.set("name", name)
      myForm.set("email", email)
      myForm.set("avatar", avatar)
      dispatch(updateProfile(myForm))
      // console.log("Register submited successfully")
   }

   const updateProfileDataChange = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
         if (reader.readyState === 2) {
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
         }
      }
      reader.readAsDataURL(e.target.files[0])
   }

   useEffect(() => {
      if (error) {
         dispatch(clearErrors())
         // console.log("Error")
      }
      if (user) {
         setName(user.name)
         setEmail(user.email)
         setAvatarPreview(user.avatar.url)
      }
      if (isUpdated) {
         dispatch(loadUser())
         navigate('/account')
         dispatch({
            type: UPDATE_PROFILE_RESET
         })
      }
      // eslint-disable-next-line 
   }, [dispatch, error, user, isUpdated])

   return (
      <>
         {loading ? <Loader /> :
            <div>
               <Metadata title="Update Profile" />
               <div className="updateProfileContainer">
                  <div className="updateProfileBox">
                     <h2 className="updateProfileHeading">Update Profile</h2>

                     <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit} >
                        <div className="updateProfileName">
                           <FaceIcon />
                           <input type="text" placeholder="Name" required name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="updateProfileEmail">
                           <MailOutlineIcon />
                           <input type="email" placeholder="Email" required name="email" value={email} onChange={(e) =>(e.target.value)}/>
                        </div>

                        <div id="updateProfileImage">
                           <img src={avatarPreview} alt="Avatar Preview" />
                           <input type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange} />
                        </div>
                        <input type="submit" value="Update" className="updateProfileBtn" />
                     </form>
                  </div>
               </div>
            </div>
         }
      </>
   )
}
