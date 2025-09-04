// // PreInscricaoForm.jsx
// import { useState } from "react"
// import FichaTecnica from "./FichaTecnica"

// export default function PreInscricaoForm({ course, onCancel }) {
//   const [formData, setFormData] = useState({
//     nome: "",
//     email: "",
//     telefone: ""
//   })
//   const [confirmado, setConfirmado] = useState(false)

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // 🔹 Enviar para API (backend salvar no banco)
//     await fetch("/api/pre-inscricoes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...formData, courseId: course.id })
//     })

//     // 🔹 Ativar confirmação (Ficha Técnica)
//     setConfirmado(true)
//   }

//   if (confirmado) {
//     return <FichaTecnica aluno={formData} curso={course} />
//   }

//   return (
//     <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//       <input
//         type="text"
//         name="nome"
//         placeholder="Seu nome"
//         className="w-full border p-2 rounded"
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Seu email"
//         className="w-full border p-2 rounded"
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="telefone"
//         placeholder="Telefone"
//         className="w-full border p-2 rounded"
//         onChange={handleChange}
//       />

//       <div className="flex justify-end gap-2">
//         <button type="button" className="px-4 py-2 border rounded" onClick={onCancel}>
//           Cancelar
//         </button>
//         <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
//           Confirmar
//         </button>
//       </div>
//     </form>
//   )
// }

import React, { useState } from "react"
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CRow,
  CCol,
  CFormTextarea,
} from "@coreui/react"
import { useForm } from "react-hook-form"
import supabase from "../../../../supaBaseClient"

const PreInscricaoForm = ({ course, onCancel, show, setShow, showForm, setShowForm }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const cursoSelecionado = watch("curso")
  const trabalha = watch("trabalha") === "true"
  const [loading, setLoading] = useState(false)

  const cursos = [
    { value: "ingles", label: "Inglês" },
    { value: "frances", label: "Francês" },
    { value: "espanhol", label: "Espanhol" },
    { value: "alemao", label: "Alemão" },
  ]

  const niveis = {
    ingles: ["Iniciante", "Intermediário", "Avançado"],
    frances: ["Débutant", "Intermédiaire", "Avancé"],
    espanhol: ["Básico", "Intermedio", "Avanzado"],
    alemao: ["Anfänger", "Mittelstufe", "Fortgeschritten"],
  }

  const metodosPagamento = [
    { value: "dinheiro", label: "Dinheiro" },
    { value: "transferencia", label: "Transferência Bancária" },
    { value: "cartao", label: "Cartão de Crédito/Débito" },
    { value: "referencia", label: "Referência Multicaixa" },
  ]

  const redesSociais = ["Facebook", "Instagram", "WhatsApp", "TikTok", "LinkedIn", "Outro"]

  const provincias = ["Luanda", "Benguela", "Huambo", "Malanje", "Uíge", "Cabinda", "Outra"]

  const idades = [
    { value: "5-17", label: "5 - 17 anos" },
    { value: "18-35", label: "18 - 35 anos" },
    { value: "36-68", label: "36 - 68 anos" },
  ]

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const { error } = await supabase.from("inscricoes").insert([
        {
          nome: data.nome,
          curso: data.curso,
          nivel: data.nivel,
          pagamento: data.pagamento,
          genero: data.genero,
          redes: data.redes,
          quando_comecar: data.quando_comecar,
          telefone: data.telefone,
          email: data.email,
          provincia: data.provincia,
          idade_intervalo: data.idade_intervalo,
          cidade_bairro: data.cidade_bairro,
          estudante: data.estudante === "true",
          trabalha: data.trabalha === "true",
          setor: data.setor || null,
          deficiencia: data.deficiencia === "true",
          observacoes: data.observacoes,
        },
      ])

      if (error) {
        console.error("Erro ao salvar:", error.message)
        alert("❌ Erro ao salvar a inscrição")
      } else {
        alert("✅ Inscrição realizada com sucesso!")
        reset()
        setShow(false)
      }
    } catch (err) {
      console.error(err)
      alert("❌ Erro inesperado ao salvar inscrição")
    }
    setLoading(false)
  }

  return (
    <CModal size="lg" visible={show} onClose={() => setShow(false)} scrollable>
      <CModalHeader>📋 Formulário de Inscrição</CModalHeader>
      <CModalBody>
        <CCard className="shadow-sm border-0">
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              {/* Nome */}
              <CFormInput
                className="mb-3"
                label="Nome Completo"
                {...register("nome", { required: "O nome completo é obrigatório" })}
              />
              {errors.nome && <small className="text-danger">{errors.nome.message}</small>}

              <CRow>
                <CCol md={6}>
                  <CFormInput
                    className="mb-3"
                    type="tel"
                    label="Telefone"
                    {...register("telefone", { required: "Informe o telefone" })}
                  />
                  {errors.telefone && <small className="text-danger">{errors.telefone.message}</small>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    className="mb-3"
                    type="email"
                    label="Email"
                    {...register("email", { required: "Informe o email" })}
                  />
                  {errors.email && <small className="text-danger">{errors.email.message}</small>}
                </CCol>
              </CRow>

              {/* Curso */}
              <CFormSelect
                className="mb-3"
                label="Curso Desejado"
                {...register("curso", { required: "Selecione um curso" })}
              >
                <option value="">Selecione um curso</option>
                {cursos.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </CFormSelect>
              {errors.curso && <small className="text-danger">{errors.curso.message}</small>}

              {/* Nível */}
              {cursoSelecionado && (
                <CFormSelect
                  className="mb-3"
                  label="Nível no Curso"
                  {...register("nivel", { required: "Selecione o nível do curso" })}
                >
                  <option value="">Selecione o nível</option>
                  {niveis[cursoSelecionado].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </CFormSelect>
              )}
              {errors.nivel && <small className="text-danger">{errors.nivel.message}</small>}

              {/* Pagamento */}
              <CFormSelect
                className="mb-3"
                label="Método de Pagamento"
                {...register("pagamento", { required: "Selecione um método de pagamento" })}
              >
                <option value="">Selecione um método</option>
                {metodosPagamento.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </CFormSelect>

              {/* Quando gostaria de começar */}
              <CFormInput
                type="date"
                className="mb-3"
                label="Quando gostaria de começar?"
                {...register("quando_comecar", { required: true })}
              />

              {/* Localização */}
              <CRow>
                <CCol md={6}>
                  <CFormSelect
                    className="mb-3"
                    label="Província"
                    {...register("provincia", { required: true })}
                  >
                    <option value="">Selecione</option>
                    {provincias.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    className="mb-3"
                    label="Cidade / Bairro"
                    {...register("cidade_bairro")}
                  />
                </CCol>
              </CRow>

              {/* Idade */}
              <CFormSelect
                className="mb-3"
                label="Intervalo de idade"
                {...register("idade_intervalo", { required: true })}
              >
                <option value="">Selecione</option>
                {idades.map((i) => (
                  <option key={i.value} value={i.value}>
                    {i.label}
                  </option>
                ))}
              </CFormSelect>
              <CRow>
                {/* Gênero */}
                <CCol md={6}>
                  <div className="mb-3">
                    <label className="form-label">Gênero</label>
                    <div className="d-flex gap-4">
                      <CFormCheck type="radio" value="Masculino" label="Masculino" {...register("genero")} />
                      <CFormCheck type="radio" value="Feminino" label="Feminino" {...register("genero")} />
                    </div>
                  </div>
                </CCol>
                <CCol md={6}>
                  {/* Estudante */}
                  <div className="mb-3">
                    <label className="form-label">É estudante?</label>
                    <div className="d-flex gap-4">
                      <CFormCheck type="radio" value="true" label="Sim" {...register("estudante")} />
                      <CFormCheck type="radio" value="false" label="Não" {...register("estudante")} />
                    </div>
                  </div>
                </CCol>
              </CRow>

              <CRow>
                <CCol md={6}>
                  {/* Trabalha */}
                  <div className="mb-3">
                    <label className="form-label">Trabalha?</label>
                    <div className="d-flex gap-4">
                      <CFormCheck type="radio" value="true" label="Sim" {...register("trabalha")} />
                      <CFormCheck type="radio" value="false" label="Não" {...register("trabalha")} />
                    </div>
                  </div>

                  {trabalha && (
                    <CFormInput
                      className="mb-3"
                      label="Qual setor?"
                      {...register("setor", { required: trabalha })}
                    />
                  )}
                </CCol>
                <CCol md={6}>
                  {/* Deficiência */}
                  <div className="mb-3">
                    <label className="form-label">É portador de alguma deficiência?</label>
                    <div className="d-flex gap-4">
                      <CFormCheck type="radio" value="true" label="Sim" {...register("deficiencia")} />
                      <CFormCheck type="radio" value="false" label="Não" {...register("deficiencia")} />
                    </div>
                  </div>
                </CCol>
              </CRow>


              {/* Redes Sociais */}
              <div className="mb-3">
                <label className="form-label">Como nos conheceu?</label>
                <div className="d-flex flex-wrap gap-3">
                  {redesSociais.map((rede) => (
                    <CFormCheck
                      key={rede}
                      type="checkbox"
                      value={rede}
                      label={rede}
                      {...register("redes")}
                    />
                  ))}
                </div>
              </div>

              {/* Observações */}
              <CFormTextarea
                className="mb-3"
                label="Observações"
                rows={3}
                {...register("observacoes")}
              />

              <div className="text-center mt-4">
                <CButton type="submit" color="primary" className="px-5" disabled={loading}>
                  {loading ? "Salvando..." : "Enviar"}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setShow(false)}>
          Fechar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default PreInscricaoForm
