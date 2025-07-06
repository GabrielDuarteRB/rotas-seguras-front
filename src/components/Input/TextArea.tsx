'use client'

import { useState, TextareaHTMLAttributes, ReactNode } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  icon?: ReactNode
  rows?: number
}

export function InputTextArea({
  label,
  error,
  icon,
  className = '',
  rows = 4,
  ...props
}: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className={`block mb-1 text-sm font-medium ${error ? 'text-error' : 'text-primary'}`}>
          {label}
        </label>
      )}

      <div
        className={`relative flex items-center border rounded-lg transition-all ${
          error
            ? 'border-error'
            : isFocused
            ? 'border-primary shadow-[0_0_0_3px_rgba(0,199,189,0.15)]'
            : 'border-terciary'
        }`}
      >
        {icon && (
          <div className="absolute left-3 text-terciary pointer-events-none">
            {icon}
          </div>
        )}

        <textarea
          {...props}
          rows={rows}
          className={`w-full py-2.5 px-4 bg-transparent outline-none resize-y rounded-lg ${
            icon ? 'pl-10' : 'pl-4'
          } ${error ? 'text-error placeholder-error/70' : 'text-foreground placeholder-terciary'}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
