"use client"

import { useState, InputHTMLAttributes } from 'react'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function InputText({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputTextProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className={`block mb-1 text-sm font-medium ${error ? 'text-error' : 'text-primary'}`}>
          {label}
        </label>
      )}

      <div className={`relative flex items-center border rounded-lg transition-all ${
        error ? 'border-error' :
        isFocused ? 'border-primary shadow-[0_0_0_3px_rgba(0,199,189,0.15)]' : 'border-terciary'
      }`}>
        {icon && (
          <div className="absolute left-3 text-terciary">
            {icon}
          </div>
        )}

        <input
          {...props}
          className={`w-full py-2.5 px-4 bg-transparent outline-none rounded-lg ${
            icon ? 'pl-10' : 'pl-3'
          } ${error ? 'text-error placeholder-error/70' : 'text-foreground placeholder-terciary'}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {error && (
        <p className="mt-1 text-xs text-error">{error}</p>
      )}
    </div>
  )
}