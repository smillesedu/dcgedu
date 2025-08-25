import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "pt", label: "🇵🇹 Português" },
  { code: "en", label: "🇬🇧 English" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "de", label: "🇩🇪 Deutsch" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="  mr-50 z-100" ref={dropdownRef}>
      {/* Botão que abre o menu */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 px-3 py-2 border rounded-lg bg-white hover:bg-gray-100 shadow-sm"
      >
        🌐 <span className="hidden md:inline text-sm">{i18n.language.toUpperCase()}</span>
      </button>

      {/* Dropdown flutuante */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
          <ul className="py-1 text-sm">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 ${i18n.language === lang.code ? "bg-gray-200 font-medium" : ""
                    }`}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
