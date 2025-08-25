import { Draggable } from '@hello-pangea/dnd'

export default function FunilCard({ card, index }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`bg-white border rounded p-2 mb-2 shadow-sm ${snapshot.isDragging ? 'shadow' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="fw-semibold">{card.titulo}</div>
          {card.valor != null && (
            <div className="text-muted small">💰 {Number(card.valor).toLocaleString()} Kz</div>
          )}
          {card.descricao && <div className="small mt-1">{card.descricao}</div>}
        </div>
      )}
    </Draggable>
  )
}
