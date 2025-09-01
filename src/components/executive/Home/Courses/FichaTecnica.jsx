// FichaTecnica.jsx
export default function FichaTecnica({ aluno, curso }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 mt-4">
      <h2 className="text-xl font-bold mb-4">Ficha Técnica de Pré-Inscrição</h2>

      <p><strong>Aluno:</strong> {aluno.nome}</p>
      <p><strong>Email:</strong> {aluno.email}</p>
      <p><strong>Telefone:</strong> {aluno.telefone}</p>

      <hr className="my-4" />

      <p><strong>Curso:</strong> {curso.heading}</p>
      <p><strong>Preço:</strong> ${curso.price}</p>
      <p><strong>Escola:</strong> Escola XPTO</p>

      <div className="mt-6 text-green-700 font-semibold">
        ✅ Pré-inscrição confirmada!
      </div>
    </div>
  )
}
