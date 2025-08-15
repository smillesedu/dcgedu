import React, { useState } from 'react'

const ModalFiltrosTransferencia = ({ id, onFiltrar }) => {
  const [tipo, setTipo] = useState('')
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onFiltrar({ tipo, search, startDate, endDate })

    // Fechar modal ao aplicar filtros
    const modal = bootstrap.Modal.getInstance(document.getElementById(id))
    if (modal) modal.hide()
  }

  const handleLimpar = () => {
    setTipo('')
    setSearch('')
    setStartDate('')
    setEndDate('')
    onFiltrar({})
  }

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id={`${id}Label`}>
                Filtrar Transferências
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Tipo de Transferência</label>
                  <select
                    className="form-select"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="interna">Interna</option>
                    <option value="externa">Externa</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Nome da Pessoa</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nome..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Data Inicial</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Data Final</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleLimpar}>
                Limpar Filtros
              </button>
              <button type="submit" className="btn btn-primary">
                Aplicar Filtros
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalFiltrosTransferencia
