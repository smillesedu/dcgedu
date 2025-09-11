import { Crown, Gem } from "lucide-react"; // ícones de luxo
import { useState } from "react";
import PreInscricaoForm from "../Courses/PreInscricaoForm";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export function ExecutiveCards({ isOpen, onClose, course }) {
  const [show, setShow] = useState(false)

  return (
    <div id="executive" className="row my-16 g-4 justify-content-center">
      {/* Card 1 - Executive English Express */}
      <div className="col-md-6 col-lg-5">
        <div className="card text-white shadow-lg border border-warning border-opacity-50 bg-dark h-100 position-relative">
          {/* Badge Executives */}
          <div className="position-absolute top-0 start-50 translate-middle badge bg-warning text-dark fw-bold d-flex align-items-center gap-1 px-3 py-2 rounded-pill shadow">
            <Crown size={16} /> Executives
          </div>

          <div className="card-body text-center p-4">
            <h6 className="text-warning text-uppercase fw-bold">Executive English Express</h6>
            <h3 className="fw-bold mt-3">O idioma dos líderes globais</h3>

            <ul className="list-unstyled mt-4 text-start">
              <li className="d-flex align-items-start mb-3">
                <span className="me-2 p-1 border border-warning rounded-circle bg-warning bg-opacity-25">
                  <CheckIcon />
                </span>
                Foco em <b>negócios, reuniões e apresentações</b>
              </li>
              <li className="d-flex align-items-start mb-3">
                <span className="me-2 p-1 border border-warning rounded-circle bg-warning bg-opacity-25">
                  <CheckIcon />
                </span>
                Turmas aceleradas para quem <b>não pode perder tempo</b>
              </li>
              <li className="d-flex align-items-start">
                <span className="me-2 p-1 border border-warning rounded-circle bg-warning bg-opacity-25">
                  <CheckIcon />
                </span>
                Planos exclusivos para <b>empresas e executivos</b>
              </li>
            </ul>
          </div>

          <div className="card-footer border-0 bg-transparent p-4">
            <button onClick={() => {
              setShow(true);
            }} className="btn btn-warning w-100 fw-bold text-dark shadow-sm">
              Solicitar Proposta
            </button>
          </div>
        </div>
      </div>

      {/* Card 2 - Preparatórios Premium */}
      <div className="col-md-6 col-lg-5">
        <div className="card text-white shadow-lg border border-info border-opacity-50 bg-dark h-100 position-relative">
          {/* Badge Executives */}
          <div className="position-absolute top-0 start-50 translate-middle badge bg-info text-white fw-bold d-flex align-items-center gap-1 px-3 py-2 rounded-pill shadow">
            <Gem size={16} /> Executives
          </div>

          <div className="card-body text-center p-4">
            <h6 className="text-info text-uppercase fw-bold">Preparatórios Premium</h6>
            <h3 className="fw-bold mt-3">IELTS · TOEFL · Cambridge</h3>

            <ul className="list-unstyled mt-4 text-start">
              <li className="d-flex align-items-start mb-3">
                <span className="me-2 p-1 border border-info rounded-circle bg-info bg-opacity-25">
                  <CheckIcon />
                </span>
                Simulados com <b>feedback individual</b>
              </li>
              <li className="d-flex align-items-start mb-3">
                <span className="me-2 p-1 border border-info rounded-circle bg-info bg-opacity-25">
                  <CheckIcon />
                </span>
                Acompanhamento por <b>metas personalizadas</b>
              </li>
              <li className="d-flex align-items-start">
                <span className="me-2 p-1 border border-info rounded-circle bg-info bg-opacity-25">
                  <CheckIcon />
                </span>
                Disponível <b>on-line e presencial</b>
              </li>
            </ul>
          </div>

          <div className="card-footer border-0 bg-transparent p-4">
            <button onClick={() => {
              setShow(true);
            }} className="btn btn-info w-100 fw-bold text-white shadow-sm">
              Solicitar Proposta
            </button>
          </div>
        </div>
      </div>
      <PreInscricaoForm course={course} show={show} setShow={setShow} />
    </div>
  );
}
