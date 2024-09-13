This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Projeto de Integração de API com Next.js

     Este projeto foi desenvolvido para integrar uma API local de produtos. Os usuários podem visualizar, pesquisar e filtrar produtos na página principal, enquanto os administradores podem cadastrar e deletar produtos na área `/admin`.
    
## Tecnologias Utilizadas

     - Next.js
     - Chakra UI
     - Tailwind CSS
     - Axios

## Instalação

1. Clone o repositório:
```bash
git clone <link-do-repositorio>
```
2. Instale as dependências:
```bash
    npm install
```

4. Execute o projeto:
```bash
   npm run dev
```
O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura de Pastas

- `/app/page.tsx` - Página principal que lista todos os produtos.
- `/app/admin/page.tsx` - Página de administração para cadastrar e deletar produtos.
- `app/utils/axios.ts` - Configuração de uma instância do Axios para fazer chamadas à API e da base URL da api.
- `app/utils/utils.ts` - Contém funções utilitárias usadas em várias partes do projeto.


## Decisões Técnicas

- **Chakra UI e Tailwind CSS**: Utilizei Chakra UI como a principal biblioteca de estilização, pela facilidade de criar componentes reutilizáveis e com boa acessibilidade. Em alguns casos, usei Tailwind CSS para estilizações rápidas e específicas.
     
- **Axios**: Criei uma instância do Axios em `/utils/axios.ts` para configurar a base URL da API e tratar requisições de forma centralizada.

- **Estrutura do código**: Organizei a parte administrativa do projeto na rota `/admin` para manter a separação entre a funcionalidade pública e a de administração.

 ## Funcionalidades

- **Página principal**: Os usuários podem visualizar todos os produtos e utilizar filtros de pesquisa.
- **Administração**: Os administradores podem adicionar novos produtos ou remover produtos existentes.