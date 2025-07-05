"use client"

import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function ButtonPrimary({ children, type = 'button', onClick, className = '', disabled = false }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${className}`}
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'white'
      }}
      onMouseOver={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = 'rgba(0, 199, 189, 0.9)'
      }}
      onMouseOut={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = 'var(--color-primary)'
      }}
    >
      {children}
    </button>
  )
}