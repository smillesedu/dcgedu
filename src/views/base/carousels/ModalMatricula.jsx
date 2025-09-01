import { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

export default function ModalMatricula({ matriculaEditando, onSalvo }) {
  const [alunos, setAlunos] = useState([])
  const [cursos, setCursos] = useState([])
  const [turmas, setTurmas] = useState([])

  const [alunoId, setAlunoId] = useState('')
  const [cursoId, setCursoId] = useState('')
  const [turmaId, setTurmaId] = useState('')
  const [dataMatricula, setDataMatricula] = useState('')

  const [professor, setProfessor] = useState(null)
  const [cursoProfessor, setCursoProfessor] = useState(null)

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

  const fetchTurmas = async (cursoId) => {
    if (!cursoId) return
    const { data, error } = await supabase
      .from('turmas')
      .select(`
        id,
        nome,
        professor:professor_id(
          id,
          nome,
          curso:curso_id(id, nome)
        )
      `)
      .eq('curso_id', cursoId)

    if (!error) setTurmas(data || [])
  }

  // Preencher se for edição
  useEffect(() => {
    if (matriculaEditando) {
      setAlunoId(matriculaEditando.aluno_id)
      setCursoId(matriculaEditando.curso_id)
      setTurmaId(matriculaEditando.turma_id)
      setDataMatricula(matriculaEditando.data_matricula || '')

      if (matriculaEditando.turma) {
        setProfessor(matriculaEditando.turma.professor)
        setCursoProfessor(matriculaEditando.turma.professor?.curso)
      }
    } else {
      resetForm()
    }
  }, [matriculaEditando])

  const resetForm = () => {
    setAlunoId('')
    setCursoId('')
    setTurmaId('')
    setDataMatricula('')
    setProfessor(null)
    setCursoProfessor(null)
  }

  const salvarMatricula = async (e) => {
    e.preventDefault()

    const payload = {
      aluno_id: alunoId,
      curso_id: cursoId,
      turma_id: turmaId,
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

  // Quando mudar curso → carregar turmas
  useEffect(() => {
    if (cursoId) {
      fetchTurmas(cursoId)
    } else {
      setTurmas([])
    }
  }, [cursoId])

  // Quando mudar turma → setar professor/curso dele
  useEffect(() => {
    const turmaSelecionada = turmas.find((t) => String(t.id) === String(turmaId))
    if (turmaSelecionada) {
      setProfessor(turmaSelecionada.professor)
      setCursoProfessor(turmaSelecionada.professor?.curso)
    } else {
      setProfessor(null)
      setCursoProfessor(null)
    }
  }, [turmaId, turmas])

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

              {/* Seleção de turma */}
              <div className="mb-3">
                <label className="form-label">Turma</label>
                <select
                  className="form-select"
                  value={turmaId}
                  onChange={(e) => setTurmaId(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  {turmas.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Professor (auto-preenchido) */}
              <div className="mb-3">
                <label className="form-label">Professor</label>
                <input
                  type="text"
                  className="form-control"
                  value={professor?.nome || ''}
                  disabled
                />
              </div>

              {/* Curso do professor (auto-preenchido) */}
              <div className="mb-3">
                <label className="form-label">Curso do Professor</label>
                <input
                  type="text"
                  className="form-control"
                  value={cursoProfessor?.nome || ''}
                  disabled
                />
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
