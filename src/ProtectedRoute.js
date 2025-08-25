import { Navigate, Outlet } from "react-router-dom"
import { UserAuth } from "./context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { session } = UserAuth()

  if (!session) {
    return <Navigate to="/" replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
