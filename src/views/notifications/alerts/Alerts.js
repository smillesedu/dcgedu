import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'
import ModalCadastroUnidade from './ModalCadastroUnidade'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'

const GestaoUnidades = () => {
  const [unidades, setUnidades] = useState([])
  const [filtros, setFiltros] = useState({ nome: '', cidade: '', estado: '' })
  const [unidadeEditando, setUnidadeEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [unidadeParaExcluir, setUnidadeParaExcluir] = useState(null)

  useEffect(() => {
    fetchUnidades()
  }, [])

  const fetchUnidades = async () => {
    let query = supabase.from('unidades').select('*').order('nome', { ascending: true })

    if (filtros.nome) query = query.ilike('nome', `%${filtros.nome}%`)
    if (filtros.cidade) query = query.ilike('cidade', `%${filtros.cidade}%`)
    if (filtros.estado) query = query.ilike('estado', `%${filtros.estado}%`)

    const { data, error } = await query
    if (!error) setUnidades(data)
  }

  const confirmarExclusao = (unidade) => {
    setUnidadeParaExcluir(unidade)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (unidadeParaExcluir) {
      await supabase.from('unidades').delete().eq('id', unidadeParaExcluir.id)
      fetchUnidades()
    }
    setShowConfirm(false)
  }

  return (
    <div>
      <h4 className="mb-4">Gestão de Unidades Escolares</h4>

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
                placeholder="Nome da Unidade"
                value={filtros.nome}
                onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Cidade"
                value={filtros.cidade}
                onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Estado"
                value={filtros.estado}
                onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={fetchUnidades}>
                Filtrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Nova Unidade */}
      <div className="mb-3 text-end">
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#modalCadastroUnidade"
          onClick={() => setUnidadeEditando(null)}
        >
          Nova Unidade
        </button>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="card-body">
          <PaginationWrapper data={unidades} itemsPerPage={5}>
            {(paginaAtual) => (
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Cidade</th>
                    <th>Estado</th>
                    <th>Endereço</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginaAtual.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.nome}</td>
                      <td>{u.cidade}</td>
                      <td>{u.estado}</td>
                      <td>{u.endereco}</td>
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
                                data-bs-target="#modalCadastroUnidade"
                                onClick={() => setUnidadeEditando(u)}
                              >
                                Editar
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => confirmarExclusao(u)}
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
      <ModalCadastroUnidade unidadeEditando={unidadeEditando} onSalvo={fetchUnidades} />

      {/* Modal Confirmação */}
      <ModalConfirmacao
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Unidade"
        message={`Tem certeza que deseja excluir a unidade "${unidadeParaExcluir?.nome}"?`}
      />
    </div>
  )
}

export default GestaoUnidades
