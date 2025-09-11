import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useTranslation } from 'react-i18next'

// Ajuste o caminho conforme sua estrutura de pastas
import { TruestedCompanies } from '../../../../app/api/data'
import { getImagePrefix } from '../../../../utils/util'
import { Link } from 'react-router-dom'

const Companies = () => {
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 700,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  }

  return (
    <section id="biss2biss" className="text-center">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <h2 className="text-midnight_text text-2xl font-semibold">
          {t("partners.title")}
        </h2>
        <div className="py-14 border-b">
          <Slider {...settings}>
            {TruestedCompanies.map((item, i) => (
              <div key={i}>
                <Link to={item.href} target="_blank">
                <img
                  src={`${item.imgSrc}`}
                  alt={item.imgSrc}
                  width={116}
                  height={36}
                  className="mx-auto"
                />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Companies
