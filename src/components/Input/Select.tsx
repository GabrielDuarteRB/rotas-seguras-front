'use client'

import { useState, SelectHTMLAttributes, ReactNode } from 'react'

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  icon?: ReactNode
  options: { value: string; label: string }[]
}

export function InputSelect({
  label,
  error,
  icon,
  options,
  className = '',
  ...props
}: InputSelectProps) {
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
          <div className="absolute left-3 text-terciary pointer-events-none">
            {icon}
          </div>
        )}

        <select
          {...props}
          className={`w-full py-2.5 pr-4 bg-transparent outline-none rounded-lg appearance-none ${
            icon ? 'pl-10' : 'pl-3'
          } ${error ? 'text-error placeholder-error/70' : 'text-foreground placeholder-terciary'}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <option value="" disabled hidden>
            Selecione...
          </option>

          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="mt-1 text-xs text-error">{error}</p>
      )}
    </div>
  )
}
