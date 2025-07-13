'use client'

import { createContext, useState, ReactNode } from 'react'
import PostoPolicialService from '@/services/PostoPolicialService'
import type { PostoPolicialInterface } from "@/interface/PostoPolicial/PostoPolicialInterface"
import type { PostoPolicialGetAllInterface } from '@/interface/PostoPolicial/PostoPolicialGetAllInterface'
import type { PostoPolicialCreateInterface } from '@/interface/PostoPolicial/PostoPolicialCreateInterface'

type PostoPolicialContextType = {
  postopolicial: PostoPolicialInterface | null
  postospoliciais: PostoPolicialInterface[] | null
  loading: boolean
  getPostosPoliciais: (dados?: PostoPolicialGetAllInterface) => void
  createPostosPoliciais: (dados: PostoPolicialCreateInterface) => void
  updatePostoPolicial: (id: number, dados: Partial<PostoPolicialInterface>) => void
}

export const PolicialContext = createContext<PostoPolicialContextType | undefined>(undefined)

export function PostoPolicialProvider({ children }: { children: ReactNode }) {

  const [postospoliciais, setPostosPoliciais] = useState<PostoPolicialInterface[] | null>(null)
  const [postopolicial, setPostoPolicial] = useState<PostoPolicialInterface | null>(null)
  const [loading, setLoading] = useState(true)

  const getPostosPoliciais = async (dados: PostoPolicialGetAllInterface = {}) => {
    try {
      setLoading(true)
      const postospoliciais: PostoPolicialInterface[] = await PostoPolicialService.getAll(dados)
      setPostosPoliciais(postospoliciais)
    } catch (error) {
      console.error('Postos error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const createPostosPoliciais = async (dados: PostoPolicialCreateInterface) => {
    try {
      setLoading(true)
      const postopolicial: PostoPolicialInterface = await PostoPolicialService.create(dados)
      setPostoPolicial(postopolicial)
    } catch (error) {
      console.error('Posto error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updatePostoPolicial = async (id: number, dados: Partial<PostoPolicialInterface>) => {
    try {
      setLoading(true)
      const postopolicial: PostoPolicialInterface = await PostoPolicialService.update(id, dados)
      setPostoPolicial(postopolicial)
    } catch (error) {
      console.error('Update error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <PolicialContext.Provider value={{ postopolicial, postospoliciais, loading, getPostosPoliciais, createPostosPoliciais, updatePostoPolicial}}>
      {children}
    </PolicialContext.Provider>
  )
}