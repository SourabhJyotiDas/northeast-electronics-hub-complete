import React, { useState } from 'react';
import Slider from "@material-ui/core/Slider"
import { useNavigate } from 'react-router-dom';
import { Rating } from "@material-ui/lab";
import { VscEyeClosed } from "react-icons/vsc"



const categories = [
   "Laptop",
   "Camera",
   "SmartPhone",
   "Earphones",
   "SmartWatch",
   "Charger",
   "Keyboard",
   "Monitor",
   "Tablet"
 ];

export default function ProductFilter({ toggleFilter, priceHandler, price, setCategory, ratings, setRatings }) {

   const navigate = useNavigate();

   const [keyword, setkeyword] = useState("")

   const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
         navigate(`/products/${keyword}`)
      } else {
         navigate(`/products`)
      }
   }


   // const options = {
   //    size: "large",
   //    value: ratings,
   //    readOnly: true,
   //    precision: 0.5,
   // };

   return (
      <div className='w-[100%] md:w-[30vw] h-[100vh]  px-5 sticky top-5 flex flex-col items-center justify-around'>
         <div className='text-2xl md:hidden' onClick={toggleFilter}><VscEyeClosed /></div>
         <div>

            <form action="" onSubmit={searchSubmitHandler}>
               <input className='border-2 border-purple-900 rounded-md p-2 outline-none ' type="text" name='text' value={keyword} onChange={(e) => { setkeyword(e.target.value) }} placeholder="Search" />
            </form>
         </div>

         <div className='h-[1px] bg-gray-400 w-[100%]'></div>

         {/* selected category */}

         <div>
            <div className='flex flex-col space-y-4'>
               <h3 className='text-xl text-purple-900'>Categories</h3>
               {
                  categories.map((element, index) => {
                     return <button key={index} type="button" name='category' onClick={() => { setCategory(element) }}>
                        {element}
                     </button>
                  })
               }
            </div>
         </div>

         <div className='h-[1px] bg-gray-400 w-[100%]'></div>


         <h3 className='text-xl text-purple-900'>Ratings</h3>
         <Rating onChange={(e) => setRatings(e.target.value)} value={ratings} size="large" />

         <div className='h-[1px] bg-gray-400 w-[100%]'></div>


         {/* <div className='text-center'>
            <h3 className='text-xl text-purple-500'>Colors</h3>
         </div> */}

         {/* <div className='h-[1px] bg-gray-400 w-[100%]'></div> */}


         {/* price */}
         <div className='text-center'>
            <h3 className='text-xl text-purple-900'>Price</h3>
            {/* <input className='w-[100%] cursor-pointer' type="range" name="price" min={0} max={12000000} value={price} onChange={priceHandler} /> */}

            <Slider
               value={0}
               onChange={""}
               valueLabelDisplay="auto"
               aria-labelledby="range-slider"
               min={0}
               max={25000}
            />
         </div>



         {/* Clear Filter */}
         <div>
            {/* <button onClick={clearFilter} className='bg-blue-500 p-2 rounded-lg text-white'>Clear filter</button> */}
         </div>

      </div>
   )
}
