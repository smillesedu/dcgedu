import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'

import EmailConfig from '../components/Integracoes/EmailConfig'
import WhatsAppConfig from '../components/Integracoes/WhatsAppConfig'
import ApiKeysConfig from '../components/Integracoes/ApiKeysConfig'

const Integracoes = () => {
  const [activeKey, setActiveKey] = useState(1)

  return (
    <CCard className="my-4">
      <CCardHeader>
        <strong>Integrações do Sistema</strong>
      </CCardHeader>
      <CCardBody>
        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
              Email
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
              WhatsApp
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
              API Keys
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>
          <CTabPane visible={activeKey === 1}>
            <EmailConfig />
          </CTabPane>
          <CTabPane visible={activeKey === 2}>
            <WhatsAppConfig />
          </CTabPane>
          <CTabPane visible={activeKey === 3}>
            <ApiKeysConfig />
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default Integracoes
