import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Landing page
// const SevemSmilles = React.lazy(() => import('./views/'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const CursosGroups = React.lazy(() => import('./views/base/cursos-groups/GestaoCursosPage'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const LookTeacher = React.lazy(() => import('./views/buttons/look-teatcher/LookTeacher'))
const TeacherPortal = React.lazy(() => import('./views/buttons/teatcher-portal/TeacherPortal'))
const TimeControler = React.lazy(() => import('./views/buttons/time-controler/TimeControler'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Notification = React.lazy(() => import('./views/icons/notification/Notification'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Vendas e comercial
const GestaoLeads = React.lazy(() => import('./views/comercial/gestao-leads/GestaoLeads'))
const FunilVendas = React.lazy(() => import('./views/comercial/funil-vendas/FunilVendas'))
const PropostasOfertas = React.lazy(
  () => import('./views/comercial/propostas-ofertas/ControlePropostas'),
)
const RelatoriosComercial = React.lazy(
  () => import('./views/comercial/relatorios-comercial/RelatoriosConversao'),
)
const EquipeComercial = React.lazy(
  () => import('./views/comercial/equipe-comercial/GestaoEquipeComercial'),
)
// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const RelatorioGerais = React.lazy(
  () => import('./views/notifications/relatorio-gerais/RelatorioGerais'),
)

// Gestão finaceira
const ControleInadimplencia = React.lazy(
  () => import('./views/gestao-financeira/controle-inadimplencia/ControleInadimplencia'),
)
const ControleMensalidades = React.lazy(
  () => import('./views/gestao-financeira/controle-mensalidades/ControleMensalidades'),
)
const DescontosBolsas = React.lazy(
  () => import('./views/gestao-financeira/descontos-bolsas/DescontosBolsas'),
)
const EmissaoFaturasRecibos = React.lazy(
  () => import('./views/gestao-financeira/emissao-faturas-recibos/EmissaoFaturasRecibos'),
)
const PagamentosFaturacao = React.lazy(
  () => import('./views/gestao-financeira/pagamento-faturacao/PagamentosFaturacao'),
)
const ParametrosRegras = React.lazy(
  () => import('./views/gestao-financeira/parametros-regras-academicas/ParametrosRegras'),
)
const RelatorioFinanceiro = React.lazy(
  () => import('./views/gestao-financeira/relatorio-financeiro/RelatorioFinanceiro'),
)

//RH
const ListaCargos = React.lazy(() => import('./views/rh/cargos/ListaCargos'))
const ListaDepartamentos = React.lazy(() => import('./views/rh/departamentos/ListaDepartamentos'))
const ListaFuncionarios = React.lazy(() => import('./views/rh/funcionarios/ListaFuncionarios'))
const GerarFolha = React.lazy(() => import('./views/rh/folha-pagamento/GerarFolha'))
const RecibosPagamento = React.lazy(() => import('./views/rh/folha-pagamento/RecibosPagamento'))
const RegistroPonto = React.lazy(() => import('./views/rh/presencas/RegistroPonto'))
const RelatorioPresencas = React.lazy(() => import('./views/rh/presencas/RelatorioPresencas'))

// Configurações
const ConfiguracoesGerais = React.lazy(
  () => import('./views/configuracoes/pages/ConfiguracoesGerais'),
)
const Integracoes = React.lazy(() => import('./views/configuracoes/pages/Integracoes'))
const ParametrosAcademicos = React.lazy(
  () => import('./views/configuracoes/pages/ParametrosAcademicos'),
)
const ParametrosFinanceiros = React.lazy(
  () => import('./views/configuracoes/pages/ParametrosFinanceiros'),
)
const Personalizacao = React.lazy(() => import('./views/configuracoes/pages/Personalizacao'))
const UsuariosPerfis = React.lazy(() => import('./views/configuracoes/pages/UsuariosPerfis'))

const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', name: 'Home', element: Dashboard },
  // { path: '/sevem-smilles', name: 'Sevem Smilles', element: SevemSmilles },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/cursos-groups', name: 'Cursos Groups', element: CursosGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/buttons/look-teatcher', name: 'Acompanhamento', element: LookTeacher },
  {
    path: '/buttons/teatcher-portal',
    name: 'Portal do Professor',
    element: TeacherPortal,
  },
  {
    path: '/buttons/time-controler',
    name: 'Controle de Carga Horária',
    element: TimeControler,
  },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/notification', name: 'Notification', element: Notification },
  {
    path: '/gestao-financeira',
    name: 'Gestão Financeira',
    element: ControleMensalidades,
    exact: true,
  },
  {
    path: '/gestao-financeira/controle-inadimplencia',
    name: 'Controle de Inadimplência',
    element: ControleInadimplencia,
  },
  {
    path: '/gestao-financeira/controle-mensalidades',
    name: 'Controle de Mensalidades',
    element: ControleMensalidades,
  },
  {
    path: '/gestao-financeira/descontos-bolsas',
    name: 'Descontos e Bolsas',
    element: DescontosBolsas,
  },
  {
    path: '/gestao-financeira/emissao-faturas-recibos',
    name: 'Emissão de Faturas e Recibos',
    element: EmissaoFaturasRecibos,
  },
  {
    path: '/gestao-financeira/pagamento-faturacao',
    name: 'Pagamentos e Faturação',
    element: PagamentosFaturacao,
  },
  {
    path: '/gestao-financeira/parametros-regras-academicas',
    name: 'Parâmetros e Regras Acadêmicas',
    element: ParametrosRegras,
  },
  {
    path: '/gestao-financeira/relatorio-financeiro',
    name: 'Relatório Financeiro',
    element: RelatorioFinanceiro,
  },
  {
    path: '/comercial/gestao-leads',
    name: 'Gestão de Leads e Oportunidades',
    element: GestaoLeads,
  },
  { path: '/comercial/funil-vendas', name: 'Funil de Vendas', element: FunilVendas },
  {
    path: '/comercial/propostas-ofertas',
    name: 'Relatórios Comerciais',
    element: PropostasOfertas,
  },
  {
    path: '/comercial/relatorios-comercial',
    name: 'Equipe Comercial',
    element: RelatoriosComercial,
  },
  {
    path: '/comercial/equipe-comercial',
    name: 'Propostas Comerciais e Ofertas',
    element: EquipeComercial,
  },

  { path: '/rh/cargos', name: 'Cargos e Funções', element: ListaCargos },
  { path: '/rh/departamentos', name: 'Departamentos', element: ListaDepartamentos },
  { path: '/rh/funcionarios', name: 'Funcionarios', element: ListaFuncionarios },
  { path: '/rh/folha-pagamento', name: 'Folha de Pagamento', element: GerarFolha },
  {
    path: '/rh/recibos-pagamento',
    name: 'Recibo de Pagamento',
    element: RecibosPagamento,
  },
  { path: '/rh/presencas', name: 'Presenças e Faltas', element: RegistroPonto },
  {
    path: '/rh/relatorio-presencas',
    name: 'Relatório de Presenças ',
    element: RelatorioPresencas,
  },

  {
    path: '/config/config-geral',
    name: 'Configurações Gereais ',
    element: ConfiguracoesGerais,
  },
  { path: '/config/integracoes', name: 'Integrações', element: Integracoes },
  {
    path: '/config/parametros-academico',
    name: 'Parâmetro Acadêmico',
    element: ParametrosAcademicos,
  },
  {
    path: '/config/parametros-finaceiros',
    name: 'Parâmetro Financeiro',
    element: ParametrosFinanceiros,
  },
  { path: '/config/personalizacao', name: 'Personalização', element: Personalizacao },
  { path: '/config/user-profile', name: 'Perfil do Usuário', element: UsuariosPerfis },

  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  {
    path: '/notifications/relatorio-gerais',
    name: 'Relatório Gerais',
    element: RelatorioGerais,
  },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
