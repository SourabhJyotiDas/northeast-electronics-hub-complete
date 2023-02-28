import React, { useEffect, useState } from 'react';
import { clearErrors, getAllproduct } from '../../actions/productAction.js';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader.js';
import ProductCard from "../ProductCard.js";
import ProductFilter from "../ProductFilter.js";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Metadata from '../layout/Metadata.js';
import { FiFilter } from "react-icons/fi"




export default function Products() {

   const dispatch = useDispatch()
   const { loading, error, products, productCount, resultPerPage, filterProductsCount } = useSelector(state => state.products)

   const params = useParams()
   // console.log(params);
   const keyword = params.keyword;

   const [currentPage, setCurrentPage] = useState(1)
   const [category, setCategory] = useState("")
   const [ratings, setRatings] = useState(0)

   const setCurrentPageNo = (e) => {
      setCurrentPage(e)
   }

   const [price, setPrice] = useState([0, 25000])

   const priceHandler = (newPrice) => {
      setPrice(newPrice)
   }

   let count = filterProductsCount

   const toggleFilter=()=>{
      document.getElementById("filter").classList.toggle("hidden")
      document.getElementById("filterClose").classList.toggle("hidden")
   }

   useEffect(() => {
      if (error) {
         // return alert.error(error)
         dispatch(clearErrors)
         // console.log(error)
      }
      dispatch(getAllproduct(keyword, currentPage, price, category, ratings))
      // eslint-disable-next-line
   }, [dispatch, error, keyword, currentPage, category, ratings])


   return (
      <>
         {
            loading ? <Loader /> : <div>
               <Metadata title={"Ecommerce - All products"} />

               {/* ///////////////////////////////////////////////////////////////////////////// */}

               <div className='w-[100vw] h-[10vh]  rounded-full flex justify-start items-start sticky top-16 md:hidden'>
                  <FiFilter onClick={toggleFilter} className="text-2xl  " />
               </div>

               <div id='filter' className='h-[100vh] bg-white hidden fixed top-10 z-10'>
                  <ProductFilter toggleFilter={toggleFilter} category={category} setCategory={setCategory} priceHandler={priceHandler} ratings={ratings} setRatings={setRatings} />
               </div>
               <div className='flex'>
                  <div className='w-[30vw] hidden md:block'>
                     <ProductFilter category={category} setCategory={setCategory} priceHandler={priceHandler} ratings={ratings} setRatings={setRatings} />
                  </div>
                  <section className=" flex flex-col w-[100%]">
                     <div className='flex flex-wrap justify-center'>
                        {
                           products && products.map((element, index) => (
                              <ProductCard product={element} key={index} />
                           ))
                        }
                     </div>
                     {
                        resultPerPage < count && (
                           <div className='text-purple-900 my-3 flex justify-center'>
                              <Pagination
                                 activePage={currentPage}
                                 itemsCountPerPage={resultPerPage}
                                 totalItemsCount={productCount}
                                 onChange={setCurrentPageNo}
                                 nextPageText="Next"
                                 prevPageText="Prev"
                                 firstPageText="First page"
                                 lastPageText="Last page"
                                 itemClass='page-item'
                                 linkClass='page-link'
                                 activeClass='pageItemActive'
                                 activeLinkClass='pageLinkActive'
                              >
                              </Pagination>
                           </div>
                        )
                     }
                  </section>
               </div>


            </div>
         }
      </>
   )
}
