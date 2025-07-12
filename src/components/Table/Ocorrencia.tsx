'use client'

import { useState, useEffect, useMemo } from 'react'
import tipoOcorrenciaOptions from '@/constants/tipoOcorrencia'
import statusOcorrenciaOptions from '@/constants/statusOcorrencia'
import { getLabelByValue } from '@/utils/getLabelByValue'
import type { OcorrenciaInterface } from '@/interface/Ocorrencia/OcorrenciaInterface'

interface OcorrenciaTableProps {
  ocorrencias: OcorrenciaInterface[]
  isAdmin?: boolean
  onOcorrenciaClick?: (ocorrencia: OcorrenciaInterface) => void
}

export function TableOcorrencia({
  ocorrencias,
  isAdmin = false,
  onOcorrenciaClick,
}: OcorrenciaTableProps) {
  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(ocorrencias.length / itemsPerPage)),
    [ocorrencias.length]
  )

  const currentItems = useMemo(
    () => ocorrencias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [ocorrencias, currentPage]
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
            {currentItems.map((ocorrencia) => (
              <tr
                key={ocorrencia.id_ocorrencia}
                className="border-t border-gray-700 hover:bg-zinc-700 transition-colors cursor-pointer"
                onClick={() => isAdmin && onOcorrenciaClick?.(ocorrencia)}
              >
                <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                  {getLabelByValue(tipoOcorrenciaOptions, ocorrencia.id_tipo_ocorrencia)}
                </td>
                <td className="px-3 py-2 md:px-6 md:py-3">
                  <span
                    className={`text-xs md:text-sm font-bold px-2 py-1 rounded-full ${
                      ocorrencia.id_status_ocorrencia === 1
                        ? 'background-error text-white'
                        : ocorrencia.id_status_ocorrencia === 3
                        ? 'background-success text-white'
                        : 'background-warning text-black'
                    }`}
                  >
                    {getLabelByValue(statusOcorrenciaOptions, ocorrencia.id_status_ocorrencia)}
                  </span>
                </td>
                <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                  {ocorrencia.descricao}
                </td>
                <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                  {ocorrencia.criada_em
                    ? new Date(ocorrencia.criada_em).toLocaleString('pt-BR')
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
