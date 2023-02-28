import React from 'react'
import ReactStars from 'react-rating-stars-component'

export default function ReviewCard({ review}) {
  

      const options = {
            edit: false,
            color: "gray",
            activeColor: "tomato",
            size: window.innerWidth < 600 ? 20 : 25,
            value: review.rating,
            isHalf: true
      }

      return (
            <div className=' shadow-xl inline-block py-3 px-5 m-5 border border-purple-900 rounded-md'>
                  <div className='flex items-center '>
                        <img className='h-[40px] w-[40px] bg-center rounded-full mr-3' src={""} alt="" />
                        <p className='text-purple-900 font-semibold'>{review.name}</p>
                  </div>
                  <ReactStars {...options} />
                  <span>{review.comment}</span>
            </div>
      )
}
