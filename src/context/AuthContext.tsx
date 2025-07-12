'use client'

import { createContext, useState, ReactNode, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import UserService from '@/services/UserService'
import type {UserInterface} from "@/interface/User/UserInterface"
import type { UserCreateInterface } from '@/interface/User/UserCreateInterface'

type AuthContextType = {
  user: UserInterface | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: UserCreateInterface) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname();

  const [user, setUser] = useState<UserInterface | null>(null)
  const [loading, setLoading] = useState(true)
  const publicRoutes = ['/login', '/cadastrar']

  useEffect(() => {
    if (publicRoutes.includes(pathname) ) {
      setLoading(false);
      return;
    }

    me()
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { usuario, token }: { usuario: UserInterface; token: string } = await UserService.login(email, password)
      localStorage.setItem('authToken', token)
      setUser(usuario)
      router.push('/civil')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const me = async () => {
    try {
      setLoading(true)
      const {user} : {user: UserInterface} = await UserService.getUserByToken()
      const userLogged  = await UserService.getUserById(user.id)
      setUser(userLogged)
    } catch (error) {
      console.log('Invalid failed:', error)
      redirectToLogin()
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    redirectToLogin()
  }

  const register = async (data: UserCreateInterface) => {
    try {
      setLoading(true)
      await UserService.register(data)
      router.push('/login')
    } catch (error) {
      console.log('Invalid Register:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const redirectToLogin = () => {
    localStorage.removeItem('authToken')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, register }}>
      {children}
    </AuthContext.Provider>
  )
}