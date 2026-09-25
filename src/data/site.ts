import type { PhotoId } from '../lib/photos'

export type Audience = 'individual' | 'business'

export type Attorney = {
  id: 'ana-paula' | 'deyvison'
  name: string
  oab: string
  phone: string
  bio: string
  photo?: PhotoId
  avatar?: string
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
  summary: string
  services: Service[]
}

export type Office = {
  name: string
  address: string
  hours: string
  email: string
  instagram: string
  heroPhoto?: PhotoId
  coordinates: {
    lat: number
    lng: number
  }
}

export const attorneys: Attorney[] = [
  {
    id: 'ana-paula',
    name: 'Ana Paula Almeida',
    oab: 'OAB/CE 57.336',
    phone: '5588996575592',
    bio: 'Advogada e consultora, com experiência em gestão e atuação jurídica. Une conhecimento técnico, visão estratégica e experiência empresarial para compreender desafios e construir soluções jurídicas alinhadas às necessidades de pessoas e empresas.',
    photo: 'ana-paula-almeida',
    avatar: '/images/avatar-ana-paula-almeida.webp',
  },
  {
    id: 'deyvison',
    name: 'Deyvison Ribeiro',
    oab: 'OAB/CE 20.651',
    phone: '5585996274319',
    bio: 'Advogado, com experiência na área jurídica e em consultoria jurídica ao agronegócio. Atua com conhecimento técnico, visão estratégica e compromisso com uma advocacia responsável, próxima e voltada à realidade de cada cliente.',
    photo: 'deyvison-ribeiro',
    avatar: '/images/avatar-deyvison-ribeiro.webp',
  },
]

export const practiceAreas: PracticeArea[] = [
  {
    id: 'previdenciario',
    name: 'Direito Previdenciário',
    audience: 'individual',
    summary: 'Direitos, benefícios e pensões para diferentes momentos da vida.',
    services: [],
  },
  {
    id: 'civil-pessoa',
    name: 'Direito Civil',
    audience: 'individual',
    summary: 'Relações, contratos, família e patrimônio.',
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
    summary: 'Direitos e relações entre consumidores e empresas.',
    services: [],
  },
  {
    id: 'digital-pessoa',
    name: 'Direito Digital',
    audience: 'individual',
    summary: 'Relações, direitos e responsabilidades no ambiente digital.',
    services: [],
  },
  {
    id: 'saude',
    name: 'Direito da Saúde',
    audience: 'individual',
    summary: 'Direitos relacionados ao acesso e à proteção da saúde.',
    services: [],
  },
  {
    id: 'empresarial',
    name: 'Direito Empresarial',
    audience: 'business',
    summary: 'Estratégia jurídica para proteger e fortalecer o seu negócio.',
    services: [],
  },
  {
    id: 'agrario',
    name: 'Direito Agrário',
    audience: 'business',
    summary: 'Soluções jurídicas para quem vive e empreende no campo.',
    services: [],
  },
  {
    id: 'trabalho',
    name: 'Direito do Trabalho',
    audience: 'business',
    summary: 'Relações de trabalho com segurança e prevenção.',
    services: [],
  },
  {
    id: 'civil-empresa',
    name: 'Direito Civil',
    audience: 'business',
    summary: 'Contratos, relações e patrimônio com mais segurança jurídica.',
    services: [],
  },
  {
    id: 'digital-empresa',
    name: 'Direito Digital',
    audience: 'business',
    summary: 'Proteção jurídica para negócios no ambiente digital.',
    services: [],
  },
  {
    id: 'consultoria',
    name: 'Consultoria Jurídica',
    audience: 'business',
    summary: 'Orientação estratégica para decisões mais seguras.',
    services: [],
  },
  {
    id: 'consumidor-empresa',
    name: 'Direito do Consumidor',
    audience: 'business',
    summary: 'Relações entre a empresa e seus consumidores.',
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
  heroPhoto: 'hero-casal',
  coordinates: {
    lat: -5.1504359,
    lng: -38.1007568,
  },
}
