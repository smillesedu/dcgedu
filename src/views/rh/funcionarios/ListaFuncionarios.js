import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CRow, CCol, CButton } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalFuncionario from './ModalFuncionario'
import FiltrosFuncionarios from './FiltrosFuncionarios'

const ListaFuncionarios = () => {
  const [funcs, setFuncs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [filtros, setFiltros] = useState({ nome: '', status: '', departamento_id: '' })
  const [departamentos, setDepartamentos] = useState([])
  const [cargos, setCargos] = useState([])

  useEffect(() => {
    fetchAux()
    fetchFuncionarios()
  }, [])

  const fetchAux = async () => {
    const { data: deps } = await supabase.from('departamentos').select('id, nome').order('nome')
    const { data: cgs } = await supabase.from('cargos').select('id, nome').order('nome')
    setDepartamentos(deps || [])
    setCargos(cgs || [])
  }

  const fetchFuncionarios = async () => {
    let query = supabase
      .from('funcionarios')
      .select(
        'id, nome, email, telefone, status, data_admissao, salario_base, departamento:departamentos(nome), cargo:cargos(nome)',
      )
      .order('nome', { ascending: true })

    if (filtros.nome) query = query.ilike('nome', `%${filtros.nome}%`)
    if (filtros.status) query = query.eq('status', filtros.status)
    if (filtros.departamento_id) query = query.eq('departamento_id', filtros.departamento_id)

    const { data, error } = await query
    if (!error) setFuncs(data || [])
  }

  const openNovo = () => {
    setEditando(null)
    setShowModal(true)
  }
  const openEditar = (f) => {
    setEditando(f)
    setShowModal(true)
  }

  const excluir = async (id) => {
    if (!window.confirm('Excluir funcionário?')) return
    await supabase.from('funcionarios').delete().eq('id', id)
    fetchFuncionarios()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader className="d-flex justify-content-between">
            <strong>Funcionários</strong>
            <CButton color="primary" onClick={openNovo}>
              + Novo
            </CButton>
          </CCardHeader>
          <CCardBody>
            <FiltrosFuncionarios
              filtros={filtros}
              setFiltros={setFiltros}
              onFiltrar={fetchFuncionarios}
              departamentos={departamentos}
            />

            <div className="table-responsive mt-3">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Departamento</th>
                    <th>Cargo</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {funcs.map((f) => (
                    <tr key={f.id}>
                      <td>{f.nome}</td>
                      <td>{f.email}</td>
                      <td>{f.telefone}</td>
                      <td>{f.departamento?.nome || '-'}</td>
                      <td>{f.cargo?.nome || '-'}</td>
                      <td>
                        <span
                          className={`badge bg-${f.status === 'ativo' ? 'success' : f.status === 'afastado' ? 'warning' : 'secondary'}`}
                        >
                          {f.status}
                        </span>
                      </td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => openEditar(f)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => excluir(f.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                  {funcs.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center text-muted">
                        Nenhum registro
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {showModal && (
        <ModalFuncionario
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSaved={fetchFuncionarios}
          departamentos={departamentos}
          cargos={cargos}
          funcionario={editando}
        />
      )}
    </CRow>
  )
}

export default ListaFuncionarios
