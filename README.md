# Almeida Ribeiro Advogados Associados

Landing page institucional do escritório Almeida Ribeiro Advogados Associados.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Verificações de qualidade

```bash
npm test
npm run build
git diff --check
```

## Entrega de marca e imagens

Antes de publicar, inclua somente imagens aprovadas: uma fotografia de abertura horizontal do escritório ou da equipe e um retrato profissional vertical para cada advogado. Converta os arquivos aprovados para WebP ou AVIF, salve-os em `public/images/` e informe seus caminhos nos campos opcionais `office.heroImage` e `attorney.image` em `src/data/site.ts` com URLs a partir da raiz do site, por exemplo: `'/images/escritorio.webp'`. Não use `public/images/escritorio.webp` como valor nesses campos. Atualize também em `src/data/site.ts` o catálogo de serviços aprovado pelo escritório e as descrições curtas correspondentes.

O logotipo oficial deve ser entregue e preservado em SVG ou PNG com fundo transparente para a entrega de marca. A interface aprovada usa deliberadamente uma marca nominativa em texto e não possui, hoje, campo ou componente que consuma o arquivo do logotipo. Portanto, não integre o arquivo à interface atual sem que sua posição e uso sejam aprovados separadamente.

Não usar retratos gerados, depoimentos, promessas ou alegações de resultado, preços, descontos, especialidades não comprovadas nem descrições de serviços sem aprovação. Novas áreas e serviços só entram após validação do escritório.
