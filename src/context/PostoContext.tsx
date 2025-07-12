'use client'

import { createContext, useState, ReactNode, useContext } from 'react'
import PostoService from '@/services/PostoService'
import type { PostoCreateInterface } from '@/interface/Posto/PostoCreateInterface'
import type { PostoGetAllInterface } from '@/interface/Posto/PostoGetAllInterface'

interface Posto extends PostoCreateInterface {
  id: number;
}

type PostoContextType = {
  posto: Posto | null
  postos: Posto[] | null
  loading: boolean
  getPostos: (filtros?: PostoGetAllInterface) => void
  createPosto: (dados: PostoCreateInterface) => void
  updatePosto: (id: number, dados: Partial<PostoCreateInterface>) => void
}

export const PostoContext = createContext<PostoContextType | undefined>(undefined)

export function PostoProvider({ children }: { children: ReactNode }) {
  const [postos, setPostos] = useState<Posto[] | null>(null)
  const [posto, setPosto] = useState<Posto | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getPostos = async (filtros: PostoGetAllInterface = {}) => {
    try {
      setLoading(true)
      const resultado = await PostoService.getAll(filtros)
      setPostos(resultado)
    } catch (error) {
      console.error('Erro ao buscar postos:', error)
    } finally {
      setLoading(false)
    }
  }

  const createPosto = async (dados: PostoCreateInterface) => {
    try {
      setLoading(true)
      const novo = await PostoService.create(dados)
      setPosto(novo)
    } catch (error) {
      console.error('Erro ao criar posto:', error)
    } finally {
      setLoading(false)
    }
  }

  const updatePosto = async (id: number, dados: Partial<PostoCreateInterface>) => {
    try {
      setLoading(true)
      const atualizado = await PostoService.update(id, dados)
      setPosto(atualizado)
    } catch (error) {
      console.error('Erro ao atualizar posto:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PostoContext.Provider value={{ posto, postos, loading, getPostos, createPosto, updatePosto }}>
      {children}
    </PostoContext.Provider>
  )
}

export const usePosto = (): PostoContextType => {
  const context = useContext(PostoContext)
  if (!context) {
    throw new Error('usePosto deve ser usado dentro do PostoProvider')
  }
  return context
}
