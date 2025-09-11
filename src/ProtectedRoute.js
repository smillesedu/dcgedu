


// // routes/ProtectedRoute.js
// import { Navigate, Outlet } from "react-router-dom"
// import { UserAuth } from "./context/AuthContext"

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { session, usuario, loading } = UserAuth()

//   if (loading) return <p>Carregando...</p>

//   // 🔹 Não logado
//   if (!session) {
//     return <Navigate to="/" replace />
//   }

//   // 🔹 Se rota exige perfil específico
//   if (requiredRole && usuario?.perfis?.nome !== requiredRole) {
//     return <p>🚫 Você não tem permissão para acessar esta página</p>
//   }

//   return children ? children : <Outlet />
// }

// export default ProtectedRoute


import { Navigate, Outlet } from "react-router-dom"
import { UserAuth } from "./context/AuthContext"

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { session, usuario, loading } = UserAuth()

  // Enquanto carrega sessão + usuário, exibe spinner
  if (loading) {
    return <p>Carregando...</p> // 👉 aqui podes trocar por um spinner bonitinho
  }

  // 🔹 Não logado
  if (!session) {
    return <Navigate to="/" replace />
  }

  // 🔹 Se rota exige perfil(es)
  if (requiredRoles && Array.isArray(requiredRoles)) {
    if (requiredRoles && usuario?.perfis?.nome !== requiredRoles) {
      if (!requiredRoles.includes(usuario?.perfis?.nome)) {
        return <p>🚫 Você não tem permissão para acessar esta página</p>
      }
    } else if (requiredRoles && usuario?.perfis?.nome !== requiredRoles) {
      return <p>🚫 Você não tem permissão para acessar esta página</p>
    }
  }

  // if (requiredRoles && usuario?.perfis?.nome !== requiredRoles) {
  //   return <p>🚫 Você não tem permissão para acessar esta página</p>
  // }


  return children ? children : <Outlet />
}

export default ProtectedRoute
