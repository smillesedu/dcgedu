import { useEffect, useMemo, useState } from 'react'
import supabase from '../../../supaBaseClient'
import FunilBoard from './components/FunilBoard'
import AddCardModal from './components/AddCardModal'

export default function FunilVendas() {
  const [estagios, setEstagios] = useState([])
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const loadAll = async () => {
    setLoading(true)
    const { data: est, error: e1 } = await supabase
      .from('funil_estagios')
      .select('*')
      .order('ordem', { ascending: true })

    const { data: cs, error: e2 } = await supabase
      .from('funil_cards')
      .select('*')
      .order('ordem', { ascending: true })

    if (!e1 && est) setEstagios(est)
    if (!e2 && cs) setCards(cs)
    setLoading(false)
  }

  useEffect(() => {
    loadAll()

    // Realtime: estágios
    const chStages = supabase
      .channel('funil_estagios-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'funil_estagios' }, loadAll)
      .subscribe()

    // Realtime: cards
    const chCards = supabase
      .channel('funil_cards-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'funil_cards' }, loadAll)
      .subscribe()

    return () => {
      supabase.removeChannel(chStages)
      supabase.removeChannel(chCards)
    }
  }, [])

  const cardsByStage = useMemo(() => {
    const map = {}
    estagios.forEach((e) => (map[e.id] = []))
    cards.forEach((c) => {
      if (!map[c.estagio_id]) map[c.estagio_id] = []
      map[c.estagio_id].push(c)
    })
    // já vem ordenado por ordem, mas garantimos:
    Object.keys(map).forEach((k) => map[k].sort((a, b) => a.ordem - b.ordem))
    return map
  }, [estagios, cards])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📊 Funil de Vendas</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Novo Negócio
        </button>
      </div>

      {loading ? (
        <div className="alert alert-info">Carregando...</div>
      ) : (
        <FunilBoard
          estagios={estagios}
          cardsByStage={cardsByStage}
          setCards={setCards}
          allCards={cards}
        />
      )}

      {showModal && (
        <AddCardModal
          estagios={estagios}
          onClose={() => setShowModal(false)}
          onSaved={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
