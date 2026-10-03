import { ImageResponse } from 'next/og'
import { getAjustes } from '@/lib/content'

const PAPEL = '#faf6f3'
const CEREZA = '#b8436c'

function comoPng(url: string) {
  const u = new URL(url)
  u.searchParams.delete('auto')
  u.searchParams.set('fm', 'png')
  return u.toString()
}

export async function iconResponse(size: number, round: boolean) {
  const { icono, nombre } = await getAjustes()
  const radius = round ? '50%' : '0'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: icono ? PAPEL : CEREZA,
          borderRadius: radius,
          color: PAPEL,
          fontSize: size * 0.6,
          fontWeight: 700,
        }}
      >
        {icono ? (
          <img src={comoPng(icono)} width={size} height={size} style={{ borderRadius: radius }} alt="" />
        ) : (
          nombre.charAt(0).toUpperCase()
        )}
      </div>
    ),
    { width: size, height: size },
  )
}

export async function shareImageResponse() {
  const { logo, nombre, eslogan } = await getAjustes()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: PAPEL,
          color: '#3d3639',
        }}
      >
        {logo ? (
          <img src={comoPng(logo)} width={630} height={630} alt="" />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 80px' }}>
            <div style={{ fontSize: 96, fontWeight: 700, color: CEREZA }}>{nombre}</div>
            {eslogan && <div style={{ fontSize: 40, marginTop: 24, textAlign: 'center' }}>{eslogan}</div>}
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
