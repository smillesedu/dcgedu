import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import FiltroMateriais from './FiltroMateriais'
import ModalVisualizacaoMaterial from './ModalVisualizacaoMaterial'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'

const DownloadMateriais = () => {
  const [materiais, setMateriais] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [turmas, setTurmas] = useState([])
  const [professores, setProfessores] = useState([])

  const [materialSelecionado, setMaterialSelecionado] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [materialParaExcluir, setMaterialParaExcluir] = useState(null)

  // Buscar dados iniciais
  useEffect(() => {
    fetchMateriais()
    fetchDadosAuxiliares()
  }, [])

  const fetchMateriais = async (filters = {}) => {
    let query = supabase.from('materiais').select(`
      id,
      titulo,
      descricao,
      data_envio,
      disciplina:disciplinas(nome),
      turma:turmas(nome),
      professor:professores(nome),
      arquivo_url
    `)

    if (filters.disciplina) query = query.eq('disciplina', filters.disciplina)
    if (filters.turma) query = query.eq('turma', filters.turma)
    if (filters.professor) query = query.eq('professor', filters.professor)
    if (filters.search) query = query.ilike('titulo', `%${filters.search}%`)

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar materiais:', error)
    } else {
      setMateriais(data || [])
    }
  }

  const fetchDadosAuxiliares = async () => {
    const { data: disciplinasData } = await supabase.from('disciplinas').select('*')
    setDisciplinas(disciplinasData || [])

    const { data: turmasData } = await supabase.from('turmas').select('*')
    setTurmas(turmasData || [])

    const { data: professoresData } = await supabase.from('professores').select('*')
    setProfessores(professoresData || [])
  }

  const handleFiltrar = (filters) => {
    fetchMateriais(filters)
  }

  const abrirModalVisualizacao = (material) => {
    setMaterialSelecionado(material)
  }

  const confirmarExclusao = (material) => {
    setMaterialParaExcluir(material)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (materialParaExcluir) {
      const { error } = await supabase.from('materiais').delete().eq('id', materialParaExcluir.id)
      if (!error) {
        setMateriais((prev) => prev.filter((m) => m.id !== materialParaExcluir.id))
      }
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Download de Materiais e Tarefas</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <FiltroMateriais
            disciplinas={disciplinas}
            turmas={turmas}
            professores={professores}
            onFiltrar={handleFiltrar}
          />
        </CContainer>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={materiais} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Título</th>
                      <th>Descrição</th>
                      <th>Disciplina</th>
                      <th>Turma</th>
                      <th>Professor</th>
                      <th>Data</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((mat) => (
                      <tr key={mat.id}>
                        <td>{mat.id}</td>
                        <td>{mat.titulo}</td>
                        <td>{mat.descricao}</td>
                        <td>{mat.disciplina?.nome || '-'}</td>
                        <td>{mat.turma?.nome || '-'}</td>
                        <td>{mat.professor?.nome || '-'}</td>
                        <td>{new Date(mat.data_envio).toLocaleDateString()}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              Ações
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  className="dropdown-item btn-sm"
                                  onClick={() => abrirModalVisualizacao(mat)}
                                >
                                  <i className="fa fa-download"></i> Visualizar / Baixar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item btn-sm text-danger"
                                  onClick={() => confirmarExclusao(mat)}
                                >
                                  <i className="fa fa-trash"></i> Excluir
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

            <ModalVisualizacaoMaterial
              material={materialSelecionado}
              onFechar={() => setMaterialSelecionado(null)}
            />

            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Material"
              message={`Tem certeza que deseja excluir o material "${materialParaExcluir?.titulo}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DownloadMateriais
