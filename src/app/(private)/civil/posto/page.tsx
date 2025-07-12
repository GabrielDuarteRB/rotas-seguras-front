'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, SetStateAction } from 'react'
import { usePosto } from '@/context/PostoContext'

// Importa o mapa dinamicamente (sem SSR)
const Mapa = dynamic(() => import('@/components/Maps/MapaCriarPostoComCallback'), { ssr: false })

export default function MapaPostoPage() {
  const { createPosto } = usePosto()

  // Mock de dados (pode vir de API depois)
  const policiais = [
    { id: 1, nome: 'Policial João' },
    { id: 2, nome: 'Policial Maria' },
  ]

  const viaturas = [
    { id: 10, modelo: 'Viatura A' },
    { id: 11, modelo: 'Viatura B' },
  ]

  const [idPolicial, setIdPolicial] = useState<number | null>(null)
  const [idViatura, setIdViatura] = useState<number | null>(null)
  const [posicao, setPosicao] = useState<{ lat: number; lng: number } | null>(null)

  const handleConcluir = () => {
    if (!idPolicial || !idViatura || !posicao) {
      alert('Selecione policial, viatura e um ponto no mapa.')
      return
    }

    try {
    createPosto({
      id_policial_viatura: idPolicial, // ou combine policial e viatura se necessário
      latitude: posicao.lat,
      longitude: posicao.lng,
    })

    alert('Posto criado com sucesso!')
  }catch (error) {
    console.error('Erro ao criar posto:', error)
    alert('Erro ao criar posto. Tente novamente.')
  }
}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastrar novo Posto</h1>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-1">Selecione o Policial:</label>
          <select
            className="border p-2 w-full"
            value={idPolicial ?? ''}
            onChange={(e) => setIdPolicial(Number(e.target.value))}
          >
            <option value="">-- Escolha --</option>
            {policiais.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Selecione a Viatura:</label>
          <select
            className="border p-2 w-full"
            value={idViatura ?? ''}
            onChange={(e) => setIdViatura(Number(e.target.value))}
          >
            <option value="">-- Escolha --</option>
            {viaturas.map((v) => (
              <option key={v.id} value={v.id}>{v.modelo}</option>
            ))}
          </select>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2">Clique no mapa para marcar o posto</h2>

      <div className="mb-4 border rounded shadow">
        <Mapa onSelectPosition={(pos: SetStateAction<{ lat: number; lng: number } | null>) => setPosicao(pos)} />
      </div>

      {posicao && (
        <p className="text-green-600 mb-4">
          Local selecionado: {posicao.lat.toFixed(5)}, {posicao.lng.toFixed(5)}
        </p>
      )}

      <button
        onClick={handleConcluir}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Concluir
      </button>
    </div>
  )
}
