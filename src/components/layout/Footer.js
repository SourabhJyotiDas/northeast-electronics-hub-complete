import React from 'react';
import { AiFillAndroid } from "react-icons/ai"
import { GrAppleAppStore } from "react-icons/gr"

export default function Footer() {
      return (
            <>
                  <footer className='flex flex-col md:flex-row md:justify-between space-y-8 bg-purple-900 text-white py-5 px-5'>
                        <div>
                              <div className='left'>
                                    <h4 className='capitalize primaryText'>Download our app</h4>
                                    <p>Download app for  Android and Mobile Phones</p>
                                    <button className='py-2 px-3 rounded-md bg-blue-400 text-white'> <AiFillAndroid className='text-2xl' /></button>
                                    <button className='py-2 px-3 rounded-md mx-5 bg-blue-400 text-white'><GrAppleAppStore className='text-2xl' /></button>

                              </div>
                              <div className='mid'>
                                    <div className='cursor-pointer  primaryText'>E-Commerce</div>
                                    <p>High quality is our first priority</p>
                                    <p>Copyright 2027 &copy;  E-Commerce</p>
                                    <p>Design by <span>Sourabh Jyoti Das</span></p>
                              </div>
                        </div>
                        <div className='right list-none'>
                              <div className='cursor-pointer  primaryText'>Lets Connect</div>
                              <li>Instagram</li>
                              <li>Youtube</li>
                              <li>Twitter</li>
                              <li>LinkedIn</li>
                        </div>
                  </footer>
            </>
      )
}
