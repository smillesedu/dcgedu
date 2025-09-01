import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import Select from "react-select"

import supabase from '../../../supaBaseClient'

const ModalRegistrarPagamento = ({ show, setShow, atualizar }) => {
  const [alunos, setAlunos] = useState([])
  const [alunosSelecionados, setAlunosSelecionados] = useState([])
  const [pagador, setPagador] = useState('estudante')
  const [ano, setAno] = useState(new Date().getFullYear())
  const [mes, setMes] = useState(new Date().getMonth() + 1)
  const [itensSelecionados, setItensSelecionados] = useState([])
  const [metodo, setMetodo] = useState('')
  const [dataPagamento, setDataPagamento] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)

  // Lista de itens possíveis
  const itensPagamento = [
    { value: 'matricula', label: 'Matrícula', codigo: '001', preco: 10000 },
    { value: 'mensalidade', label: 'Mensalidade', codigo: '002', preco: 20000 },
    { value: 'material', label: 'Material Didático', codigo: '003', preco: 15000 },
    { value: 'certificado', label: 'Certificado', codigo: '004', preco: 5000 },
    { value: 'ferias', label: 'Programa de Férias', codigo: '005', preco: 25000 },
  ]

  const metodosPagamento = [
    { value: 'dinheiro', label: 'Dinheiro' },
    { value: 'transferencia', label: 'Transferência Bancária' },
    { value: 'cartao', label: 'Cartão de Crédito/Débito' },
    { value: 'referencia', label: 'Referência Multicaixa' },
  ]

  const meses = [
    { valor: 1, nome: 'Janeiro' },
    { valor: 2, nome: 'Fevereiro' },
    { valor: 3, nome: 'Março' },
    { valor: 4, nome: 'Abril' },
    { valor: 5, nome: 'Maio' },
    { valor: 6, nome: 'Junho' },
    { valor: 7, nome: 'Julho' },
    { valor: 8, nome: 'Agosto' },
    { valor: 9, nome: 'Setembro' },
    { valor: 10, nome: 'Outubro' },
    { valor: 11, nome: 'Novembro' },
    { valor: 12, nome: 'Dezembro' },
  ]

  useEffect(() => {
    const carregarAlunos = async () => {
      const { data, error } = await supabase.from('alunos').select('id, nome')
      if (!error) setAlunos(data)
    }
    carregarAlunos()
  }, [])

  // Cálculo total de todos os itens
  const calcularTotal = () =>
    itensSelecionados.reduce((acc, item) => acc + (item.valorUnitario * item.quantidade - item.desconto), 0)

  const adicionarItem = (tipo) => {
    const itemBase = itensPagamento.find((i) => i.value === tipo)
    if (itemBase) {
      setItensSelecionados([
        ...itensSelecionados,
        {
          ...itemBase,
          quantidade: 1,
          valorUnitario: itemBase.preco,
          desconto: 0,
        },
      ])
    }
  }

  const atualizarItem = (index, campo, valor) => {
    const novos = [...itensSelecionados]
    novos[index][campo] = Number(valor)
    setItensSelecionados(novos)
  }

  const removerItem = (index) => {
    setItensSelecionados(itensSelecionados.filter((_, i) => i !== index))
  }

  const registrarPagamento = async () => {
    if (!alunosSelecionados.length || !itensSelecionados.length || !metodo) {
      alert('Selecione pelo menos um aluno, um item e um método de pagamento.')
      return
    }

    setLoading(true)

    const pagamentos = alunosSelecionados.flatMap((alunoId) =>
      itensSelecionados.map((item) => ({
        aluno_id: alunoId,
        pagador,
        tipo: item.value,
        metodo_pagamento: metodo,
        valor_unitario: item.valorUnitario,
        quantidade: item.quantidade,
        desconto: item.desconto,
        total: item.valorUnitario * item.quantidade - item.desconto,
        ano_referencia: ano,
        mes_referencia: mes,
        data_pagamento: dataPagamento,
      }))
    )

    const { error } = await supabase.from('financeiro_pagamentos').insert(pagamentos)

    setLoading(false)
    if (!error) {
      atualizar()
      setShow(false)
    } else {
      alert('Erro ao salvar pagamento: ' + error.message)
    }
  }

  return (
    <CModal size="xl" visible={show} onClose={() => setShow(false)}>
      <CModalHeader>💳 Registrar Pagamento de Mensalidade</CModalHeader>
      <CModalBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <label className="form-label">Alunos</label>
            <Select
              isMulti
              options={alunos.map((a) => ({ value: a.id, label: a.nome }))}
              value={alunos
                .filter((a) => alunosSelecionados.includes(a.id))
                .map((a) => ({ value: a.id, label: a.nome }))}
              onChange={(selected) => setAlunosSelecionados(selected.map((s) => s.value))}
              placeholder="Selecione os alunos..."
              isSearchable
            />
          </CCol>
          <CCol md={3}>
            <CFormInput type="number" label="Ano" value={ano} onChange={(e) => setAno(e.target.value)} />
          </CCol>
          <CCol md={3}>
            <label className="form-label">Mês</label>
            <Select
              isMulti
              options={meses.map((m) => ({ value: m.valor, label: m.nome }))}
              value={meses
                .filter((m) => Array.isArray(mes) && mes.includes(m.valor))
                .map((m) => ({ value: m.valor, label: m.nome }))}
              onChange={(selected) => setMes(selected ? selected.map((s) => s.value) : [])}
              placeholder="Selecione os meses..."
              isSearchable
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <label className="form-label">Adicionar Item</label>
            <Select
              options={itensPagamento.map((i) => ({ value: i.value, label: i.label }))}
              onChange={(selected) => {
                if (selected) {
                  adicionarItem(selected.value)
                }
              }}
              placeholder="Selecione um item..."
              isSearchable
              isClearable
            />
          </CCol>
          <CCol md={6}>
            <label className="form-label">Método de Pagamento</label>
            <Select
              options={metodosPagamento.map((m) => ({ value: m.value, label: m.label }))}
              value={metodosPagamento.find((m) => m.value === metodo) || null}
              onChange={(selected) => setMetodo(selected ? selected.value : "")}
              placeholder="Selecione..."
              isSearchable
              isClearable
            />
          </CCol>
        </CRow>

        {/* Tabela de Itens */}
        <CTable striped hover responsive className="mt-3">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Código</CTableHeaderCell>
              <CTableHeaderCell>Descrição</CTableHeaderCell>
              <CTableHeaderCell>Preço Unitário</CTableHeaderCell>
              <CTableHeaderCell>Qtd.</CTableHeaderCell>
              <CTableHeaderCell>Desconto</CTableHeaderCell>
              <CTableHeaderCell>Total</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {itensSelecionados.map((item, idx) => (
              <CTableRow key={idx}>
                <CTableDataCell>{item.codigo}</CTableDataCell>
                <CTableDataCell>{item.label}</CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="number"
                    value={item.valorUnitario}
                    onChange={(e) => atualizarItem(idx, 'valorUnitario', e.target.value)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="number"
                    value={item.quantidade}
                    onChange={(e) => atualizarItem(idx, 'quantidade', e.target.value)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="number"
                    value={item.desconto}
                    onChange={(e) => atualizarItem(idx, 'desconto', e.target.value)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <strong>
                    {(item.valorUnitario * item.quantidade - item.desconto).toLocaleString()} Kz
                  </strong>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" size="sm" onClick={() => removerItem(idx)}>
                    Remover
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CRow className="mt-3">
          <CCol md={6}>
            <CFormInput
              type="date"
              label="Data do Pagamento"
              value={dataPagamento}
              onChange={(e) => setDataPagamento(e.target.value)}
            />
          </CCol>
          <CCol md={6} className="d-flex align-items-end">
            <h5 className="ms-auto">💵 Total: {calcularTotal().toLocaleString()} Kz</h5>
          </CCol>
        </CRow>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={() => setShow(false)}>
          Cancelar
        </CButton>
        <CButton color="success" onClick={registrarPagamento} disabled={loading}>
          {loading ? 'Salvando...' : 'Confirmar Pagamento'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalRegistrarPagamento
