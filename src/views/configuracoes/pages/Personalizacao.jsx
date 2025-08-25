import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'
import TemplateDocumentos from '../components/Personalizacao/TemplateDocumentos'
import MensagensAutomaticas from '../components/Personalizacao/MensagensAutomaticas'
import RelatoriosConfig from '../components/Personalizacao/RelatoriosConfig'

const Personalizacao = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [templates, setTemplates] = useState([])
  const [mensagens, setMensagens] = useState([])
  const [relatorios, setRelatorios] = useState([])

  // Carregar dados do Supabase ao montar o componente
  useEffect(() => {
    fetchTemplates()
    fetchMensagens()
    fetchRelatorios()
  }, [])

  const fetchTemplates = async () => {
    const { data, error } = await supabase.from('personalizacao_templates').select('*')
    if (!error) setTemplates(data || [])
  }

  const fetchMensagens = async () => {
    const { data, error } = await supabase.from('personalizacao_mensagens').select('*')
    if (!error) setMensagens(data || [])
  }

  const fetchRelatorios = async () => {
    const { data, error } = await supabase.from('personalizacao_relatorios').select('*')
    if (!error) setRelatorios(data || [])
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>Personalização do Sistema</strong>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs" role="tablist">
              <CNavItem>
                <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                  Templates de Documentos
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
                  Mensagens Automáticas
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
                  Relatórios
                </CNavLink>
              </CNavItem>
            </CNav>

            <CTabContent>
              <CTabPane visible={activeKey === 1}>
                <TemplateDocumentos templates={templates} onAtualizar={fetchTemplates} />
              </CTabPane>

              <CTabPane visible={activeKey === 2}>
                <MensagensAutomaticas mensagens={mensagens} onAtualizar={fetchMensagens} />
              </CTabPane>

              <CTabPane visible={activeKey === 3}>
                <RelatoriosConfig relatorios={relatorios} onAtualizar={fetchRelatorios} />
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Personalizacao
