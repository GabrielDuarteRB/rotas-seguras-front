'use client'

import { useState, useEffect, useMemo } from 'react'
//import tipoOcorrenciaOptions from '@/constants/tipoOcorrencia'
import statusPolicialOptions from '@/constants/statusPolicial'
import { getLabelByValue } from '@/utils/getLabelByValue'
import type { PolicialInterface } from '@/interface/Policial/PolicialInterface'

interface PolicialTableProps {
  policiais: PolicialInterface[]
  isAdmin?: boolean
  onPolicialClick?: (policial: PolicialInterface) => void
}

export function TableOcorrencia({
  policiais,
  isAdmin = false,
  onPolicialClick,
}: PolicialTableProps) {
  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(policiais.length / itemsPerPage)),
    [policiais.length]
  )

  const currentItems = useMemo(
    () => policiais.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [policiais, currentPage]
  )

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [totalPages, currentPage])

  const handlePrev = () => {
    setCurrentPage((p) => (p > 1 ? p - 1 : p))
  }

  const handleNext = () => {
    console.log('Total Pages:', totalPages)
    console.log('Current Page:', currentPage)
    setCurrentPage((p) => (p < totalPages ? p + 1 : p))
  }

  const getPageNumbers = () => {
    const maxButtons = 5
    const pages = []
    console.log('Total Pages:', totalPages)
    console.log('Current Page:', currentPage)

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2))
      let endPage = startPage + maxButtons - 1

      if (endPage > totalPages) {
        endPage = totalPages
        startPage = endPage - maxButtons + 1
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="max-w-full overflow-x-auto min-w-0 md:min-w-[900px]">
      <div className="min-w-[600px] md:min-w-[900px] bg-black/35 rounded-xl border border-gray-700">
        <table className="w-full text-base text-left rounded-xl overflow-hidden">
          <thead className="bg-zinc-800 text-white uppercase text-xs md:text-sm">
            <tr>
              <th className="px-3 py-2 md:px-6 md:py-4">Tipo</th>
              <th className="px-3 py-2 md:px-6 md:py-4">Status</th>
              <th className="px-3 py-2 md:px-6 md:py-4">Descrição</th>
              <th className="px-3 py-2 md:px-6 md:py-4">Criada em</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((policial) => (
              <tr
                key={policial.id_policial}
                className="border-t border-gray-700 hover:bg-zinc-700 transition-colors cursor-pointer"
                onClick={() => isAdmin && onPolicialClick?.(policial)}
              >
                <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                  {getLabelByValue(tipoPolicialOptions, policial.id_tipo_ocorrencia)}
                </td>
                <td className="px-3 py-2 md:px-6 md:py-3">
                  <span
                    className={`text-xs md:text-sm font-bold px-2 py-1 rounded-full ${
                      policial.id_status_policial === 1
                        ? 'background-error text-white'
                        : policial.id_status_policial === 3
                        ? 'background-success text-white'
                        : 'background-warning text-black'
                    }`}
                  >
                    {getLabelByValue(statusPolicialOptions, policial.ativo)}
                  </span>
                </td>
                <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                  {policial.ativo}
                </td>
                <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                  {policial.criada_em
                    ? new Date(policial.criada_em).toLocaleString('pt-BR')
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-2 mt-4 select-none z-3 p-2 flex-wrap relative">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:bg-zinc-900 disabled:text-zinc-500 flex items-center justify-center transition"
          >
            ‹
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition
                ${
                  page === currentPage
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-zinc-700 text-white hover:bg-zinc-600'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:bg-zinc-900 disabled:text-zinc-500 flex items-center justify-center transition"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
