import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'
import MinhasTurmas from './MinhasTurmas'
import NotasBoletim from './NotasBoletim'
import CalendarioAluno from './CalendarioAluno'
import AvisosComunicados from './AvisosComunicados'

const PortalAluno = ({ alunoId }) => {
  const [activeKey, setActiveKey] = useState(1)
  const [turmas, setTurmas] = useState([])
  const [notas, setNotas] = useState([])
  const [eventos, setEventos] = useState([])
  const [avisos, setAvisos] = useState([])

  useEffect(() => {
    if (alunoId) {
      fetchTurmas()
      fetchNotas()
      fetchEventos()
      fetchAvisos()
    }
  }, [alunoId])

  const fetchTurmas = async () => {
    const { data, error } = await supabase
      .from('turmas_alunos')
      .select('turma:turmas(id, nome, turno, ano_letivo, professor:professores(nome))')
      .eq('aluno_id', alunoId)
    if (!error) setTurmas(data || [])
  }

  const fetchNotas = async () => {
    const { data, error } = await supabase
      .from('notas')
      .select('disciplina:disciplinas(nome), nota, bimestre')
      .eq('aluno_id', alunoId)
    if (!error) setNotas(data || [])
  }

  const fetchEventos = async () => {
    const { data, error } = await supabase.from('eventos_academicos').select('*')
    if (!error) setEventos(data || [])
  }

  const fetchAvisos = async () => {
    const { data, error } = await supabase
      .from('avisos')
      .select('*')
      .order('data', { ascending: false })
    if (!error) setAvisos(data || [])
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>Portal do Aluno</strong>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs" role="tablist">
              <CNavItem>
                <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                  Minhas Turmas
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
                  Notas e Boletim
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
                  Calendário Acadêmico
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 4} onClick={() => setActiveKey(4)}>
                  Avisos
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="turmas-tab" visible={activeKey === 1}>
                <MinhasTurmas turmas={turmas} />
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="notas-tab" visible={activeKey === 2}>
                <NotasBoletim notas={notas} />
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="calendario-tab" visible={activeKey === 3}>
                <CalendarioAluno eventos={eventos} />
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="avisos-tab" visible={activeKey === 4}>
                <AvisosComunicados avisos={avisos} />
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PortalAluno
