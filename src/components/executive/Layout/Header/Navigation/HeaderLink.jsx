import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { HashLink } from 'react-router-hash-link';


const HeaderLink = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const { pathname } = useLocation() // Pega a URL atual
  const [isActive, setIsActive] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const isLinkActive =
      pathname === item.href ||
      (item.submenu && item.submenu.some((subItem) => pathname === subItem.href))

    setIsActive(!!isLinkActive) // garante boolean
  }, [pathname, item.href, item.submenu])

  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true)
    }
  }

  const handleMouseLeave = () => {
    setSubmenuOpen(false)
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <HashLink
        to={item.href}
        className={`text-lg flex hover:text-black capitalized relative ${
          isActive
            ? 'text-black after:absolute after:w-8 after:h-1 after:bg-primary after:rounded-full after:-bottom-1'
            : 'text-grey'
        }`}
      >
        {t(item.label)}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </HashLink>

      {submenuOpen && (
        <div
          className="absolute py-2 left-0 mt-0.5 w-60 bg-white dark:bg-darklight dark:text-white shadow-lg rounded-lg"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {item.submenu?.map((subItem, index) => {
            const isSubItemActive = pathname === subItem.href
            return (
              <HashLink
                key={index}
                to={subItem.href}
                className={`block px-4 py-2 ${
                  isSubItemActive
                    ? 'bg-primary text-white'
                    : 'text-black dark:text-white hover:bg-primary'
                }`}
              >
                {t(item.label)}
              </HashLink>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HeaderLink
