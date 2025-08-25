import { Droppable } from '@hello-pangea/dnd'
import FunilCard from './FunilCard'

export default function FunilColumn({ estagio, cards }) {
  return (
    <div className="bg-light rounded p-3 border" style={{ minWidth: 280 }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">{estagio.titulo}</h5>
        <span className="badge bg-secondary">{cards.length}</span>
      </div>

      <Droppable droppableId={estagio.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-1 rounded ${snapshot.isDraggingOver ? 'bg-white border' : ''}`}
            style={{ minHeight: 200 }}
          >
            {cards.map((card, index) => (
              <FunilCard key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
