import React, { useState } from "react"
import { Dialog } from "@headlessui/react"
import { Icon } from "@iconify/react"
import PreInscricaoForm from "./PreInscricaoForm"

const CourseModal = ({ isOpen, onClose, course }) => {
  const [showForm, setShowForm] = useState(false)

  if (!course) return null

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Fundo escuro */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Conteúdo da modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl max-w-3xl w-full shadow-lg p-6 relative">
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            ✖
          </button>
          {!showForm ? (
            <>



              {/* Imagem */}
              <img
                src={course.imgSrc}
                alt={course.heading}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              {/* Título */}
              <Dialog.Title className="text-2xl font-bold mb-2">
                {course.heading}
              </Dialog.Title>
              <p className="text-gray-600 mb-4">{course.name}</p>

              {/* Infos rápidas */}
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-red-600 text-xl font-semibold">{course.rating}</h3>
                  <div className="flex">{/* aqui podes renderStars(course.rating) */}</div>
                </div>
                <h3 className="text-3xl font-medium">${course.price}</h3>
              </div>

              {/* Detalhes */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Icon icon="solar:notebook-minimalistic-outline" className="text-primary text-2xl" />
                  <span>{course.classes} aulas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon icon="solar:users-group-rounded-linear" className="text-primary text-2xl" />
                  <span>{course.students} estudantes</span>
                </div>
              </div>

              {/* Botão de ação */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => {
                    alert("Inscrição realizada!");
                    setShowForm(true);
                  }}
                  className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90"
                >
                  Inscrever-se
                </button>
              </div>
            </>
          ) : (
            <PreInscricaoForm course={course} onCancel={() => setShowForm(false)} />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default CourseModal
