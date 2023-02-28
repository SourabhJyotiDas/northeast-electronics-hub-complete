import React from 'react';
import { Link } from 'react-router-dom';
import { BiLogIn } from "react-icons/bi"
import { CgMenuMotion } from "react-icons/cg"
import { GiRhinocerosHorn } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai"



export default function Header() {
      const toggleMenu = () => {
            document.getElementById("mobileMenu").classList.toggle("hidden")
            document.getElementById("mobileMenuClose").classList.toggle("hidden")
            document.getElementById("mobileList").classList.toggle("hidden")
      }

      return (
            <>
                  <header className='sticky top-0 z-10'>
                        <nav className='flex justify-between items-center px-1 py-5 md:px-10 bg-white '>
                              <Link to="/"><div className='cursor-pointer  primaryText flex items-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500' data-aos="flip-left"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000" ><GiRhinocerosHorn className='text-xl text-purple-500' /> Northeast MobileHub</div></Link>

                              <CgMenuMotion id='mobileMenu' className='text-2xl md:hidden' onClick={toggleMenu} />
                              <AiOutlineClose id='mobileMenuClose' className='text-2xl hidden' onClick={toggleMenu} />


                              <div className='list-none space-x-4 hidden md:block'>
                                    <Link className='cursor-pointer' to={"/"}>Home</Link>
                                    <Link className='cursor-pointer' to={"/products"}>Products</Link>
                                    <Link className='cursor-pointer' to={"/contact"}>Contact</Link>
                                    <Link className='cursor-pointer' to={"/cart"}>Cart</Link>
                              </div>
                              <div className=' items-center space-x-4 hidden  md:flex'>
                                    <Link className='cursor-pointer' to={"/search"}>Search</Link>
                                    <Link className='cursor-pointer text-2xl' to={"/login"}><BiLogIn /></Link>
                              </div>
                        </nav>
                        <div id='mobileList' className='hidden'>
                              <div className='flex flex-col items-center justify-center primaryText text-xl text-white space-y-5 h-[100vh] sticky top-10 z-20 bg-gradient-to-b from-purple-900 to-purple-300 '>
                                    <Link onClick={toggleMenu} className='cursor-pointer' to={"/"} data-aos="fade-right" data-aos-duration="200" data-aos-once="false">Home</Link>

                                    <Link  onClick={toggleMenu} className='cursor-pointer' to={"/products"} data-aos="fade-left">Products</Link>

                                    <Link  onClick={toggleMenu} className='cursor-pointer' to={"/contact"} data-aos="fade-left">Contact</Link>

                                    <Link  onClick={toggleMenu} className='cursor-pointer' to={"/cart"} data-aos="fade-left">Cart</Link>

                                    <Link  onClick={toggleMenu} className='cursor-pointer' to={"/search"} data-aos="fade-left">Search</Link>

                                    <Link  onClick={toggleMenu} className='cursor-pointer text-2xl' to={"/login"} data-aos="fade-left"><BiLogIn /></Link>

                              </div>
                        </div>

                  </header>
            </>
      )
}
