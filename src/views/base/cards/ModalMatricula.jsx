import { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

export default function ModalMatricula({ matriculaEditando, onSalvo }) {
  const [alunos, setAlunos] = useState([])
  const [cursos, setCursos] = useState([])
  const [alunoId, setAlunoId] = useState('')
  const [cursoId, setCursoId] = useState('')
  const [dataMatricula, setDataMatricula] = useState('')

  // Carregar alunos e cursos
  useEffect(() => {
    fetchAlunos()
    fetchCursos()
  }, [])

  const fetchAlunos = async () => {
    const { data, error } = await supabase.from('alunos').select('id, nome')
    if (!error) setAlunos(data)
  }

  const fetchCursos = async () => {
    const { data, error } = await supabase.from('cursos').select('id, nome')
    if (!error) setCursos(data)
  }

  // Preencher se for edição
  useEffect(() => {
    if (matriculaEditando) {
      setAlunoId(matriculaEditando.aluno_id)
      setCursoId(matriculaEditando.curso_id)
      setDataMatricula(matriculaEditando.data_matricula || '')
    } else {
      resetForm()
    }
  }, [matriculaEditando])

  const resetForm = () => {
    setAlunoId('')
    setCursoId('')
    setDataMatricula('')
  }

  const salvarMatricula = async (e) => {
    e.preventDefault()

    const payload = {
      aluno_id: alunoId,
      curso_id: cursoId,
      data_matricula: dataMatricula || new Date().toISOString().split('T')[0],
    }

    let error
    if (matriculaEditando) {
      ({ error } = await supabase
        .from('matriculas')
        .update(payload)
        .eq('id', matriculaEditando.id))
    } else {
      ({ error } = await supabase.from('matriculas').insert([payload]))
    }

    if (error) {
      console.error('Erro ao salvar matrícula:', error)
      return
    }

    onSalvo()
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalMatricula'))
    modal.hide()
    resetForm()
  }

  return (
    <div className="modal fade" id="modalMatricula" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={salvarMatricula}>
            <div className="modal-header">
              <h5 className="modal-title">
                {matriculaEditando ? 'Editar Matrícula' : 'Nova Matrícula'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {/* Seleção de aluno */}
              <div className="mb-3">
                <label className="form-label">Aluno</label>
                <select
                  className="form-select"
                  value={alunoId}
                  onChange={(e) => setAlunoId(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  {alunos.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seleção de curso */}
              <div className="mb-3">
                <label className="form-label">Curso</label>
                <select
                  className="form-select"
                  value={cursoId}
                  onChange={(e) => setCursoId(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  {cursos.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Data da matrícula */}
              <div className="mb-3">
                <label className="form-label">Data da Matrícula</label>
                <input
                  type="date"
                  className="form-control"
                  value={dataMatricula}
                  onChange={(e) => setDataMatricula(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {matriculaEditando ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
