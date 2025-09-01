import React, { useState, useEffect } from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ModalTransferencia = ({ pessoa, onClose, onSalvo }) => {
  const [tipo, setTipo] = useState('')
  const [turmas, setTurmas] = useState([])
  const [cursos, setCursos] = useState([])
  const [unidades, setUnidades] = useState([])
  const [turmaDestino, setTurmaDestino] = useState(null)
  const [cursoDestino, setCursoDestino] = useState(null)
  const [unidadeDestino, setUnidadeDestino] = useState(null)
  const [dataTransferencia, setDataTransferencia] = useState('')

  useEffect(() => {
    if (pessoa) {
      setTipo('')
      setTurmaDestino(null)
      setCursoDestino(null)
      setUnidadeDestino(null)
      setDataTransferencia('')
      carregarListas()
    }
  }, [pessoa])

  const carregarListas = async () => {
    const { data: turmasData } = await supabase.from('turmas').select('id, nome')
    const { data: cursosData } = await supabase.from('cursos').select('id, nome')
    const { data: unidadesData } = await supabase.from('unidades').select('id, nome')
    setTurmas(turmasData || [])
    setCursos(cursosData || [])
    setUnidades(unidadesData || [])
  }

  const handleSalvar = async () => {
    if (!tipo || !dataTransferencia) {
      alert('Preencha os campos obrigatórios!')
      return
    }

    const { error } = await supabase.from('transferencias').insert([
      {
        tipo,
        nome_pessoa: pessoa.nome,
        de_turma: pessoa.turma_atual?.nome || null,
        para_turma: turmaDestino || null,
        de_curso: pessoa.curso_atual?.nome || null,
        para_curso: cursoDestino || null,
        de_unidade: pessoa.unidade_atual?.nome || null,
        para_unidade: unidadeDestino || null,
        data_transferencia: dataTransferencia,
      },
    ])

    if (error) {
      console.error('Erro ao salvar transferência:', error)
      alert('Erro ao salvar transferência!')
    } else {
      onSalvo?.()
      onClose()
    }
  }

  return (
    <CModal visible={!!pessoa} onClose={onClose} size="lg" alignment="center">
      <CModalHeader closeButton>
        <CModalTitle>Transferir {pessoa?.nome}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <label className="form-label">Tipo de Transferência *</label>
          <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecione</option>
            <option value="interna">Interna</option>
            <option value="externa">Externa</option>
          </select>
        </div>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Turma de Destino</label>
            <select
              className="form-select"
              value={turmaDestino || ''}
              onChange={(e) => setTurmaDestino(e.target.value || null)}
            >
              <option value="">Manter atual</option>
              {turmas.map((t) => (
                <option key={t.id} value={t.nome}>
                  {t.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Curso de Destino</label>
            <select
              className="form-select"
              value={cursoDestino || ''}
              onChange={(e) => setCursoDestino(e.target.value || null)}
            >
              <option value="">Manter atual</option>
              {cursos.map((c) => (
                <option key={c.id} value={c.nome}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Unidade de Destino</label>
            <select
              className="form-select"
              value={unidadeDestino || ''}
              onChange={(e) => setUnidadeDestino(e.target.value || null)}
            >
              <option value="">Manter atual</option>
              {unidades.map((u) => (
                <option key={u.id} value={u.nome}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label">Data da Transferência *</label>
          <input
            type="date"
            className="form-control"
            value={dataTransferencia}
            onChange={(e) => setDataTransferencia(e.target.value)}
          />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSalvar}>
          Salvar Transferência
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalTransferencia
