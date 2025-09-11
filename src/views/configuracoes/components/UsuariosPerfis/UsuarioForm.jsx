// import React, { useState, useEffect } from 'react'
// import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CFormFloating } from '@coreui/react'
// import { createUsuario, getPerfis } from '../../services/usuariosPerfisService'
// import { UserAuth } from '../../../../context/AuthContext'

// export default function UsuarioForm({ onSuccess }) {
//   const [form, setForm] = useState({ nome: '', email: '', password: '', perfil_id: '' })
//   const [perfils, setPerfils] = useState([])
//   const [loading, setLoading] = useState(false)
//   const { signUpNewUser } = UserAuth() // 👈 do contexto


//   useEffect(() => {
//     carregarPerfis()
//   }, [])

//   const carregarPerfis = async () => {
//     const data = await getPerfis()
//     setPerfils(data)
//   }

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!form.nome.trim() || !form.email.trim() || !form.password.trim() || !form.perfil_id) return
//     setLoading(true)

//     const data = new FormData(e.currentTarget)
//     const value = Object.fromEntries(data.entries())
//     const { email, password, name } = value

//     const { success, error } = await signUpNewUser(email, password, name)

//     if (success) {
//       toast.success('Successfully registered')
//       setLoading(false)
//       navigate('/signin') // depois de criar conta vai para login
//     } else {
//       toast.error(error?.message || 'Error registering user')
//       setLoading(false)
//     }

//     await createUsuario(form)
//     setLoading(false)
//     setForm({ nome: '', email: '', password: '', perfil_id: '' })
//     onSuccess()
//   }

//   return (
//     <CForm className="mb-3" onSubmit={handleSubmit}>
//       <CFormFloating className="mb-3">
//         <CFormInput
//           type="text"
//           name="nome"
//           id="nomeUsuario"
//           placeholder="Nome"
//           value={form.nome}
//           onChange={handleChange}
//         />
//         <CFormLabel htmlFor="nomeUsuario">Nome</CFormLabel>
//       </CFormFloating>

//       <CFormFloating className="mb-3">
//         <CFormInput
//           type="email"
//           name="email"
//           id="emailUsuario"
//           placeholder="E-mail"
//           value={form.email}
//           onChange={handleChange}
//         />
//         <CFormLabel htmlFor="emailUsuario">E-mail</CFormLabel>
//       </CFormFloating>

//       <CFormFloating className="mb-3">
//         <CFormInput
//           type="password"
//           name="password"
//           id="passwordUsuario"
//           placeholder="E-mail"
//           value={form.password}
//           onChange={handleChange}
//         />
//         <CFormLabel htmlFor="passwordUsuario">Senha</CFormLabel>
//       </CFormFloating>

//       <CFormFloating className="mb-3">
//         <CFormSelect
//           name="perfil_id"
//           id="perfilUsuario"
//           value={form.perfil_id}
//           onChange={handleChange}
//         >
//           <option value="">Selecione o Perfil</option>
//           {perfils.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.nome}
//             </option>
//           ))}
//         </CFormSelect>
//         <CFormLabel htmlFor="perfilUsuario">Perfil</CFormLabel>
//       </CFormFloating>

//       <CButton type="submit" color="primary" disabled={loading}>
//         {loading ? 'Salvando...' : 'Salvar'}
//       </CButton>
//     </CForm>
//   )
// }
// ***************************************

// import React, { useState, useEffect } from 'react'
// import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CFormFloating } from '@coreui/react'
// import { toast } from 'react-toastify'
// import { createUsuario, getPerfis } from '../../services/usuariosPerfisService'
// import { UserAuth } from '../../../../context/AuthContext'
// import { useNavigate } from 'react-router-dom'

// export default function UsuarioForm({ onSuccess }) {
//   const [form, setForm] = useState({ nome: '', email: '', password: '', perfil_id: '' })
//   const [perfils, setPerfils] = useState([])
//   const [loading, setLoading] = useState(false)
//   const { signUpNewUser } = UserAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     carregarPerfis()
//   }, [])

//   const carregarPerfis = async () => {
//     const data = await getPerfis()
//     setPerfils(data)
//   }

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!form.nome.trim() || !form.email.trim() || !form.password.trim() || !form.perfil_id) {
//       toast.error('Preencha todos os campos obrigatórios')
//       return
//     }

//     setLoading(true)

//     try {
//       // 1️⃣ Signup no Supabase Auth
//       const { success, error, user } = await signUpNewUser(form.email, form.password)

//       if (!success || error) {
//         toast.error(error?.message || 'Erro ao registrar no Auth')
//         setLoading(false)
//         return
//       }

//       // user = { id, email, created_at }
//       const { id: auth_id, email, created_at } = user

//       // 2️⃣ Criar o registro vinculado na tabela usuarios
//       const { error: insertError } = await createUsuario({
//         auth_id,
//         nome: form.nome,
//         email,
//         perfil_id: form.perfil_id,
//         created_at,
//       })
//       console.log(form)


//       if (insertError) {
//         toast.error(insertError.message || 'Erro ao salvar usuário')
//       } else {
//         toast.success('Usuário registrado com sucesso!')
//         setForm({ nome: '', email: '', password: '', perfil_id: '' })
//         if (onSuccess) onSuccess()
//         // navigate('/signin') // redireciona para login
//       }
//     } catch (err) {
//       toast.error('Erro inesperado: ' + err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <CForm className="mb-3" onSubmit={handleSubmit}>
//       <CFormFloating className="mb-3">
//         <CFormInput
//           type="text"
//           name="nome"
//           id="nomeUsuario"
//           placeholder="Nome"
//           value={form.nome}
//           onChange={handleChange}
//         />
//         <CFormLabel htmlFor="nomeUsuario">Nome</CFormLabel>
//       </CFormFloating>

//       <CFormFloating className="mb-3">
//         <CFormInput
//           type="email"
//           name="email"
//           id="emailUsuario"
//           placeholder="E-mail"
//           value={form.email}
//           onChange={handleChange}
//         />
//         <CFormLabel htmlFor="emailUsuario">E-mail</CFormLabel>
//       </CFormFloating>

//       <CFormFloating className="mb-3">
//         <CFormInput
//           type="password"
//           name="password"
//           id="passwordUsuario"
//           placeholder="Senha"
//           value={form.password}
//           onChange={handleChange}
//         />
//         <CFormLabel htmlFor="passwordUsuario">Senha</CFormLabel>
//       </CFormFloating>

//       <CFormFloating className="mb-3">
//         <CFormSelect
//           name="perfil_id"
//           id="perfilUsuario"
//           value={form.perfil_id}
//           onChange={handleChange}
//         >
//           <option value="">Selecione o Perfil</option>
//           {perfils.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.nome}
//             </option>
//           ))}
//         </CFormSelect>
//         <CFormLabel htmlFor="perfilUsuario">Perfil</CFormLabel>
//       </CFormFloating>

//       <CButton type="submit" color="primary" disabled={loading}>
//         {loading ? 'Salvando...' : 'Salvar'}
//       </CButton>
//     </CForm>
//   )
// }










import React, { useState, useEffect } from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CFormFloating } from '@coreui/react'
import { toast } from 'react-toastify'
import { getPerfis } from '../../services/usuariosPerfisService'
import { UserAuth } from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function UsuarioForm({ onSuccess }) {
  const [form, setForm] = useState({ nome: '', email: '', password: '', perfil_id: '' })
  const [perfils, setPerfils] = useState([])
  const [loading, setLoading] = useState(false)
  const { signUpNewUser } = UserAuth()
  const navigate = useNavigate()

  useEffect(() => {
    carregarPerfis()
  }, [])

  const carregarPerfis = async () => {
    const data = await getPerfis()
    setPerfils(data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.nome.trim() || !form.email.trim() || !form.password.trim() || !form.perfil_id) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)

    try {
      // 1️⃣ Signup no Supabase Auth + criação do usuário na tabela
      const { success, error } = await signUpNewUser(
        form.email,
        form.password,
        form.nome,
        form.perfil_id
      )

      if (!success || error) {
        toast.error(error?.message || 'Erro ao registrar usuário')
        setLoading(false)
        return
      }

      toast.success('Usuário registrado com sucesso!')
      setForm({ nome: '', email: '', password: '', perfil_id: '' })
      if (onSuccess) onSuccess()
      // navigate('/signin') // redireciona para login
    } catch (err) {
      toast.error('Erro inesperado: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CForm className="mb-3" onSubmit={handleSubmit}>
      <CFormFloating className="mb-3">
        <CFormInput
          type="text"
          name="nome"
          id="nomeUsuario"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <CFormLabel htmlFor="nomeUsuario">Nome</CFormLabel>
      </CFormFloating>

      <CFormFloating className="mb-3">
        <CFormInput
          type="email"
          name="email"
          id="emailUsuario"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
        />
        <CFormLabel htmlFor="emailUsuario">E-mail</CFormLabel>
      </CFormFloating>

      <CFormFloating className="mb-3">
        <CFormInput
          type="password"
          name="password"
          id="passwordUsuario"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
        />
        <CFormLabel htmlFor="passwordUsuario">Senha</CFormLabel>
      </CFormFloating>

      <CFormFloating className="mb-3">
        <CFormSelect
          name="perfil_id"
          id="perfilUsuario"
          value={form.perfil_id}
          onChange={handleChange}
        >
          <option value="">Selecione o Perfil</option>
          {perfils.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </CFormSelect>
        <CFormLabel htmlFor="perfilUsuario">Perfil</CFormLabel>
      </CFormFloating>

      <CButton type="submit" color="primary" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar'}
      </CButton>
    </CForm>
  )
}
