import React from 'react'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Icon } from '@iconify/react'
import { courseData } from '../../../../app/api/data'
import { getImagePrefix } from '../../../../utils/util'
import CourseModal from './CurseModal'

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = React.useState(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const openCourse = (course) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const { t } = useTranslation();
  const settings = {
    dots: false,
    infinite: true,
    speed: 3,
    slidesToShow: 3, // desktop
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 468, // mobile
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
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Icon
              key={`full-${i}`}
              icon="tabler:star-filled"
              className="text-yellow-500 text-xl inline-block"
            />
          ))}
        {halfStars > 0 && (
          <Icon icon="tabler:star-half-filled" className="text-yellow-500 text-xl inline-block" />
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <Icon
              key={`empty-${i}`}
              icon="tabler:star-filled"
              className="text-gray-400 text-xl inline-block"
            />
          ))}
      </>
    )
  }

  return (
    // <section id="courses">
    //   <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
    //     <div className="sm:flex justify-between items-center mb-20">
    //       <h2 className="text-midnight_text text-4xl lg:text-5xl font-semibold mb-5 sm:mb-0">
    //         {t("coursesSection.popular")}.
    //       </h2>
    //       <a
    //         href="/"
    //         className="text-primary text-lg font-medium hover:tracking-widest duration-500"
    //       >
    //         {t("coursesSection.explore")} &nbsp;&gt;&nbsp;
    //       </a>
    //     </div>

    //     <Slider {...settings}>
    //       {courseData.map((items, i) => (
    //         <div key={i} onClick={() => openCourse(items)} className="cursor-pointer">
    //           <div className="bg-white m-3 mb-12 px-3 pt-3 pb-12 shadow-course-shadow rounded-2xl h-full">
    //             <div className="relative rounded-3xl">
    //               <img
    //                 src={`${items.imgSrc}`}
    //                 alt="course"
    //                 width={389}
    //                 height={262}
    //                 className="m-auto clipPath"
    //               />
    //               <div className="absolute right-5 -bottom-2 bg-secondary rounded-full p-6">
    //                 <h3 className="text-white uppercase text-center text-sm font-medium">
    //                   {t("coursesSection.bestSeller")}
    //                 </h3>
    //               </div>
    //             </div>

    //             <div className="px-3 pt-6">
    //               <a href="#" className="text-2xl font-bold text-black max-w-75% inline-block">
    //                 {items.heading}
    //               </a>
    //               <h3 className="text-base font-normal pt-6 text-black/75">{items.name}</h3>
    //               <div className="flex justify-between items-center py-6 border-b">
    //                 <div className="flex items-center gap-4">
    //                   <h3 className="text-red-700 text-2xl font-medium">{items.rating}</h3>
    //                   <div className="flex">{renderStars(items.rating)}</div>
    //                 </div>
    //                 <h3 className="text-3xl font-medium">${items.price}</h3>
    //               </div>
    //               <div className="flex justify-between pt-6">
    //                 <div className="flex gap-4">
    //                   <Icon
    //                     icon="solar:notebook-minimalistic-outline"
    //                     className="text-primary text-xl inline-block me-2"
    //                   />
    //                   <h3 className="text-base font-medium text-black opacity-75">
    //                     {items.classes} {t("coursesSection.classes")}
    //                   </h3>
    //                 </div>
    //                 <div className="flex gap-4">
    //                   <Icon
    //                     icon="solar:users-group-rounded-linear"
    //                     className="text-primary text-xl inline-block me-2"
    //                   />
    //                   <h3 className="text-base font-medium text-black opacity-75">
    //                     {items.students} {t("coursesSection.students")}
    //                   </h3>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </Slider>

    //     {/* Modal de detalhes */}
    //     <CourseModal
    //       isOpen={isModalOpen}
    //       onClose={() => setIsModalOpen(false)}
    //       course={selectedCourse}
    //     />
    //   </div>
    // </section>
    <section id="courses" className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 sm:mb-16">
          <h2 className="text-midnight_text text-2xl sm:text-3xl lg:text-5xl font-semibold mb-4 sm:mb-0">
            {t("coursesSection.popular")}.
          </h2>
          <a
            href="/"
            className="text-primary text-base sm:text-lg font-medium hover:tracking-widest duration-500"
          >
            {t("coursesSection.explore")} &nbsp;&gt;&nbsp;
          </a>
        </div>

        {/* Slider responsivo */}
        <Slider {...settings}>
          {courseData.map((items, i) => (
            <div key={i} onClick={() => openCourse(items)} className="cursor-pointer">
              <div className="bg-white m-2 sm:m-3 mb-10 px-3 pt-3 pb-8 shadow-course-shadow rounded-2xl h-full">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={items.imgSrc}
                    alt="course"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                  <div className="absolute right-4 -bottom-2 bg-secondary rounded-full p-3 sm:p-5">
                    <h3 className="text-white uppercase text-xs sm:text-sm font-medium text-center">
                      {t("coursesSection.bestSeller")}
                    </h3>
                  </div>
                </div>

                <div className="px-2 sm:px-4 pt-6">
                  <a
                    href="#"
                    className="text-lg sm:text-xl lg:text-2xl font-bold text-black inline-block mb-2"
                  >
                    {items.heading}
                  </a>
                  <h3 className="text-sm sm:text-base font-normal text-black/75">{items.name}</h3>

                  {/* Avaliações e preço */}
                  <div className="flex justify-between items-center py-4 sm:py-6 border-b">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <h3 className="text-red-700 text-lg sm:text-xl lg:text-2xl font-medium">
                        {items.rating}
                      </h3>
                      <div className="flex">{renderStars(items.rating)}</div>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium">${items.price}</h3>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col sm:flex-row justify-between pt-4 sm:pt-6 gap-3">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="solar:notebook-minimalistic-outline"
                        className="text-primary text-lg sm:text-xl"
                      />
                      <h3 className="text-sm sm:text-base font-medium text-black opacity-75">
                        {items.classes} {t("coursesSection.classes")}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="solar:users-group-rounded-linear"
                        className="text-primary text-lg sm:text-xl"
                      />
                      <h3 className="text-sm sm:text-base font-medium text-black opacity-75">
                        {items.students} {t("coursesSection.students")}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Modal de detalhes */}
        <CourseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          course={selectedCourse}
        />
      </div>
    </section>
  )
}

export default Courses
