import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

const ModalAtribuicao = ({ atribuicaoEditando, onSalvo }) => {
  const [professorId, setProfessorId] = useState('')
  const [disciplinaId, setDisciplinaId] = useState('')
  const [turmaId, setTurmaId] = useState('')
  const [unidadeId, setUnidadeId] = useState('')
  const [professores, setProfessores] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [turmas, setTurmas] = useState([])
  const [unidades, setUnidades] = useState([])

  useEffect(() => {
    carregarDados()
    if (atribuicaoEditando) {
      setProfessorId(atribuicaoEditando.professor?.id || '')
      setDisciplinaId(atribuicaoEditando.disciplina?.id || '')
      setTurmaId(atribuicaoEditando.turma?.id || '')
      setUnidadeId(atribuicaoEditando.unidade?.id || '')
    } else {
      setProfessorId('')
      setDisciplinaId('')
      setTurmaId('')
      setUnidadeId('')
    }
  }, [atribuicaoEditando])

  const carregarDados = async () => {
    const [profRes, discRes, turmaRes, unidRes] = await Promise.all([
      supabase.from('professores').select('id, nome'),
      supabase.from('disciplinas').select('id, nome'),
      supabase.from('turmas').select('id, nome'),
      supabase.from('unidades').select('id, nome'),
    ])
    setProfessores(profRes.data || [])
    setDisciplinas(discRes.data || [])
    setTurmas(turmaRes.data || [])
    setUnidades(unidRes.data || [])
  }

  const salvarAtribuicao = async () => {
    const dados = {
      professor_id: professorId,
      disciplina_id: disciplinaId,
      turma_id: turmaId,
      unidade_id: unidadeId,
    }

    let res
    if (atribuicaoEditando) {
      res = await supabase
        .from('atribuicoes_disciplinas')
        .update(dados)
        .eq('id', atribuicaoEditando.id)
    } else {
      res = await supabase.from('atribuicoes_disciplinas').insert([dados])
    }

    if (!res.error) {
      onSalvo()
      document.getElementById('modalAtribuicao').click()
    }
  }

  return (
    <div className="modal fade" id="modalAtribuicao" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{atribuicaoEditando ? 'Editar' : 'Nova'} Atribuição</h5>
            <button
              id="modalAtribuicao"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label>Professor</label>
              <select
                className="form-select"
                value={professorId}
                onChange={(e) => setProfessorId(e.target.value)}
              >
                <option value="">Selecione</option>
                {professores.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Disciplina</label>
              <select
                className="form-select"
                value={disciplinaId}
                onChange={(e) => setDisciplinaId(e.target.value)}
              >
                <option value="">Selecione</option>
                {disciplinas.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Turma</label>
              <select
                className="form-select"
                value={turmaId}
                onChange={(e) => setTurmaId(e.target.value)}
              >
                <option value="">Selecione</option>
                {turmas.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Unidade</label>
              <select
                className="form-select"
                value={unidadeId}
                onChange={(e) => setUnidadeId(e.target.value)}
              >
                <option value="">Selecione</option>
                {unidades.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvarAtribuicao}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAtribuicao
