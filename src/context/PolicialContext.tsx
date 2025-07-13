'use client'

import { createContext, useState, ReactNode } from 'react'
import PolicialService from '@/services/PolicialService'
import type { PolicialInterface } from "@/interface/Policial/PolicialInterface"
import type { PolicialGetAllInterface } from '@/interface/Policial/PolicialGetAllInterface'
import type { PolicialCreateInterface } from '@/interface/Policial/PolicialCreateInterface'

type PolicialContextType = {
  policial: PolicialInterface | null
  policiais: PolicialInterface[] | null
  loading: boolean
  getPoliciais: (dados?: PolicialGetAllInterface) => void
  createPoliciais: (dados: PolicialCreateInterface) => void
  updatePolicial: (id: number, dados: Partial<PolicialInterface>) => void
}

export const PolicialContext = createContext<PolicialContextType | undefined>(undefined)

export function PolicialProvider({ children }: { children: ReactNode }) {

  const [policiais, setPoliciais] = useState<PolicialInterface[] | null>(null)
  const [policial, setPolicial] = useState<PolicialInterface | null>(null)
  const [loading, setLoading] = useState(true)

  const getPoliciais = async (dados: PolicialGetAllInterface = {}) => {
    try {
      setLoading(true)
      const policiais: PolicialInterface[] = await PolicialService.getAll(dados)
      setPoliciais(policiais)
    } catch (error) {
      console.error('Policiais error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const createPoliciais = async (dados: PolicialCreateInterface) => {
    try {
      setLoading(true)
      const policial: PolicialInterface = await PolicialService.create(dados)
      setPolicial(policial)
    } catch (error) {
      console.error('Policial error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updatePolicial = async (id: number, dados: Partial<PolicialInterface>) => {
    try {
      setLoading(true)
      const policial: PolicialInterface = await PolicialService.update(id, dados)
      setPolicial(policial)
    } catch (error) {
      console.error('Update error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <PolicialContext.Provider value={{ policial, policiais, loading, getPoliciais, createPoliciais, updatePolicial}}>
      {children}
    </PolicialContext.Provider>
  )
}