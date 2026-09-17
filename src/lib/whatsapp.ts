export interface WhatsAppTopic {
  area?: string
  service?: string
  otherSubject?: boolean
}

export function buildWhatsAppUrl(
  phone: string,
  topic?: WhatsAppTopic,
): string {
  let message = 'Olá, gostaria de entrar em contato com o escritório.'

  if (topic?.otherSubject) {
    message =
      'Olá, gostaria de entrar em contato sobre um assunto não listado no site.'
  } else if (topic?.area && topic.service) {
    message = `Olá, gostaria de entrar em contato sobre ${topic.area}: ${topic.service}.`
  } else if (topic?.area) {
    message = `Olá, gostaria de entrar em contato sobre ${topic.area}.`
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
