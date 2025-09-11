import React from "react"
import Slider from "react-slick"
import { useTranslation } from "react-i18next"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Icon } from "@iconify/react"
import { courseData } from "../../../../app/api/data"
import CourseModal from "./CurseModal"

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = React.useState(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const { t } = useTranslation()

  const openCourse = (course) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  // Configuração responsiva do Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3, // Desktop
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // Mobile
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
              className="text-yellow-500 text-xl"
            />
          ))}
        {halfStars > 0 && (
          <Icon icon="tabler:star-half-filled" className="text-yellow-500 text-xl" />
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <Icon
              key={`empty-${i}`}
              icon="tabler:star-filled"
              className="text-gray-400 text-xl"
            />
          ))}
      </>
    )
  }

  return (
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
            <div key={i} onClick={() => openCourse(items)} className="cursor-pointer px-2">
              <div className="bg-white mb-10 px-3 pt-3 pb-8 shadow-course-shadow rounded-2xl h-full">
                {/* Imagem */}
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={items.imgSrc}
                    alt={items.heading}
                    className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-cover rounded-2xl"
                  />
                  <div className="absolute right-4 -bottom-2 bg-secondary rounded-full p-3 sm:p-4">
                    <h3 className="text-white uppercase text-xs sm:text-sm font-medium text-center">
                      {t("coursesSection.bestSeller")}
                    </h3>
                  </div>
                </div>

                {/* Conteúdo */}
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
