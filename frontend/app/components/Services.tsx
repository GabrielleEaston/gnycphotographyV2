// app/components/Services.tsx

import Image from 'next/image'
import React from 'react'

// 1) Define the shape of each service
export interface Service {
  _id: string
  title: string
  description?: string
  iconUrl?: string
}

// 2) Define your props interface
interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-center text-black text-sm font-semibold tracking-widest mb-12 uppercase font-serif">
        What I Offer
      </h2>
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-16">
        {services.map((service) => (
          <div
            key={service._id}
            className="min-w-[220px] flex-shrink-0 flex flex-col items-center text-center snap-center"
          >
            {service.iconUrl && (
              <div className="mb-4">
                <Image
                  src={service.iconUrl}
                  alt={service.title}
                  width={112}
                  height={112}
                  className="object-cover rounded-full border-4 border-white shadow-md"
                />
              </div>
            )}
            <h3 className="text-black text-xl font-serif mb-2">
              {service.title}
            </h3>
            {service.description && (
              <p className="text-gray-600">{service.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
