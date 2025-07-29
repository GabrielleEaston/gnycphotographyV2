// components/Services.tsx
import Image from 'next/image'

export default function Services({ services }) {
  return (
    <section className="py-16 bg-white">
    <h2 className="text-center text-black text-sm font-semibold tracking-widest mb-12 uppercase font-serif">
      What I Offer
    </h2>
    <div
      className="
        flex mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-16
      "
    >
      {services.map(service => (
        <div
          key={service._id}
          className="min-w-[220px] flex-shrink-0 flex flex-col items-center text-center snap-center"
        >
          {service.iconUrl && (
            <div className="mb-4">
              <img
                src={service.iconUrl}
                alt={service.title}
                className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
              />
            </div>
          )}
          <h3 className="text-black text-xl font-serif mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  </section>
  
  )
}
