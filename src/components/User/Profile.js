import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import Metadata from '../layout/Metadata';
import { Link, useNavigate } from 'react-router-dom'
import "./Profile.css";




export default function Profile() {

   const navigate = useNavigate()

   const { loading,  isAuthenticated, user } = useSelector(state => state.user);

   useEffect(() => {
      if (isAuthenticated === false) {
         navigate("/login");
      }
      
      // eslint-disable-next-line
    }, [navigate, isAuthenticated]);

   // console.log(user)

   return (
      <>
         {
            loading ? <Loader /> : <div>Profile
               <Metadata title={`${user.name}'s Profile`} />
               <div className="profileContainer">
                  <div>
                     <h1 className='text-center'>My Profile</h1>
                     <img src={user.avatar.url} alt={user.name} />
                     <Link to="/account/update">Edit Profile</Link>
                  </div>
                  <div>
                     <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                     </div>
                     <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                     </div>
                     <div>
                        <h4>Joined On</h4>
                        <p>{String(user.createdAt).substr(0, 10)}</p>
                     </div>

                     <div>
                        <Link to="/orders">My Orders</Link>
                        <Link to="/password/update">Change Password</Link>
                     </div>
                  </div>
               </div>
            </div>
         }
      </>
   )
}
