import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import FiltroCronograma from './FiltroCronograma'
import ModalEventoCronograma from './ModalEventoCronograma'
import { PaginationWrapper } from '../../../components'

const CronogramaAluno = () => {
  const [eventos, setEventos] = useState([])
  const [eventoSelecionado, setEventoSelecionado] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const fetchEventos = async (filters = {}) => {
    let query = supabase.from('cronograma').select(`
      id,
      curso:cursos(nome),
      disciplina:disciplinas(nome),
      data_evento,
      hora_inicio,
      hora_fim,
      descricao
    `)

    if (filters.curso) query = query.eq('curso_id', filters.curso)
    if (filters.disciplina) query = query.eq('disciplina_id', filters.disciplina)
    if (filters.data_inicio) query = query.gte('data_evento', filters.data_inicio)
    if (filters.data_fim) query = query.lte('data_evento', filters.data_fim)

    const { data, error } = await query
    if (!error) setEventos(data || [])
    else console.error(error)
  }

  useEffect(() => {
    fetchEventos()
  }, [])

  const abrirModal = (evento) => {
    setEventoSelecionado(evento)
    setShowModal(true)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Cronograma do Aluno</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <FiltroCronograma onFiltrar={fetchEventos} />
        </CContainer>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={eventos} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Curso</th>
                      <th>Disciplina</th>
                      <th>Data</th>
                      <th>Hora</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((evento) => (
                      <tr key={evento.id}>
                        <td>{evento.id}</td>
                        <td>{evento.curso?.nome || '-'}</td>
                        <td>{evento.disciplina?.nome || '-'}</td>
                        <td>{evento.data_evento}</td>
                        <td>
                          {evento.hora_inicio} - {evento.hora_fim}
                        </td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => abrirModal(evento)}
                          >
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </PaginationWrapper>

            {showModal && (
              <ModalEventoCronograma
                show={showModal}
                evento={eventoSelecionado}
                onClose={() => setShowModal(false)}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CronogramaAluno
