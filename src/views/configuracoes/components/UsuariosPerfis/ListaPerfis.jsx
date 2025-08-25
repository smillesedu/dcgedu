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
import { getPerfis } from '../../services/usuariosPerfisService'
import PerfilForm from './PerfilForm'

export default function ListaPerfis() {
  const [perfis, setPerfis] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    carregarPerfis()
  }, [])

  const carregarPerfis = async () => {
    const data = await getPerfis()
    setPerfis(data)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Perfis</h5>
            <CButton
              color={showForm ? 'secondary' : 'primary'}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar' : 'Novo Perfil'}
            </CButton>
          </CCardHeader>
          <CCardBody>
            {/* Formulário para adicionar perfil */}
            {showForm && <PerfilForm onSuccess={carregarPerfis} />}

            {/* Lista de perfis */}
            <CListGroup className="mt-3">
              {perfis.length === 0 ? (
                <CListGroupItem>Nenhum perfil cadastrado.</CListGroupItem>
              ) : (
                perfis.map((p) => (
                  <CListGroupItem
                    key={p.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {p.nome}
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
