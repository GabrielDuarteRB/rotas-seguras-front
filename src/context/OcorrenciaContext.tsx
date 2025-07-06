'use client'

import { createContext, useState, ReactNode } from 'react'
import OcorrenciaService from '@/services/OcorrenciaService'
import type {OcorrenciaInterface} from "@/interface/Ocorrencia/OcorrenciaInterface"
import type { OcorrenciaGetAllInterface } from '@/interface/Ocorrencia/OcorrenciaGetAllInterface'
import type { OcorrenciaCreateInterface } from '@/interface/Ocorrencia/OcorrenciaCreateInterface'

type OcorrenciaContextType = {
  ocorrencias: OcorrenciaInterface[] | null
  loading: boolean
  getOcorrencias: (dados: OcorrenciaGetAllInterface) => void
  createcorrencias: (dados: OcorrenciaCreateInterface) => void
}

export const OcorrenciaContext = createContext<OcorrenciaContextType | undefined>(undefined)

export function OcorrenciaProvider({ children }: { children: ReactNode }) {

  const [ocorrencias, setOcorrencias] = useState<OcorrenciaInterface[] | null>(null)
  const [ocorrencia, setOcorrencia] = useState<OcorrenciaInterface | null>(null)
  const [loading, setLoading] = useState(true)

  const getOcorrencias = async (dados: OcorrenciaGetAllInterface) => {
    try {
      setLoading(true)
      const ocorrencias: OcorrenciaInterface[] = await OcorrenciaService.getAll(dados)
      setOcorrencias(ocorrencias)
    } catch (error) {
      console.error('Ocorrencias failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const createcorrencias = async (dados: OcorrenciaCreateInterface) => {
    try {
      setLoading(true)
      const ocorrencia: OcorrenciaInterface = await OcorrenciaService.create(dados)
      setOcorrencia(ocorrencia)
    } catch (error) {
      console.error('Ocorrencias failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <OcorrenciaContext.Provider value={{ ocorrencias, loading, getOcorrencias, createcorrencias }}>
      {children}
    </OcorrenciaContext.Provider>
  )
}