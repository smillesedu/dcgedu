import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const CalendarioAluno = ({ eventos }) => {
  const formattedEvents = eventos.map(ev => ({
    title: ev.titulo,
    start: ev.data_inicio,
    end: ev.data_fim,
    color: ev.cor || '#3788d8'
  }))

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={formattedEvents}
      locale="pt-br"
      height="600px"
    />
  )
}

export default CalendarioAluno
