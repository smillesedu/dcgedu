import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Analises',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Principal',
  },
  {
    component: CNavGroup,
    name: 'Gestão Acadêmica',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Gestão de Alunos',
        to: '/base/accordion',
      },
      {
        name: 'Matrícula e Rematrícula',
        component: CNavItem,
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Histórico Escolar e Boletins',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        to: '/base/collapses',
        name: 'Emissão de Documentos',
      },
      {
        name: 'Gestão de Turma',
        component: CNavItem,
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        to: '/base/navs',
        name: 'Gestão de Notas',
      },
      {
        name: 'Gestão de Frequência',
        component: CNavItem,
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        to: '/base/placeholders',
        name: 'Gestão de Calendário Acadêmico',
      },
      {
        component: CNavItem,
        to: '/base/popovers',
        name: 'Gestão de Aulas',
      },
      {
        component: CNavItem,
        to: '/base/progress',
        name: 'Transferência interna e externa de alunos',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Gestão de Perfis',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Gestão de Professores',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Atribuição de Disciplinas a Professores',
        to: '/buttons/dropdowns',
      },
      // {
      //   component: CNavItem,
      //   name: 'Gestão de Equipe Administrativa',
      //   to: '/buttons/button-groups',
      // },

      {
        component: CNavItem,
        name: 'Gestão de Equipe Administrativa',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Controle de Carga horária',
        to: '/buttons/time-controler',
      },
      {
        component: CNavItem,
        name: 'Desempenho do Docente',
        to: '/buttons/look-teatcher',
      },
      {
        component: CNavItem,
        name: 'Portal do Professor',
        to: '/buttons/teatcher-portal',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Portal do Aluno',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Visualização de Notas e Faltas',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Acesso a Boletins e Documentos',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Download de Materiais e Tarefas',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Matrícula e Rematrícula',
        to: '/forms/input-group',
      },

      {
        component: CNavItem,
        name: 'Cronograma do Aluno',
        to: '/forms/range',
      },
      // {
      //   component: CNavItem,
      //   name: 'Layout',
      //   to: '/forms/layout',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Validation',
      //   to: '/forms/validation',
      // },
    ],
  },

  {
    component: CNavGroup,
    name: 'Portal dos Pais/Responsáveis',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Desempenho do Aluno',
        to: '/icons/coreui-icons',
      },
      {
        component: CNavItem,
        name: 'Notificações e cominicados da escola',
        to: '/icons/notification',
      },
      {
        component: CNavItem,
        name: 'Soliocitação de Documentos e Matrícula',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'Contato com Professors e Direção',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Gestão Escolar/Administração',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Gestão de Unidade Escolares',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Parâmetos e Regras Acadêmicas',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Cadastro de Feriados e Datas letivas',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Controle de Disciplinas',
        to: '/notifications/toasts',
      },
      {
        component: CNavItem,
        name: 'Relatórios Gerenciais e Estatísticos',
        to: '/notifications/relatorio-gerais',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestão Financeira',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Controle de Mensalidades e Cobranças',
        to: '/gestao-financeira/controle-mensalidades',
      },
      {
        component: CNavItem,
        name: 'Regras de Pagamento e Faturação',
        to: '/gestao-financeira/parametros-regras-academicas',
      },
      {
        component: CNavItem,
        name: 'Emissão de Faturas e Recibos',
        to: '/gestao-financeira/emissao-faturas-recibos',
      },
      {
        component: CNavItem,
        name: 'Controle de inadimplência',
        to: '/gestao-financeira/controle-inadimplencia',
      },
      {
        component: CNavItem,
        name: 'Relatório Financeiro',
        to: '/gestao-financeira/relatorio-financeiro',
      },
      {
        component: CNavItem,
        name: 'Descontos e Bolsas',
        to: '/gestao-financeira/descontos-bolsas',
      },
      {
        component: CNavItem,
        name: 'Pagamentos e Faturação',
        to: '/gestao-financeira/pagamento-faturacao',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestão de Avaliação',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Registro de Provas e Trabalhos',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Peso das Avaliações',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Recuperação e Avaliação Final',
        to: '/notifications/modals',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Vendas e Comercial',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Gestão de Leads e Oportunidades',
        to: '/comercial/gestao-leads',
      },
      {
        component: CNavItem,
        name: 'Funil de Vendas',
        to: '/comercial/funil-vendas',
      },
      {
        component: CNavItem,
        name: 'Propostas Comerciais e Ofertas',
        to: '/comercial/propostas-ofertas',
      },
      {
        component: CNavItem,
        name: 'Relatórios Comerciais',
        to: '/comercial/relatorios-comercial',
      },
      {
        component: CNavItem,
        name: 'Equipe Comercial',
        to: '/comercial/equipe-comercial',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Recursos Humanos',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Cargos e Funções',
        to: '/rh/cargos',
      },
      {
        component: CNavItem,
        name: 'Departamentos',
        to: '/rh/departamentos',
      },
      {
        component: CNavItem,
        name: 'Funcionarios',
        to: '/rh/funcionarios',
      },
      {
        component: CNavItem,
        name: 'Folha de Pagamento',
        to: '/rh/folha-pagamento',
      },
      {
        component: CNavItem,
        name: 'Recibo de Pagamento',
        to: '/rh/recibos-pagamento',
      },
      {
        component: CNavItem,
        name: 'Presenças e Faltas',
        to: '/rh/presencas',
      },
      {
        component: CNavItem,
        name: 'Relatório de Presenças',
        to: '/rh/relatorio-presencas',
      },
    ],
  },

  // {
  //   component: CNavGroup,
  //   name: 'Documentação e Registros',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Emissão de Boletin',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Atestado de Matrícula',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Histórico da Escola',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Declaração de Frequência',
  //       to: '/notifications/modals',
  //     },

  //     {
  //       component: CNavItem,
  //       name: 'Gestão de Arquivos',
  //       to: '/notifications/modals',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Configurações e Integrações',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Configurações Gerais',
        to: '/config/config-geral',
      },
      {
        component: CNavItem,
        name: 'Integrações',
        to: '/config/integracoes',
      },
      {
        component: CNavItem,
        name: 'Parâmetro Acadêmico',
        to: '/config/parametros-academico',
      },
      {
        component: CNavItem,
        name: 'Parâmetro Financeiro',
        to: '/config/parametros-finaceiros',
      },
      {
        component: CNavItem,
        name: 'Personalização',
        to: '/config/personalizacao',
      },
      {
        component: CNavItem,
        name: 'Perfil do Usuário',
        to: '/config/user-profile',
      },
    ],
  },

  // {
  //   component: CNavGroup,
  //   name: 'Arquivos e Marerias Didáticos',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Upload e Download de Arquivos',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Relatórios e Indicadores',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Relatórios',
  //       to: '/login',
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
