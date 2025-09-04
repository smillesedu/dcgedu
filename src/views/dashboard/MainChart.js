// import React, { useEffect, useRef } from 'react'

// import { CChartLine } from '@coreui/react-chartjs'
// import { getStyle } from '@coreui/utils'

// const MainChart = () => {
//   const chartRef = useRef(null)

//   useEffect(() => {
//     document.documentElement.addEventListener('ColorSchemeChange', () => {
//       if (chartRef.current) {
//         setTimeout(() => {
//           chartRef.current.options.scales.x.grid.borderColor = getStyle(
//             '--cui-border-color-translucent',
//           )
//           chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
//           chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
//           chartRef.current.options.scales.y.grid.borderColor = getStyle(
//             '--cui-border-color-translucent',
//           )
//           chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
//           chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
//           chartRef.current.update()
//         })
//       }
//     })
//   }, [chartRef])

//   const random = () => Math.round(Math.random() * 100)

//   return (
//     <>
//       <CChartLine
//         ref={chartRef}
//         style={{ height: '300px', marginTop: '40px' }}
//         data={{
//           labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//           datasets: [
//             {
//               label: 'My First dataset',
//               backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
//               borderColor: getStyle('--cui-info'),
//               pointHoverBackgroundColor: getStyle('--cui-info'),
//               borderWidth: 2,
//               data: [
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//               ],
//               fill: true,
//             },
//             {
//               label: 'My Second dataset',
//               backgroundColor: 'transparent',
//               borderColor: getStyle('--cui-success'),
//               pointHoverBackgroundColor: getStyle('--cui-success'),
//               borderWidth: 2,
//               data: [
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//               ],
//             },
//             {
//               label: 'My Third dataset',
//               backgroundColor: 'transparent',
//               borderColor: getStyle('--cui-danger'),
//               pointHoverBackgroundColor: getStyle('--cui-danger'),
//               borderWidth: 1,
//               borderDash: [8, 5],
//               data: [65, 65, 65, 65, 65, 65, 65],
//             },
//           ],
//         }}
//         options={{
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: false,
//             },
//           },
//           scales: {
//             x: {
//               grid: {
//                 color: getStyle('--cui-border-color-translucent'),
//                 drawOnChartArea: false,
//               },
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//               },
//             },
//             y: {
//               beginAtZero: true,
//               border: {
//                 color: getStyle('--cui-border-color-translucent'),
//               },
//               grid: {
//                 color: getStyle('--cui-border-color-translucent'),
//               },
//               max: 250,
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//                 maxTicksLimit: 5,
//                 stepSize: Math.ceil(250 / 5),
//               },
//             },
//           },
//           elements: {
//             line: {
//               tension: 0.4,
//             },
//             point: {
//               radius: 0,
//               hitRadius: 10,
//               hoverRadius: 4,
//               hoverBorderWidth: 3,
//             },
//           },
//         }}
//       />
//     </>
//   )
// }

// export default MainChart

import React, { useEffect, useRef, useState } from "react"
import { CChartLine } from "@coreui/react-chartjs"
import { getStyle } from "@coreui/utils"
import supabase from "../../supaBaseClient"

const MainChart = () => {
  const chartRef = useRef(null)
  const [dadosMensais, setDadosMensais] = useState([])

  // --- Buscar inscrições no Supabase e agrupar por mês ---
  const carregarDados = async () => {
    const { data, error } = await supabase
      .from("inscricoes")
      .select("id, created_at")

    if (!error && data) {
      // Inicializa meses
      const meses = Array.from({ length: 12 }, (_, i) => ({
        mes: new Date(2023, i).toLocaleString("pt-BR", { month: "short" }),
        total: 0,
      }))

      // Conta por mês
      data.forEach((inscricao) => {
        const d = new Date(inscricao.created_at)
        const mesIndex = d.getMonth()
        meses[mesIndex].total += 1
      })

      setDadosMensais(meses)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  // --- Atualizar cores do gráfico ao trocar tema ---
  useEffect(() => {
    document.documentElement.addEventListener("ColorSchemeChange", () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            "--cui-border-color-translucent"
          )
          chartRef.current.options.scales.x.grid.color = getStyle("--cui-border-color-translucent")
          chartRef.current.options.scales.x.ticks.color = getStyle("--cui-body-color")
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            "--cui-border-color-translucent"
          )
          chartRef.current.options.scales.y.grid.color = getStyle("--cui-border-color-translucent")
          chartRef.current.options.scales.y.ticks.color = getStyle("--cui-body-color")
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: "300px", marginTop: "40px" }}
        data={{
          labels: dadosMensais.map((d) => d.mes),
          datasets: [
            {
              label: "Inscrições",
              backgroundColor: `rgba(${getStyle("--cui-info-rgb")}, .1)`,
              borderColor: getStyle("--cui-info"),
              pointHoverBackgroundColor: getStyle("--cui-info"),
              borderWidth: 2,
              data: dadosMensais.map((d) => d.total),
              fill: true,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: { color: getStyle("--cui-body-color") },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle("--cui-border-color-translucent"),
                drawOnChartArea: false,
              },
              ticks: { color: getStyle("--cui-body-color") },
            },
            y: {
              beginAtZero: true,
              grid: { color: getStyle("--cui-border-color-translucent") },
              ticks: { color: getStyle("--cui-body-color") },
            },
          },
          elements: {
            line: { tension: 0.4 },
            point: { radius: 4, hitRadius: 10, hoverRadius: 6, hoverBorderWidth: 3 },
          },
        }}
      />
    </>
  )
}

export default MainChart
