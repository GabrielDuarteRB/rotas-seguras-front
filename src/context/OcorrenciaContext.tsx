'use client'

import { createContext, useState, ReactNode } from 'react'
import OcorrenciaService from '@/services/OcorrenciaService'
import type {OcorrenciaInterface} from "@/interface/Ocorrencia/OcorrenciaInterface"
import type { OcorrenciaGetAllInterface } from '@/interface/Ocorrencia/OcorrenciaGetAllInterface'
import type { OcorrenciaCreateInterface } from '@/interface/Ocorrencia/OcorrenciaCreateInterface'

type OcorrenciaContextType = {
  ocorrencia: OcorrenciaInterface | null
  ocorrencias: OcorrenciaInterface[] | null
  loading: boolean
  getOcorrencias: (dados?: OcorrenciaGetAllInterface) => void
  createOcorrencias: (dados: OcorrenciaCreateInterface) => void
  updateOcorrencia: (id: number, dados: Partial<OcorrenciaInterface>) => void
}

export const OcorrenciaContext = createContext<OcorrenciaContextType | undefined>(undefined)

export function OcorrenciaProvider({ children }: { children: ReactNode }) {

  const [ocorrencias, setOcorrencias] = useState<OcorrenciaInterface[] | null>(null)
  const [ocorrencia, setOcorrencia] = useState<OcorrenciaInterface | null>(null)
  const [loading, setLoading] = useState(true)

  const getOcorrencias = async (dados: OcorrenciaGetAllInterface = {}) => {
    try {
      setLoading(true)
      const ocorrencias: OcorrenciaInterface[] = await OcorrenciaService.getAll(dados)
      setOcorrencias(ocorrencias)
    } catch (error) {
      console.error('Ocorrencias error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const createOcorrencias = async (dados: OcorrenciaCreateInterface) => {
    try {
      setLoading(true)
      const ocorrencia: OcorrenciaInterface = await OcorrenciaService.create(dados)
      setOcorrencia(ocorrencia)
    } catch (error) {
      console.error('Ocorrencias error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateOcorrencia = async (id: number, dados: Partial<OcorrenciaInterface>) => {
    try {
      setLoading(true)
      const ocorrencia: OcorrenciaInterface = await OcorrenciaService.update(id, dados)
      setOcorrencia(ocorrencia)
    } catch (error) {
      console.error('Update error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <OcorrenciaContext.Provider value={{ ocorrencia, ocorrencias, loading, getOcorrencias, createOcorrencias, updateOcorrencia }}>
      {children}
    </OcorrenciaContext.Provider>
  )
}