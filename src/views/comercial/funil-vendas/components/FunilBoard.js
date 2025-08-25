import { DragDropContext } from '@hello-pangea/dnd'
import FunilColumn from './FunilColumn'
import supabase from '../../../../supaBaseClient'

export default function FunilBoard({ estagios, cardsByStage, allCards, setCards }) {
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result
    if (!destination) return

    const sourceStageId = source.droppableId
    const destStageId = destination.droppableId
    if (sourceStageId === destStageId && source.index === destination.index) return

    // Clonar estado atual
    const nextByStage = structuredClone(cardsByStage)

    // Remover do estágio de origem
    const moved = nextByStage[sourceStageId].splice(source.index, 1)[0]
    // Ajustar estágio e inserir no destino
    moved.estagio_id = destStageId
    nextByStage[destStageId].splice(destination.index, 0, moved)

    // Recalcular 'ordem' de ambas as colunas afetadas
    nextByStage[sourceStageId] = nextByStage[sourceStageId].map((c, i) => ({ ...c, ordem: i + 1 }))
    nextByStage[destStageId] = nextByStage[destStageId].map((c, i) => ({ ...c, ordem: i + 1 }))

    // Atualizar estado plano (allCards) para render reativo
    const updated = [...allCards].map((c) => {
      if (c.id === moved.id) return moved
      // também atualizar ordens dos que mudaram nas duas colunas
      const updatedInSource = nextByStage[sourceStageId].find((x) => x.id === c.id)
      if (updatedInSource) return updatedInSource
      const updatedInDest = nextByStage[destStageId].find((x) => x.id === c.id)
      if (updatedInDest) return updatedInDest
      return c
    })
    setCards(updated)

    // Persistir no banco (somente duas colunas afetadas)
    const payload = [
      ...nextByStage[sourceStageId].map(({ id, ordem }) => ({ id, ordem })),
      ...nextByStage[destStageId].map(({ id, ordem, estagio_id }) => ({ id, ordem, estagio_id })),
    ]

    const { error } = await supabase.from('funil_cards').upsert(payload)
    if (error) {
      console.error('Erro ao salvar ordenação:', error)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="d-flex gap-3 overflow-x-auto">
        {estagios.map((e) => (
          <FunilColumn key={e.id} estagio={e} cards={cardsByStage[e.id] || []} />
        ))}
      </div>
    </DragDropContext>
  )
}
