"use client"

import React from 'react'
import Link from 'next/link'
import {ButtonPrimary} from '../Button/Primary'

type Props = {
  title: String,
  paragraph: String,
  buttonText: String,
  buttonLink: string
}

export function CardOption({ title, paragraph, buttonText, buttonLink = '#' } : Props) {

  return (
    <div className="relative flex flex-col bg-transparent border border-gray-700 rounded-xl hover-lift card-gradient transition-all duration-300 group h-full">
      <div className="p-6 h-full flex flex-col">
        
        <div className="w-2 h-8 bg-primary rounded-full mb-4 group-hover:scale-110 transition-transform duration-300"></div>
        
        
        <div className="flex-1">
          <h5 className="mb-3 text-white text-xl font-semibold group-hover:text-primary transition-colors duration-300">
            { title }
          </h5>
          <p className="text-zinc-300 leading-relaxed font-light text-sm mb-6">
            { paragraph }
          </p>
        </div>

        
        <div className="mt-auto pt-4">
          <Link href={buttonLink} className="block">
            <ButtonPrimary className="w-full group-hover:scale-105 transition-transform duration-300">
              { buttonText }
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  );

}