// import React, { Suspense } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import { CContainer, CSpinner } from '@coreui/react'

// // routes config
// import routes from '../routes'

// const AppContent = () => {
//   return (
//     <CContainer className="px-4" lg>
//       <Suspense fallback={<CSpinner color="primary" />}>
//         <Routes>
//           {routes.map((route, idx) => {
//             return (
//               route.element && (
//                 <Route
//                   key={idx}
//                   path={route.path}
//                   exact={route.exact}
//                   name={route.name}
//                   element={<route.element />}
//                 />
//               )
//             )
//           })}
//         </Routes>
//       </Suspense>
//     </CContainer>
//   )
// }

// export default React.memo(AppContent)


// AppContent.jsx
import React, { Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { CContainer, CSpinner } from "@coreui/react"

import routes from "../routes"
import ProtectedRoute from "../ProtectedRoute"

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            if (route.element) {
              const Element = route.element
              return (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  element={
                    <ProtectedRoute requiredRoles={['admin', 'gestor', 'Professor', 'Aluno']} roles={route.roles}>
                      <Element />
                    </ProtectedRoute>
                  }
                />
              )
            }
            return null
          })}
          {/* fallback para páginas não encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
