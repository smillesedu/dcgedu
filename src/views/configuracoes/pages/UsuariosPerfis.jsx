import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CCol,
} from '@coreui/react'
import ListaUsuarios from '../components/UsuariosPerfis/ListaUsuarios'
import ListaPerfis from '../components/UsuariosPerfis/ListaPerfis'

export default function UsuariosPerfis() {
  const [tab, setTab] = useState('usuarios')

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <h4 className="mb-0">Gestão de Usuários & Perfis</h4>
          </CCardHeader>
          <CCardBody>
            {/* Nav Tabs */}
            <CNav variant="tabs" role="tablist" className="mb-3">
              <CNavItem>
                <CNavLink
                  active={tab === 'usuarios'}
                  onClick={() => setTab('usuarios')}
                  className="cursor-pointer"
                >
                  Usuários
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={tab === 'perfis'}
                  onClick={() => setTab('perfis')}
                  className="cursor-pointer"
                >
                  Perfis
                </CNavLink>
              </CNavItem>
            </CNav>

            {/* Conteúdo */}
            <div>{tab === 'usuarios' ? <ListaUsuarios /> : <ListaPerfis />}</div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
