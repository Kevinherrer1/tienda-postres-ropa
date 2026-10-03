import { MapPin, Clock, MessageCircle, Truck, type LucideIcon } from 'lucide-react'
import { whatsappUrl, type Ajustes } from '@/lib/site'

type Detail = { icon: LucideIcon; label: string; value: string; href?: string }

export function Visit({ ajustes }: { ajustes: Ajustes }) {
  const details: Detail[] = [
    { icon: MapPin, label: 'Tienda', value: ajustes.ubicacion },
    { icon: Truck, label: 'Entregas', value: ajustes.entregas },
    { icon: Clock, label: 'Horario', value: ajustes.horario },
    {
      icon: MessageCircle,
      label: 'Pedidos por WhatsApp',
      value: ajustes.telefono,
      href: whatsappUrl(ajustes.telefono, '¡Hola! Quería hacer un pedido.'),
    },
  ].filter((detail) => detail.value)

  return (
    <section id="visitanos" className="scroll-mt-20 px-5 pb-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 rounded-3xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-14">
        <div className="max-w-md">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
            Pasa a probarte algo. O a probar algo.
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            Llena tu bolsa y mándanos el pedido por WhatsApp.{' '}
            {ajustes.entregas
              ? 'Puedes retirarlo en nuestra tienda o te lo llevamos personalmente.'
              : 'Te respondemos para confirmar y coordinar la entrega.'}
          </p>
        </div>
        <ul className="flex flex-col gap-5">
          {details.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <>
                <span className="flex size-11 items-center justify-center rounded-full bg-primary-foreground text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide opacity-80">{label}</span>
                  <span className="font-display text-lg font-semibold">{value}</span>
                </span>
              </>
            )
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 underline-offset-4 hover:underline"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center gap-4">{content}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
