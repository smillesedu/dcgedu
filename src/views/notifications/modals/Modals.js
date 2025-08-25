import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'
import ModalCadastroFeriado from './ModalCadastroFeriado'

const CadastroFeriadosDatasLetivas = () => {
  const [feriados, setFeriados] = useState([])
  const [filtros, setFiltros] = useState({ nome: '', tipo: '', ano: '' })
  const [feriadoEditando, setFeriadoEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [feriadoParaExcluir, setFeriadoParaExcluir] = useState(null)

  useEffect(() => {
    fetchFeriados()
  }, [])

  const fetchFeriados = async () => {
    let query = supabase.from('feriados_datas').select('*').order('data', { ascending: true })

    if (filtros.nome) query = query.ilike('nome', `%${filtros.nome}%`)
    if (filtros.tipo) query = query.ilike('tipo', `%${filtros.tipo}%`)
    if (filtros.ano) query = query.ilike('ano', `%${filtros.ano}%`)

    const { data, error } = await query
    if (!error) setFeriados(data || [])
  }

  const confirmarExclusao = (feriado) => {
    setFeriadoParaExcluir(feriado)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (feriadoParaExcluir) {
      await supabase.from('feriados_datas').delete().eq('id', feriadoParaExcluir.id)
      fetchFeriados()
    }
    setShowConfirm(false)
  }

  return (
    <div>
      <h4 className="mb-4">Cadastro de Feriados e Datas Letivas</h4>

      {/* Filtros */}
      <div className="card mb-3">
        <div className="card-header">
          <strong>Filtros</strong>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                value={filtros.nome}
                onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Tipo (Feriado, Data Letiva...)"
                value={filtros.tipo}
                onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Ano"
                value={filtros.ano}
                onChange={(e) => setFiltros({ ...filtros, ano: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={fetchFeriados}>
                Filtrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Novo */}
      <div className="mb-3 text-end">
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#modalCadastroFeriado"
          onClick={() => setFeriadoEditando(null)}
        >
          Novo Feriado/Data Letiva
        </button>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="card-body">
          <PaginationWrapper data={feriados} itemsPerPage={5}>
            {(paginaAtual) => (
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Ano</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginaAtual.map((f) => (
                    <tr key={f.id}>
                      <td>{f.id}</td>
                      <td>{f.nome}</td>
                      <td>{f.tipo}</td>
                      <td>{new Date(f.data).toLocaleDateString()}</td>
                      <td>{f.ano}</td>
                      <td>{f.descricao}</td>
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
                                data-bs-target="#modalCadastroFeriado"
                                onClick={() => setFeriadoEditando(f)}
                              >
                                Editar
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => confirmarExclusao(f)}
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
      <ModalCadastroFeriado feriadoEditando={feriadoEditando} onSalvo={fetchFeriados} />

      {/* Modal Confirmação */}
      <ModalConfirmacao
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Feriado/Data Letiva"
        message={`Tem certeza que deseja excluir "${feriadoParaExcluir?.nome}"?`}
      />
    </div>
  )
}

export default CadastroFeriadosDatasLetivas
