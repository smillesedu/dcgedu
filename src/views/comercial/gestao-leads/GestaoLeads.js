import React, { useEffect, useState } from "react"
import supabase from "../../../supaBaseClient"
import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import LeadForm from "./LeadForm"
import LeadDetailsModal from "./LeadDetailsModal"
import { ModalConfirmacao } from "../../../components"

// Colunas do pipeline
const initialColumns = {
  novo: { name: "Novos Leads", items: [] },
  andamento: { name: "Em Andamento", items: [] },
  perdido: { name: "Perdido", items: [] },
  fechado: { name: "Fechados", items: [] },
}

const GestaoLeads = () => {
  const [columns, setColumns] = useState(initialColumns)
  const [leadEditando, setLeadEditando] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [leadSelecionado, setLeadSelecionado] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false })
    if (!error) {
      // Distribuir leads nas colunas pelo status
      const novo = data.filter((l) => l.status === "novo")
      const andamento = data.filter((l) => l.status === "andamento")
      const perdido = data.filter((l) => l.status === "perdido")
      const fechado = data.filter((l) => l.status === "fechado")

      setColumns({
        novo: { name: "Novos Leads", items: novo },
        andamento: { name: "Em Andamento", items: andamento },
        perdido: { name: "Perdido", items: perdido },
        fechado: { name: "Fechados", items: fechado },
      })
    }
  }

  const handleDelete = async (id) => {
    await supabase.from("leads").delete().eq("id", id)
    fetchLeads()
    setShowConfirm(false)
  }

  // Atualiza posição/status ao arrastar
  const onDragEnd = async (result) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      // Move entre colunas
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      removed.status = destination.droppableId // atualizar status do lead
      destItems.splice(destination.index, 0, removed)

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      })

      // Atualizar no banco
      await supabase.from("leads").update({ status: removed.status }).eq("id", removed.id)
    } else {
      // Reordenar dentro da mesma coluna
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)

      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems },
      })
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Gestão de Leads e Oportunidades</strong>
            <button
              className="btn btn-success float-end"
              onClick={() => {
                setLeadEditando(null)
                setShowForm(true)
              }}
            >
              Novo Lead
            </button>
          </CCardHeader>
          <CCardBody>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="d-flex gap-3" style={{ overflowX: "auto" }}>
                {Object.entries(columns).map(([columnId, column]) => (
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: "#f8f9fa",
                          padding: "10px",
                          borderRadius: "8px",
                          width: "300px",
                          minHeight: "500px",
                        }}
                      >
                        <h6 className="mb-3 text-center">{column.name}</h6>
                        {column.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  padding: "12px",
                                  margin: "0 0 8px 0",
                                  minHeight: "60px",
                                  borderRadius: "6px",
                                  background: snapshot.isDragging ? "#d1ecf1" : "#fff",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <strong>{item.nome}</strong>
                                <div className="small text-muted">{item.origem}</div>
                                <div className="d-flex justify-content-between mt-2">
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => {
                                      setLeadEditando(item)
                                      setShowForm(true)
                                    }}
                                  >
                                    Editar
                                  </button>
                                  <button
                                    className="btn btn-sm btn-info"
                                    onClick={() => setLeadSelecionado(item)}
                                  >
                                    Ver
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                      setLeadSelecionado(item)
                                      setShowConfirm(true)
                                    }}
                                  >
                                    Excluir
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal Form */}
      {showForm && (
        <LeadForm lead={leadEditando} onClose={() => setShowForm(false)} onSaved={fetchLeads} />
      )}

      {/* Modal Detalhes */}
      {leadSelecionado && (
        <LeadDetailsModal lead={leadSelecionado} onClose={() => setLeadSelecionado(null)} />
      )}

      {/* Modal Confirmação */}
      <ModalConfirmacao
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => handleDelete(leadSelecionado?.id)}
        title="Excluir Lead"
        message={`Tem certeza que deseja excluir o lead "${leadSelecionado?.nome}"?`}
      />
    </CRow>
  )
}

export default GestaoLeads
