import { useEffect, useState } from 'react'
import { getUsuarios, getPerfis } from '../services/usuariosPerfisService'

export function useUsuariosPerfis() {
  const [usuarios, setUsuarios] = useState([])
  const [perfis, setPerfis] = useState([])

  useEffect(() => {
    carregar()
  }, [])

  const carregar = async () => {
    setUsuarios(await getUsuarios())
    setPerfis(await getPerfis())
  }

  return { usuarios, perfis, recarregar: carregar }
}
