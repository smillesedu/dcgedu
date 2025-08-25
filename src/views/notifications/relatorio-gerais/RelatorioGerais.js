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
  CSpinner,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

import RelatorioAlunos from './RelatorioAlunos'
import RelatorioProfessores from './RelatorioProfessores'
import RelatorioFrequencia from './RelatorioFrequencia'
import RelatorioFinanceiro from './RelatorioFinanceiro'

const RelatoriosGerenciais = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [alunos, setAlunos] = useState([])
  const [professores, setProfessores] = useState([])
  const [frequencias, setFrequencias] = useState([])
  const [financeiro, setFinanceiro] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDados()
  }, [])

  const fetchDados = async () => {
    setLoading(true)

    const { data: alunosData } = await supabase
      .from('alunos')
      .select('id, nome, status, curso_id')
      .order('nome', { ascending: true })

    const { data: profData } = await supabase
      .from('professores')
      .select('id, nome, disciplina')
      .order('nome', { ascending: true })

    const { data: freqData } = await supabase
      .from('frequencias')
      .select('id, aluno_id, turma_id, presente')

    const { data: finData } = await supabase.from('financeiro').select('id, aluno_id, valor, pago')

    setAlunos(alunosData || [])
    setProfessores(profData || [])
    setFrequencias(freqData || [])
    setFinanceiro(finData || [])

    setLoading(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>Relatórios Gerenciais e Estatísticos</strong>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                  Alunos
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
                  Professores
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
                  Frequência
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 4} onClick={() => setActiveKey(4)}>
                  Financeiro
                </CNavLink>
              </CNavItem>
            </CNav>

            {loading ? (
              <div className="text-center p-5">
                <CSpinner color="primary" />
              </div>
            ) : (
              <CTabContent>
                <CTabPane visible={activeKey === 1}>
                  <RelatorioAlunos dados={alunos} />
                </CTabPane>
                <CTabPane visible={activeKey === 2}>
                  <RelatorioProfessores dados={professores} />
                </CTabPane>
                <CTabPane visible={activeKey === 3}>
                  <RelatorioFrequencia dados={frequencias} />
                </CTabPane>
                <CTabPane visible={activeKey === 4}>
                  <RelatorioFinanceiro dados={financeiro} />
                </CTabPane>
              </CTabContent>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RelatoriosGerenciais
