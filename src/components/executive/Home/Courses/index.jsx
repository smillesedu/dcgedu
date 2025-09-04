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
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    speed: 500,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
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
    <section id="courses">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="sm:flex justify-between items-center mb-20">
          <h2 className="text-midnight_text text-4xl lg:text-5xl font-semibold mb-5 sm:mb-0">
            {t("coursesSection.popular")}.
          </h2>
          <a
            href="/"
            className="text-primary text-lg font-medium hover:tracking-widest duration-500"
          >
            {t("coursesSection.explore")} &nbsp;&gt;&nbsp;
          </a>
        </div>

        <Slider {...settings}>
          {courseData.map((items, i) => (
            <div key={i} onClick={() => openCourse(items)} className="cursor-pointer">
              <div className="bg-white m-3 mb-12 px-3 pt-3 pb-12 shadow-course-shadow rounded-2xl h-full">
                <div className="relative rounded-3xl">
                  <img
                    src={`${items.imgSrc}`}
                    alt="course"
                    width={389}
                    height={262}
                    className="m-auto clipPath"
                  />
                  <div className="absolute right-5 -bottom-2 bg-secondary rounded-full p-6">
                    <h3 className="text-white uppercase text-center text-sm font-medium">
                      {t("coursesSection.bestSeller")}
                    </h3>
                  </div>
                </div>

                <div className="px-3 pt-6">
                  <a href="#" className="text-2xl font-bold text-black max-w-75% inline-block">
                    {items.heading}
                  </a>
                  <h3 className="text-base font-normal pt-6 text-black/75">{items.name}</h3>
                  <div className="flex justify-between items-center py-6 border-b">
                    <div className="flex items-center gap-4">
                      <h3 className="text-red-700 text-2xl font-medium">{items.rating}</h3>
                      <div className="flex">{renderStars(items.rating)}</div>
                    </div>
                    <h3 className="text-3xl font-medium">${items.price}</h3>
                  </div>
                  <div className="flex justify-between pt-6">
                    <div className="flex gap-4">
                      <Icon
                        icon="solar:notebook-minimalistic-outline"
                        className="text-primary text-xl inline-block me-2"
                      />
                      <h3 className="text-base font-medium text-black opacity-75">
                        {items.classes} {t("coursesSection.classes")}
                      </h3>
                    </div>
                    <div className="flex gap-4">
                      <Icon
                        icon="solar:users-group-rounded-linear"
                        className="text-primary text-xl inline-block me-2"
                      />
                      <h3 className="text-base font-medium text-black opacity-75">
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
