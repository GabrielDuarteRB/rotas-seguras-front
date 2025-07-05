"use client"

import { useState, useContext } from 'react'
import { MdEmail, MdLock } from 'react-icons/md'
import { AuthContext } from '@/context/AuthContext'
import { InputText } from '@/components/Input/Text'
import { ButtonPrimary } from '@/components/Button/Primary'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const authContext = useContext(AuthContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Por favor, preencha todos os campos')
      return
    }

    if(authContext) {
      await authContext.login(email, password)
    } else {
      setError('Tente novamente mais tarde')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--color-secondary)' }}>
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-lg" style={{
        backgroundColor: 'var(--background)',
        border: '1px solid var(--color-terciary)'
      }}>
        <div className="text-center">
          <h2 style={{ color: 'var(--foreground)', fontSize: '1.875rem', fontWeight: 'bold' }}>
            Bem-vindo de volta
          </h2>
          <p className="mt-2" style={{ color: 'var(--color-terciary)' }}>
            Faça login para continuar
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm rounded-lg" style={{
            color: 'var(--color-erro)',
            backgroundColor: 'rgba(255, 77, 79, 0.1)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <InputText
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            icon={<MdEmail className="w-5 h-5" />}
            error={!email && error ? 'Campo obrigatório' : undefined}
          />

          <InputText
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<MdLock className="w-5 h-5" />}
            error={!password && error ? 'Campo obrigatório' : undefined}
          />

          <ButtonPrimary type="submit" >
              Entrar
          </ButtonPrimary>
        </form>

        <div className="flex text-center text-sm justify-around" style={{ color: 'var(--color-terciary)' }}>
          <a
            href="/cadastrar"
            style={{
              color: 'var(--color-primary)',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'rgba(0, 199, 189, 0.8)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
          >
            Criar uma conta
          </a>
          <a
            href="#"
            style={{
              color: 'var(--color-primary)',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'rgba(0, 199, 189, 0.8)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
          >
            Esqueceu sua senha?
          </a>
        </div>
      </div>
    </div>
  )
}