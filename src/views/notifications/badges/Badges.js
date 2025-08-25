import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'
import ModalCadastroParametro from './ModalCadastroParametro'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'

const ParametrosRegrasAcademicas = () => {
  const [parametros, setParametros] = useState([])
  const [filtros, setFiltros] = useState({ nome: '', tipo: '' })
  const [parametroEditando, setParametroEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [parametroParaExcluir, setParametroParaExcluir] = useState(null)

  useEffect(() => {
    fetchParametros()
  }, [])

  const fetchParametros = async () => {
    let query = supabase.from('parametros_regras').select('*').order('nome', { ascending: true })

    if (filtros.nome) query = query.ilike('nome', `%${filtros.nome}%`)
    if (filtros.tipo) query = query.ilike('tipo', `%${filtros.tipo}%`)

    const { data, error } = await query
    if (!error) setParametros(data)
  }

  const confirmarExclusao = (parametro) => {
    setParametroParaExcluir(parametro)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (parametroParaExcluir) {
      await supabase.from('parametros_regras').delete().eq('id', parametroParaExcluir.id)
      fetchParametros()
    }
    setShowConfirm(false)
  }

  return (
    <div>
      <h4 className="mb-4">Parâmetros e Regras Acadêmicas</h4>

      {/* Filtros */}
      <div className="card mb-3">
        <div className="card-header">
          <strong>Filtros</strong>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Parâmetro"
                value={filtros.nome}
                onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Tipo (Ex: Regra, Limite, Data...)"
                value={filtros.tipo}
                onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={fetchParametros}>
                Filtrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Novo Parâmetro */}
      <div className="mb-3 text-end">
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#modalCadastroParametro"
          onClick={() => setParametroEditando(null)}
        >
          Novo Parâmetro
        </button>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="card-body">
          <PaginationWrapper data={parametros} itemsPerPage={5}>
            {(paginaAtual) => (
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginaAtual.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.nome}</td>
                      <td>{p.tipo}</td>
                      <td>{p.descricao}</td>
                      <td>{p.valor}</td>
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
                                data-bs-target="#modalCadastroParametro"
                                onClick={() => setParametroEditando(p)}
                              >
                                Editar
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => confirmarExclusao(p)}
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
      <ModalCadastroParametro parametroEditando={parametroEditando} onSalvo={fetchParametros} />

      {/* Modal Confirmação */}
      <ModalConfirmacao
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Parâmetro"
        message={`Tem certeza que deseja excluir o parâmetro "${parametroParaExcluir?.nome}"?`}
      />
    </div>
  )
}

export default ParametrosRegrasAcademicas
