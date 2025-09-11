

// import { createContext, useContext, useEffect, useState } from 'react'
// import supabase from '../supaBaseClient'

// const AuthContext = createContext()

// export const AuthContextProvider = ({ children }) => {
//   const [session, setSession] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Pega a sessão atual ao carregar
//     const getSession = async () => {
//       const { data } = await supabase.auth.getSession()
//       setSession(data.session)
//       setLoading(false)
//     }
//     getSession()

//     // Listener para mudanças de sessão
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session)
//       }
//     )

//     return () => {
//       listener.subscription.unsubscribe()
//     }
//   }, [])

//   // 👉 Sign up
//   const signUpNewUser = async (email, password) => {
//     const { data, error } = await supabase.auth.signUp({
//       email: email.toLowerCase(),
//       password,
//     })

//     if (error) {
//       console.error('Error signing up: ', error)
//       return { success: false, error }
//     }
//     return { success: true, data }
//   }

//   // 👉 Sign in
//   const signInUser = async (email, password) => {
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email.toLowerCase(),
//         password,
//       })

//       if (error) {
//         console.error('Sign-in error:', error.message)
//         return { success: false, error: error.message }
//       }

//       // Salvar token no localStorage (7 dias)
//       const token = data?.session?.access_token
//       if (token) {
//         const expiresAt = new Date()
//         expiresAt.setDate(expiresAt.getDate() + 7)

//         localStorage.setItem('auth', JSON.stringify({ token, expiresAt: expiresAt.getTime() }))
//       }

//       setSession(data.session)
//       return { success: true, data }
//     } catch (err) {
//       console.error('Unexpected error during sign-in:', err.message)
//       return { success: false, error: 'An unexpected error occurred' }
//     }
//   }

//   // 👉 Sign out
//   const signOut = async () => {
//     const { error } = await supabase.auth.signOut()
//     localStorage.removeItem('auth')
//     setSession(null)

//     if (error) {
//       console.error('Error signing out:', error.message)
//     }
//   }

//   // 👉 Carregar sessão ao iniciar a app
//   useEffect(() => {
//     const storedAuth = localStorage.getItem('auth')
//     if (storedAuth) {
//       const { token, expiresAt } = JSON.parse(storedAuth)
//       if (new Date().getTime() > expiresAt) {
//         localStorage.removeItem('auth') // expirou
//         setSession(null)
//       } else {
//         setSession({ access_token: token }) // mantém sessão simples
//       }
//     }

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })

//     return () => {
//       listener.subscription.unsubscribe()
//     }
//   }, [])

//   return (
//     <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }

// export const UserAuth = () => useContext(AuthContext)


// context/AuthContext.js


import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../supabaseClient' // 👈 garante que estás a exportar com { supabase }

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [usuario, setUsuario] = useState(null) // dados da tabela usuarios
  const [loading, setLoading] = useState(true)

  // 🔹 Carregar sessão inicial
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Erro ao recuperar sessão:', error.message)
        }

        setSession(data?.session || null)

        if (data?.session?.user) {
          await fetchUsuario(data.session.user.id)
        } else {
          setUsuario(null)
        }
      } catch (err) {
        console.error('Erro inesperado ao iniciar auth:', err.message)
      } finally {
        setLoading(false) // 👈 garante que não trava no carregamento
      }
    }

    initAuth()

    // 🔹 Listener de mudança de sessão (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      if (session?.user) {
        await fetchUsuario(session.user.id)
      } else {
        setUsuario(null)
      }
      setLoading(false) // 👈 muito importante
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // 🔹 Buscar usuário vinculado ao auth_id
  const fetchUsuario = async (authId) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select(
        `
        id, auth_id, email, nome, perfil_id,
        perfis ( nome )
        `
      )
      .eq('auth_id', authId)
      .single()

    if (error) {
      console.error('Erro ao buscar usuário:', error.message)
      return
    }

    setUsuario(data)
  }

  // 🔹 Sign Up (criar auth + registro em usuarios)
  const signUpNewUser = async (email, password, nome, perfil_id) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: {
        data: { nome },
      },
    })

    if (error) return { success: false, error }

    if (data?.user) {
      const { error: insertError } = await supabase.from('usuarios').insert({
        auth_id: data.user.id,
        email: data.user.email,
        nome,
        perfil_id,
      })

      if (insertError) {
        console.error('Erro ao criar usuário na tabela:', insertError.message)
        return { success: false, error: insertError }
      }
    }

    return { success: true, user: data.user }
  }

  // 🔹 Sign In
  const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    })

    if (error) return { success: false, error: error.message }

    setSession(data.session)
    if (data.user) {
      await fetchUsuario(data.user.id)
    }

    return { success: true, data }
  }

  // 🔹 Sign Out
  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUsuario(null)
  }

  // 🔹 Valores expostos
  const value = {
    session,
    usuario,
    loading,
    signUpNewUser,
    signInUser,
    signOut,
    // Helpers
    isAdmin: usuario?.perfis?.nome === 'admin',
    hasPermission: (perfil) => usuario?.perfis?.nome === perfil,
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>Carregando sessão...</p> : children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => useContext(AuthContext)

