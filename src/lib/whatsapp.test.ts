import { describe, expect, it } from 'vitest'

import { buildWhatsAppUrl } from './whatsapp'

describe('buildWhatsAppUrl', () => {
  it('builds a service-specific WhatsApp URL', () => {
    expect(
      buildWhatsAppUrl('5588996575592', {
        area: 'Direito Civil',
        service: 'Divórcio',
      }),
    ).toBe(
      `https://wa.me/5588996575592?text=${encodeURIComponent(
        'Olá, gostaria de entrar em contato sobre Direito Civil: Divórcio.',
      )}`,
    )
  })

  it('builds an area-specific WhatsApp URL', () => {
    expect(
      buildWhatsAppUrl('5585996274319', { area: 'Direito Agrário' }),
    ).toBe(
      `https://wa.me/5585996274319?text=${encodeURIComponent(
        'Olá, gostaria de entrar em contato sobre Direito Agrário.',
      )}`,
    )
  })

  it('builds a WhatsApp URL for a subject not listed on the site', () => {
    expect(
      buildWhatsAppUrl('5585996274319', { otherSubject: true }),
    ).toBe(
      `https://wa.me/5585996274319?text=${encodeURIComponent(
        'Olá, gostaria de entrar em contato sobre um assunto não listado no site.',
      )}`,
    )
  })

  it('builds a general WhatsApp URL when no topic is provided', () => {
    expect(buildWhatsAppUrl('5585996274319')).toBe(
      `https://wa.me/5585996274319?text=${encodeURIComponent(
        'Olá, gostaria de entrar em contato com o escritório.',
      )}`,
    )
  })
})
