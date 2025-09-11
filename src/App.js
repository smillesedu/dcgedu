import React, { Suspense, useEffect } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { CSpinner, useColorModes } from "@coreui/react"
import { useTranslation } from "react-i18next";
import "./i18n";

import "./scss/style.scss"
import "./scss/globals.css"
import "./scss/examples.scss"

import ProtectedRoute from "./ProtectedRoute"
import { AuthContextProvider } from "./context/AuthContext"
import routes from "./routes"

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"))
const RootLayout = React.lazy(() => import("./layout/Layout"))

// Pages públicas
const Login = React.lazy(() => import("./views/pages/login/Login"))
const Register = React.lazy(() => import("./views/pages/register/Register"))
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"))
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"))

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { isColorModeSet, setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  )
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1])
    const theme =
      urlParams.get("theme") &&
      urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) setColorMode(theme)
    if (!isColorModeSet()) setColorMode(storedTheme)
  }, []) // eslint-disable-line

  return (
    <React.StrictMode>

      <AuthContextProvider>
        <HashRouter>
          <Suspense
            fallback={
              <div className="pt-3 text-center">
                <CSpinner color="primary" variant="grow" />
              </div>
            }
          >
            <Routes>
              {/* Rotas públicas */}
              {/* <Route path="/sevem-smilles" element={<RootLayout />} /> */}
              <Route path="/register" element={<Register />} />
              <Route path="/500" element={<Page500 />} />
              <Route index path="/" element={<RootLayout />} />
              <Route path="*" element={<Page404 />} />

              {/* Rotas protegidas */}
              <Route
                path="/"
                element={
                  <ProtectedRoute requiredRoles={['admin', 'gestor', 'Professor', 'Aluno']}>
                    <DefaultLayout />
                  </ProtectedRoute>
                }
              >
                {routes.map((route, idx) => {
                  const Component = route.element
                  return <Route key={idx} path={route.path} element={<Component />} />
                })}
              </Route>
            </Routes>
          </Suspense>
        </HashRouter>
      </AuthContextProvider>
    </React.StrictMode>

  )
}

export default App
