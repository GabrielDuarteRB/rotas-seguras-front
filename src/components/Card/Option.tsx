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
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
      <div className="p-4">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">
          { title }
        </h5>
        <p className="text-slate-600 leading-normal font-light">
          { paragraph }
        </p>

        <Link href={buttonLink}>
          <ButtonPrimary>
            { buttonText }
          </ButtonPrimary>
        </Link>
      </div>
    </div>
  );

}