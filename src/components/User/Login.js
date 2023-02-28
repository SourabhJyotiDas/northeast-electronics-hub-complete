import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, login } from "../../actions/userActions"
import Loader from '../layout/Loader';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';




export default function Login() {


   const navigate = useNavigate()
   const location = useLocation();
   const dispatch = useDispatch()
   // console.log(location)

   const { loading, error, isAuthenticated } = useSelector(state => state.user)

   const [loginEmail, setLoginEmail] = useState("")
   const [loginPassword, setLoginPassword] = useState("")

   const loginSubmit = (e) => {
      e.preventDefault()
      dispatch(login(loginEmail, loginPassword))
      setLoginEmail("")
      setLoginPassword("")
   }

   const redirect = location.search ? location.search.split("=")[1] : "/account";
   // console.log(redirect)

   useEffect(() => {
      if (error) {
         // console.log("errorr");
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
         navigate(redirect)
      }
      
      // eslint-disable-next-line 
   }, [dispatch,redirect,error,toast,isAuthenticated])


   return (
      <div>
         {
            loading ? <Loader /> :
               <section className="body-font h-[100vh] flex justify-center items-center">
                  <div className="container mx-auto">
                     <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">Welcome To ECommerce Website</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep.</p>
                     </div>
                     <form action="" onSubmit={loginSubmit}>
                        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">

                           <div className="relative sm:mb-0 flex-grow w-full">
                              <label htmlFor="email" className="leading-7 text-sm ">Email</label>
                              <input type="email" id="email" name="email" className="w-full bg-purple-900 bg-opacity-40 rounded border border-purple-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 focus:bg-transparent text-base outline-none text-purple-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                 onChange={(e) => { setLoginEmail(e.target.value) }} value={loginEmail} />
                           </div>

                           <div className="relative sm:mb-0 flex-grow w-full">
                              <label htmlFor="password" className="leading-7 text-sm ">Password</label>
                              <input type="password" id="password" name="password" className="w-full bg-purple-800 bg-opacity-40 rounded border border-purple-900 focus:border-purple-900 focus:ring-2 focus:ring-purple-900 focus:bg-transparent text-base outline-none text-purple-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                 onChange={(e) => { setLoginPassword(e.target.value) }} value={loginPassword} minLength={8} />
                           </div>

                           <button className=" bg-purple-900 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg text-white" type='submit'>Login</button>
                        </div>
                     </form>

                     <div className='text-center my-5'>
                        <p className='text-blue-500'>Don't have an Account ?</p>
                        <Link to="/signup"><button className=" bg-purple-900 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg text-white">Register</button></Link>
                     </div>
                  </div>
               </section>
         }
      </div>
   )
}
