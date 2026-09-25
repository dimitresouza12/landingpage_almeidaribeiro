// Responsive photo variants live in /public/images/photos as
// <stem>-<width>.webp (never upscaled: the largest one is the source's native
// width). Adding a photo = generate its variants and register them here.
const photos = {
  'hero-casal': { widths: [480, 768, 1012], width: 1012, height: 1554 },
  'ana-paula-almeida': { widths: [480, 768, 968], width: 968, height: 1624 },
  'deyvison-ribeiro': { widths: [480, 768, 1052], width: 1052, height: 1495 },
  'equipe-almeida-ribeiro': { widths: [480, 768, 991], width: 991, height: 1588 },
} as const

export type PhotoId = keyof typeof photos

export function photoProps(id: PhotoId) {
  const { widths, width, height } = photos[id]
  const path = (w: number) => `/images/photos/${id}-${w}.webp`

  return {
    // Largest variant as the fallback for browsers that ignore srcset.
    src: path(widths[widths.length - 1]),
    srcSet: widths.map((w) => `${path(w)} ${w}w`).join(', '),
    width,
    height,
  }
}
