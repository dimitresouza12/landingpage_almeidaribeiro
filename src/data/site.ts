export type Audience = 'individual' | 'business'

export type Attorney = {
  id: 'ana-paula' | 'deyvison'
  name: string
  oab: string
  phone: string
  bio: string
  image?: string
}

export type Service = {
  id: string
  name: string
  description: string
}

export type PracticeArea = {
  id: string
  name: string
  audience: Audience
  services: Service[]
}

export type Office = {
  name: string
  address: string
  hours: string
  email: string
  instagram: string
  heroImage?: string
}

export const attorneys: Attorney[] = [
  {
    id: 'ana-paula',
    name: 'Ana Paula Almeida',
    oab: 'OAB/CE 57.336',
    phone: '5588996575592',
    bio: 'Advogada e consultora empresarial, com atuação para pessoas físicas e jurídicas nos setores público e privado.',
    image: '/images/ana-paula-almeida.webp',
  },
  {
    id: 'deyvison',
    name: 'Deyvison Ribeiro',
    oab: 'OAB/CE 20.651',
    phone: '5585996274319',
    bio: 'Advogado e consultor empresarial, com atuação no setor público e privado e em Direito Processual.',
    image: '/images/deyvison-ribeiro.webp',
  },
]

export const practiceAreas: PracticeArea[] = [
  {
    id: 'previdenciario',
    name: 'Direito Previdenciário',
    audience: 'individual',
    services: [],
  },
  {
    id: 'civil-pessoa',
    name: 'Direito Civil',
    audience: 'individual',
    services: [
      {
        id: 'divorcio',
        name: 'Divórcio',
        description: 'Orientação jurídica para questões relacionadas ao divórcio.',
      },
      {
        id: 'guarda',
        name: 'Guarda',
        description: 'Orientação jurídica para questões relacionadas à guarda.',
      },
      {
        id: 'usucapiao',
        name: 'Usucapião',
        description: 'Orientação jurídica para questões relacionadas à usucapião.',
      },
    ],
  },
  {
    id: 'consumidor-pessoa',
    name: 'Direito do Consumidor',
    audience: 'individual',
    services: [],
  },
  {
    id: 'digital-pessoa',
    name: 'Direito Digital',
    audience: 'individual',
    services: [],
  },
  {
    id: 'saude',
    name: 'Direito da Saúde',
    audience: 'individual',
    services: [],
  },
  {
    id: 'empresarial',
    name: 'Direito Empresarial',
    audience: 'business',
    services: [],
  },
  {
    id: 'agrario',
    name: 'Direito Agrário',
    audience: 'business',
    services: [],
  },
  {
    id: 'trabalho',
    name: 'Direito do Trabalho',
    audience: 'business',
    services: [],
  },
  {
    id: 'civil-empresa',
    name: 'Direito Civil',
    audience: 'business',
    services: [],
  },
  {
    id: 'digital-empresa',
    name: 'Direito Digital',
    audience: 'business',
    services: [],
  },
  {
    id: 'consultoria',
    name: 'Consultoria Jurídica',
    audience: 'business',
    services: [],
  },
  {
    id: 'consumidor-empresa',
    name: 'Direito do Consumidor',
    audience: 'business',
    services: [],
  },
]

export const office: Office = {
  name: 'Almeida Ribeiro Advogados Associados',
  address:
    'R. Coronel Antônio Joaquim, 1881, salas 107 e 112, Centro, Limoeiro do Norte, CE, 62930-000',
  hours: '8h às 11h e 14h às 17h',
  email: 'almeidaribeiro.socadv@gmail.com',
  instagram: 'https://instagram.com/almeidaribeiro_adv',
  heroImage: '/images/equipe-almeida-ribeiro.webp',
}
