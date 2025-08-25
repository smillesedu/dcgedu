import React, { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalDepartamento from './ModalDepartamento'

const ListaDepartamentos = () => {
  const [deps, setDeps] = useState([])
  const [show, setShow] = useState(false)
  const [editando, setEditando] = useState(null)

  const load = async () => {
    const { data } = await supabase.from('departamentos').select('*').order('nome')
    setDeps(data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const excluir = async (id) => {
    if (!window.confirm('Excluir departamento?')) return
    await supabase.from('departamentos').delete().eq('id', id)
    load()
  }

  return (
    <CCard className="my-4">
      <CCardHeader className="d-flex justify-content-between">
        <strong>Departamentos</strong>
        <CButton
          color="primary"
          onClick={() => {
            setEditando(null)
            setShow(true)
          }}
        >
          + Novo
        </CButton>
      </CCardHeader>
      <CCardBody>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deps.map((d) => (
              <tr key={d.id}>
                <td>{d.nome}</td>
                <td>{d.descricao || '-'}</td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      setEditando(d)
                      setShow(true)
                    }}
                  >
                    Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => excluir(d.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CCardBody>

      {show && (
        <ModalDepartamento
          visible={show}
          onClose={() => setShow(false)}
          onSaved={load}
          departamento={editando}
        />
      )}
    </CCard>
  )
}
export default ListaDepartamentos
