// import React from 'react'
// import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
// import {
//   CChartBar,
//   CChartDoughnut,
//   CChartLine,
//   CChartPie,
//   CChartPolarArea,
//   CChartRadar,
// } from '@coreui/react-chartjs'
// import { DocsLink } from 'src/components'

// const Charts = () => {
//   const random = () => Math.round(Math.random() * 100)

//   return (
//     <CRow>
//       <CCol xs={12}></CCol>
//       <CCol xs={6}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             Bar Chart
//           </CCardHeader>
//           <CCardBody>
//             <CChartBar
//               data={{
//                 labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//                 datasets: [
//                   {
//                     label: 'GitHub Commits',
//                     backgroundColor: '#f87979',
//                     data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
//                   },
//                 ],
//               }}
//               labels="months"
//             />
//           </CCardBody>
//         </CCard>
//       </CCol>
//       <CCol xs={6}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             Line Chart
//           </CCardHeader>
//           <CCardBody>
//             <CChartLine
//               data={{
//                 labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//                 datasets: [
//                   {
//                     label: 'My First dataset',
//                     backgroundColor: 'rgba(220, 220, 220, 0.2)',
//                     borderColor: 'rgba(220, 220, 220, 1)',
//                     pointBackgroundColor: 'rgba(220, 220, 220, 1)',
//                     pointBorderColor: '#fff',
//                     data: [random(), random(), random(), random(), random(), random(), random()],
//                   },
//                   {
//                     label: 'My Second dataset',
//                     backgroundColor: 'rgba(151, 187, 205, 0.2)',
//                     borderColor: 'rgba(151, 187, 205, 1)',
//                     pointBackgroundColor: 'rgba(151, 187, 205, 1)',
//                     pointBorderColor: '#fff',
//                     data: [random(), random(), random(), random(), random(), random(), random()],
//                   },
//                 ],
//               }}
//             />
//           </CCardBody>
//         </CCard>
//       </CCol>
//       <CCol xs={6}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             Doughnut Chart
//           </CCardHeader>
//           <CCardBody>
//             <CChartDoughnut
//               data={{
//                 labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
//                 datasets: [
//                   {
//                     backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
//                     data: [40, 20, 80, 10],
//                   },
//                 ],
//               }}
//             />
//           </CCardBody>
//         </CCard>
//       </CCol>
//       <CCol xs={6}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             Pie Chart {' '}
//           </CCardHeader>
//           <CCardBody>
//             <CChartPie
//               data={{
//                 labels: ['Red', 'Green', 'Yellow'],
//                 datasets: [
//                   {
//                     data: [300, 50, 100],
//                     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//                     hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//                   },
//                 ],
//               }}
//             />
//           </CCardBody>
//         </CCard>
//       </CCol>
//       <CCol xs={6}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             Polar Area Chart
//
//           </CCardHeader>
//           <CCardBody>
//             <CChartPolarArea
//               data={{
//                 labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
//                 datasets: [
//                   {
//                     data: [11, 16, 7, 3, 14],
//                     backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
//                   },
//                 ],
//               }}
//             />
//           </CCardBody>
//         </CCard>
//       </CCol>
//       <CCol xs={6}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             Radar Chart
//           </CCardHeader>
//           <CCardBody>
//             <CChartRadar
//               data={{
//                 labels: [
//                   'Eating',
//                   'Drinking',
//                   'Sleeping',
//                   'Designing',
//                   'Coding',
//                   'Cycling',
//                   'Running',
//                 ],
//                 datasets: [
//                   {
//                     label: 'My First dataset',
//                     backgroundColor: 'rgba(220, 220, 220, 0.2)',
//                     borderColor: 'rgba(220, 220, 220, 1)',
//                     pointBackgroundColor: 'rgba(220, 220, 220, 1)',
//                     pointBorderColor: '#fff',
//                     pointHighlightFill: '#fff',
//                     pointHighlightStroke: 'rgba(220, 220, 220, 1)',
//                     data: [65, 59, 90, 81, 56, 55, 40],
//                   },
//                   {
//                     label: 'My Second dataset',
//                     backgroundColor: 'rgba(151, 187, 205, 0.2)',
//                     borderColor: 'rgba(151, 187, 205, 1)',
//                     pointBackgroundColor: 'rgba(151, 187, 205, 1)',
//                     pointBorderColor: '#fff',
//                     pointHighlightFill: '#fff',
//                     pointHighlightStroke: 'rgba(151, 187, 205, 1)',
//                     data: [28, 48, 40, 19, 96, 27, 100],
//                   },
//                 ],
//               }}
//             />
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default Charts

import React, { useEffect, useState } from 'react'
import supabase from '../../supaBaseClient'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { DocsLink } from 'src/components'

const Charts = () => {
  const [stats, setStats] = useState({
    funcionarios: 0,
    cursos: 0,
    alunos: 0,
    mensalidadesPagas: 0,
    mensalidadesPendentes: 0,
    departamentos: 0,
  })

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      const [
        { count: funcionarios },
        { count: cursos },
        { count: alunos },
        { data: mensalidades },
        { count: departamentos },
      ] = await Promise.all([
        supabase.from('funcionarios').select('*', { count: 'exact', head: true }),
        supabase.from('cursos').select('*', { count: 'exact', head: true }),
        supabase.from('alunos').select('*', { count: 'exact', head: true }),
        supabase.from('mensalidades').select('status, valor'),
        supabase.from('departamentos').select('*', { count: 'exact', head: true }),
      ])

      const mensalidadesPagas = mensalidades.filter((m) => m.status === 'pago').length
      const mensalidadesPendentes = mensalidades.filter((m) => m.status !== 'pago').length

      setStats({
        funcionarios,
        cursos,
        alunos,
        mensalidadesPagas,
        mensalidadesPendentes,
        departamentos,
      })
    } catch (error) {
      console.error('Erro ao carregar dados:', error.message)
    }
  }

  return (
    <CRow>
      {/* BAR - Funcionários por Departamento */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Funcionários por Departamento</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: ['Departamentos', 'Cursos'],
                datasets: [
                  {
                    label: 'Quantidade',
                    backgroundColor: '#4B77BE',
                    data: [stats.departamentos, stats.cursos],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* LINE - Evolução de Matrículas (mock dinâmica) */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Evolução de Alunos</CCardHeader>
          <CCardBody>
            <CChartLine
              data={{
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
                datasets: [
                  {
                    label: 'Novos Alunos',
                    backgroundColor: 'rgba(75, 119, 190, 0.2)',
                    borderColor: '#4B77BE',
                    pointBackgroundColor: '#4B77BE',
                    data: [
                      Math.round(stats.alunos * 0.1),
                      Math.round(stats.alunos * 0.15),
                      Math.round(stats.alunos * 0.2),
                      Math.round(stats.alunos * 0.25),
                      Math.round(stats.alunos * 0.3),
                      Math.round(stats.alunos * 0.4),
                      stats.alunos,
                    ],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* DOUGHNUT - Situação das Mensalidades */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Situação das Mensalidades</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={{
                labels: ['Pagas', 'Pendentes'],
                datasets: [
                  {
                    backgroundColor: ['#2ECC71', '#E74C3C'],
                    data: [stats.mensalidadesPagas, stats.mensalidadesPendentes],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* PIE - Distribuição de Cursos (mock simples) */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Distribuição de Cursos </CCardHeader>
          <CCardBody>
            <CChartPie
              data={{
                labels: ['Exatas', 'Humanas', 'Tecnologia'],
                datasets: [
                  {
                    data: [
                      Math.round(stats.cursos * 0.4),
                      Math.round(stats.cursos * 0.3),
                      Math.round(stats.cursos * 0.3),
                    ],
                    backgroundColor: ['#3498DB', '#9B59B6', '#F39C12'],
                    hoverBackgroundColor: ['#2980B9', '#8E44AD', '#E67E22'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* POLAR - Distribuição por tipo de funcionário (mock com total) */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Distribuição Funcionários</CCardHeader>
          <CCardBody>
            <CChartPolarArea
              data={{
                labels: ['Docentes', 'Administrativos', 'Serviços Gerais'],
                datasets: [
                  {
                    data: [
                      Math.round(stats.funcionarios * 0.5),
                      Math.round(stats.funcionarios * 0.3),
                      Math.round(stats.funcionarios * 0.2),
                    ],
                    backgroundColor: ['#1ABC9C', '#E67E22', '#C0392B'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* RADAR - Indicadores gerais */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Indicadores Gerais</CCardHeader>
          <CCardBody>
            <CChartRadar
              data={{
                labels: [
                  'Alunos',
                  'Funcionários',
                  'Cursos',
                  'Departamentos',
                  'Mensalidades Pagas',
                  'Mensalidades Pendentes',
                ],
                datasets: [
                  {
                    label: 'Indicadores',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: '#3498DB',
                    pointBackgroundColor: '#3498DB',
                    pointBorderColor: '#fff',
                    data: [
                      stats.alunos,
                      stats.funcionarios,
                      stats.cursos,
                      stats.departamentos,
                      stats.mensalidadesPagas,
                      stats.mensalidadesPendentes,
                    ],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
