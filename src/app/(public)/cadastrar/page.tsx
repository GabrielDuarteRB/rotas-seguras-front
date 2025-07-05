"use client"

import { useState, useContext } from 'react'
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { AuthContext } from '@/context/AuthContext'
import { InputText } from '@/components/Input/Text'
import { ButtonPrimary } from '@/components/Button/Primary'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const authContext = useContext(AuthContext)

  if(!authContext) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    try {
      await authContext.register({nome: name, email, senha: password})
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente mais tarde.')
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
            Criar Conta
          </h2>
          <p className="mt-2" style={{ color: 'var(--color-terciary)' }}>
            Preencha seus dados para se cadastrar
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

        {success && (
          <div className="p-3 text-sm rounded-lg" style={{
            color: 'green',
            backgroundColor: 'rgba(0, 200, 100, 0.1)'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <InputText
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            icon={<MdPerson className="w-5 h-5" />}
            error={!name && error ? 'Campo obrigatório' : undefined}
          />

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

          <InputText
            label="Confirmar Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            icon={<MdLock className="w-5 h-5" />}
            error={!confirmPassword && error ? 'Campo obrigatório' : undefined}
          />

          <ButtonPrimary type="submit" >
              Criar Conta
          </ButtonPrimary>
        </form>

        <div className="text-center text-sm mt-4" style={{ color: 'var(--color-terciary)' }}>
          <a
            href="/login"
            style={{
              color: 'var(--color-primary)',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'rgba(0, 199, 189, 0.8)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
          >
            Já tem uma conta? Entrar
          </a>
        </div>
      </div>
    </div>
  )
}