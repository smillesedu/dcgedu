import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'
import ModalCadastroDisciplina from './ModalCadastroDisciplina'

const ControleDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([])
  const [filtros, setFiltros] = useState({ nome: '', codigo: '' })
  const [disciplinaEditando, setDisciplinaEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [disciplinaParaExcluir, setDisciplinaParaExcluir] = useState(null)

  useEffect(() => {
    fetchDisciplinas()
  }, [])

  const fetchDisciplinas = async () => {
    let query = supabase.from('disciplinas').select('*').order('nome', { ascending: true })

    if (filtros.nome) query = query.ilike('nome', `%${filtros.nome}%`)
    if (filtros.codigo) query = query.ilike('codigo', `%${filtros.codigo}%`)

    const { data, error } = await query
    if (!error) setDisciplinas(data || [])
  }

  const confirmarExclusao = (disciplina) => {
    setDisciplinaParaExcluir(disciplina)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (disciplinaParaExcluir) {
      await supabase.from('disciplinas').delete().eq('id', disciplinaParaExcluir.id)
      fetchDisciplinas()
    }
    setShowConfirm(false)
  }

  return (
    <div>
      <h4 className="mb-4">Controle de Disciplinas</h4>

      {/* Filtros */}
      <div className="card mb-3">
        <div className="card-header">
          <strong>Filtros</strong>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Nome da Disciplina"
                value={filtros.nome}
                onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Código"
                value={filtros.codigo}
                onChange={(e) => setFiltros({ ...filtros, codigo: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={fetchDisciplinas}>
                Filtrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Nova Disciplina */}
      <div className="mb-3 text-end">
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#modalCadastroDisciplina"
          onClick={() => setDisciplinaEditando(null)}
        >
          Nova Disciplina
        </button>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="card-body">
          <PaginationWrapper data={disciplinas} itemsPerPage={5}>
            {(paginaAtual) => (
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Código</th>
                    <th>Carga Horária</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginaAtual.map((d) => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.nome}</td>
                      <td>{d.codigo}</td>
                      <td>{d.carga_horaria}h</td>
                      <td>{d.descricao}</td>
                      <td>
                        <div className="dropdown">
                          <button
                            className="btn btn-secondary btn-sm dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            Ações
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#modalCadastroDisciplina"
                                onClick={() => setDisciplinaEditando(d)}
                              >
                                Editar
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => confirmarExclusao(d)}
                              >
                                Excluir
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </PaginationWrapper>
        </div>
      </div>

      {/* Modal Cadastro */}
      <ModalCadastroDisciplina disciplinaEditando={disciplinaEditando} onSalvo={fetchDisciplinas} />

      {/* Modal Confirmação */}
      <ModalConfirmacao
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Disciplina"
        message={`Tem certeza que deseja excluir a disciplina "${disciplinaParaExcluir?.nome}"?`}
      />
    </div>
  )
}

export default ControleDisciplinas
