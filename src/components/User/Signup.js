import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, register } from "../../actions/userActions"
import Loader from '../layout/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Signup() {

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { loading, error, isAuthenticated } = useSelector(state => state.user)

   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
   })

   const [confirmPassword, setConfirmPassword] = useState("")

   const { name, email, password } = user

   const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1545231027-637d2f6210f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")

   const [avatarpreview, setAvatarPreview] = useState("https://images.unsplash.com/photo-1545231027-637d2f6210f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")

   const updateConfirmPasswordHandler = (e) => {
      setConfirmPassword(e.target.value)
   }

   const registerSubmit = (e) => {
      e.preventDefault();

      if (user.password !== confirmPassword) {
         toast.error("Confirm password must be same", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
         });
         dispatch(clearErrors())
      } else {
         const myForm = new FormData()

         myForm.set("name", name)
         myForm.set("email", email)
         myForm.set("password", password)
         myForm.set("avatar", avatar)

         dispatch(register(myForm))
      }
   }

   const registerDataChange = (e) => {

      if (e.target.name === "avatar") {
         const reader = new FileReader();

         reader.onload = () => {
            if (reader.readyState === 2) {
               setAvatarPreview(reader.result)
               setAvatar(reader.result)
            }
         }

         reader.readAsDataURL(e.target.files[0])

      } else {
         setUser({ ...user, [e.target.name]: e.target.value })
      }
   }


   useEffect(() => {

      if (error) {
         // console.log(error);
         toast.error(error, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
         });
         dispatch(clearErrors())
      }
      if (isAuthenticated) {
        
         toast.success(`Welcome ${user.name}`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
         });
         navigate('/')
      }
      // eslint-disable-next-line 
   }, [dispatch, error, toast, isAuthenticated, password, confirmPassword])

   return (
      <>
         {loading ? <Loader /> : <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
               <h1 className="title-font font-medium text-3xl ">Slow-carb next level shoindxgoitch ethical authentic, poko scenester</h1>
               <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
            </div>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
               <h2 className="text-white text-lg font-medium title-font mb-5">Sign Up</h2>

               <form action="" onSubmit={registerSubmit}>
                  <div className="relative mb-4">
                     <label htmlFor="name" className="leading-7 text-sm text-white">Name</label>
                     <input minLength={4} maxLength={30} type="name" id="name" name="name" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={name} onChange={registerDataChange} />
                  </div>

                  <div className="relative mb-4">
                     <label htmlFor="email" className="leading-7 text-sm text-white">Email</label>
                     <input type="email" id="email" name="email" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={email} onChange={registerDataChange} />
                  </div>

                  <div className="relative mb-4">
                     <label htmlFor="password" className="leading-7 text-sm text-white">Password</label>
                     <input type="password" id="password" name="password" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={password} onChange={registerDataChange} minLength={8} />
                  </div>

                  <div className="relative mb-4">
                     <label htmlFor="confirmpassword" className="leading-7 text-sm text-white">Confirm Password</label>
                     <input type="password" id="confirmpassword" name="confirmpassword" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={updateConfirmPasswordHandler} value={confirmPassword} />
                  </div>

                  <div className='my-3'>
                     <p className='text-center'>Add Profile Picture</p>
                     <div className='flex items-center justify-center '>
                        <img className='h-[30px] w-[30px] rounded-full border-2 border-white bg-center  ' src={avatarpreview} alt="myImage" />
                        <input className='w-[100%]' type="file" name='avatar' accept='image/*' onChange={registerDataChange} />
                     </div>
                  </div>

                  <button className="text-white bg-purple-900 border-0 py-2 px-8 focus:outline-none hover:bg-purple-800 rounded text-lg w-[100%]" type="submit"> Register</button>
               </form>

               <p className="text-xs mt-3">Already have a account ?</p>
               <button className="text-white bg-purple-900 border-0 py-2 px-8 focus:outline-none hover:bg-purple-800 rounded text-lg"> <Link to="/login"> Login </Link></button>

            </div>
         </div >}
      </>
   )
}
