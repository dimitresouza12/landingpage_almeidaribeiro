export type Audience = 'individual' | 'business'

export interface Attorney {
  id: 'ana-paula' | 'deyvison'
  name: string
  oab: string
  phone: string
  bio: string
  image?: string
}

export interface Service {
  id: string
  name: string
  description: string
}

export interface PracticeArea {
  id: string
  name: string
  audience: Audience
  services: Service[]
}

export interface Office {
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
  },
  {
    id: 'deyvison',
    name: 'Deyvison Ribeiro',
    oab: 'OAB/CE 20.651',
    phone: '5585996274319',
    bio: 'Advogado e consultor empresarial, com atuação no setor público e privado e em Direito Processual.',
  },
]

export const practiceAreas: PracticeArea[] = [
  {
    id: 'direito-previdenciario',
    name: 'Direito Previdenciário',
    audience: 'individual',
    services: [],
  },
  {
    id: 'direito-civil-individual',
    name: 'Direito Civil',
    audience: 'individual',
    services: [
      {
        id: 'divorcio',
        name: 'Divórcio',
        description: 'Orientação jurídica para questões relacionadas a divórcio.',
      },
      {
        id: 'guarda',
        name: 'Guarda',
        description: 'Orientação jurídica para questões relacionadas a guarda.',
      },
      {
        id: 'usucapiao',
        name: 'Usucapião',
        description: 'Orientação jurídica para questões relacionadas a usucapião.',
      },
    ],
  },
  {
    id: 'direito-consumidor-individual',
    name: 'Direito do Consumidor',
    audience: 'individual',
    services: [],
  },
  {
    id: 'direito-digital-individual',
    name: 'Direito Digital',
    audience: 'individual',
    services: [],
  },
  {
    id: 'direito-saude',
    name: 'Direito da Saúde',
    audience: 'individual',
    services: [],
  },
  {
    id: 'direito-empresarial',
    name: 'Direito Empresarial',
    audience: 'business',
    services: [],
  },
  {
    id: 'direito-agrario',
    name: 'Direito Agrário',
    audience: 'business',
    services: [],
  },
  {
    id: 'direito-trabalho',
    name: 'Direito do Trabalho',
    audience: 'business',
    services: [],
  },
  {
    id: 'direito-civil-business',
    name: 'Direito Civil',
    audience: 'business',
    services: [],
  },
  {
    id: 'direito-digital-business',
    name: 'Direito Digital',
    audience: 'business',
    services: [],
  },
  {
    id: 'consultoria-juridica',
    name: 'Consultoria Jurídica',
    audience: 'business',
    services: [],
  },
  {
    id: 'direito-consumidor-business',
    name: 'Direito do Consumidor',
    audience: 'business',
    services: [],
  },
]

export const office: Office = {
  name: 'Almeida Ribeiro Advogados Associados',
  address:
    'R. Coronel Antônio Joaquim, 1881, sala 107, Centro, Limoeiro do Norte, CE, 62930-000',
  hours: '8h às 11h e 14h às 17h',
  email: 'almeidaribeiro.socadv@gmail.com',
  instagram: 'https://instagram.com/almeidaribeiro_adv',
}
