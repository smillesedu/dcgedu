

import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../supaBaseClient'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Pega a sessão atual ao carregar
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }
    getSession()

    // Listener para mudanças de sessão
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // 👉 Sign up
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    })

    if (error) {
      console.error('Error signing up: ', error)
      return { success: false, error }
    }
    return { success: true, data }
  }

  // 👉 Sign in
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      })

      if (error) {
        console.error('Sign-in error:', error.message)
        return { success: false, error: error.message }
      }

      // Salvar token no localStorage (7 dias)
      const token = data?.session?.access_token
      if (token) {
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 7)

        localStorage.setItem('auth', JSON.stringify({ token, expiresAt: expiresAt.getTime() }))
      }

      setSession(data.session)
      return { success: true, data }
    } catch (err) {
      console.error('Unexpected error during sign-in:', err.message)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  // 👉 Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    localStorage.removeItem('auth')
    setSession(null)

    if (error) {
      console.error('Error signing out:', error.message)
    }
  }

  // 👉 Carregar sessão ao iniciar a app
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      const { token, expiresAt } = JSON.parse(storedAuth)
      if (new Date().getTime() > expiresAt) {
        localStorage.removeItem('auth') // expirou
        setSession(null)
      } else {
        setSession({ access_token: token }) // mantém sessão simples
      }
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => useContext(AuthContext)
