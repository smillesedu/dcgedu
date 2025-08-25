import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CRow,
  CCol,
} from '@coreui/react'
import { getUsuarios } from '../../services/usuariosPerfisService'
import UsuarioForm from './UsuarioForm'

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    carregarUsuarios()
  }, [])

  const carregarUsuarios = async () => {
    const data = await getUsuarios()
    setUsuarios(data)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Usuários</h5>
            <CButton
              color={showForm ? 'secondary' : 'primary'}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar' : 'Novo Usuário'}
            </CButton>
          </CCardHeader>
          <CCardBody>
            {/* Formulário para adicionar usuário */}
            {showForm && <UsuarioForm onSuccess={carregarUsuarios} />}

            {/* Lista de usuários */}
            <CListGroup className="mt-3">
              {usuarios.length === 0 ? (
                <CListGroupItem>Nenhum usuário cadastrado.</CListGroupItem>
              ) : (
                usuarios.map((u) => (
                  <CListGroupItem
                    key={u.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {u.nome} ({u.email})
                    {/* Aqui você pode adicionar botões de Editar / Excluir futuramente */}
                  </CListGroupItem>
                ))
              )}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
