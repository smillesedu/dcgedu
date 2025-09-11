'use client'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { TestimonialData } from '../../../../app/api/data'

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // mobile médio
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // mobile pequeno
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const halfStars = rating % 1 >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStars

    return (
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Icon
            key={`full-${i}`}
            icon="tabler:star-filled"
            className="text-yellow-500 text-lg sm:text-xl"
          />
        ))}
        {halfStars > 0 && (
          <Icon
            icon="tabler:star-half-filled"
            className="text-yellow-500 text-lg sm:text-xl"
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Icon
            key={`empty-${i}`}
            icon="tabler:star-filled"
            className="text-gray-400 text-lg sm:text-xl"
          />
        ))}
      </div>
    )
  }

  return (
    <section id="testimonial" className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Slider {...settings}>
          {TestimonialData.map((items, i) => (
            <div key={i} className="px-2">
              <div
                className={`bg-white rounded-2xl p-6 sm:p-8 mt-16 mb-10 relative ${i % 2 ? 'shadow-testimonial-shadow2' : 'shadow-testimonial-shadow1'
                  }`}
              >
                {/* Foto */}
                <div className="absolute -top-12 left-6">
                  <img
                    src={items.imgSrc}
                    alt={items.name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white shadow-md w-20 h-20 sm:w-24 sm:h-24 object-cover"
                  />
                </div>

                {/* Texto */}
                <h4 className="text-sm sm:text-base font-normal text-darkgray mt-12 mb-6">
                  {items.comment}
                </h4>

                {/* Nome e Avaliação */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-darkbrown">
                      {items.name}
                    </h3>
                    <h3 className="text-xs sm:text-sm font-normal text-lightgray">
                      {items.profession}
                    </h3>
                  </div>
                  {renderStars(items.rating)}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Testimonial
