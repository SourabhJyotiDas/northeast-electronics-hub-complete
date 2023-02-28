import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Metadata from '../layout/Metadata';

export default function Search() {

   const navigate = useNavigate();

   const [keyword, setkeyword] = useState("")

   const searchSubmitHandler =(e)=>{
      e.preventDefault();
      if(keyword.trim()){
         navigate(`/products/${keyword}`)
      }else{
         navigate(`/products`)
      }
   }

   return (
      <div className='h-[100vh] flex justify-center items-center'>
                              <Metadata title={"Ecommerce - Search products"} />

         <form action="" onSubmit={searchSubmitHandler}>
            <input className='w-[50vw] h-[7vh] outline-none bg-purple-900 px-5 rounded-md text-white shadow-2xl' type="text" placeholder='Search a Product ...' onChange={(e)=>{setkeyword(e.target.value)}} />
            <button type='submit' className=' mx-5 bg-blue-500 text-white py-3 px-5 rounded-md'>Search</button>
         </form>
      </div>
   )
}
