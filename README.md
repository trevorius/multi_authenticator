This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### install the project

First, install the project:

```bash
npm install
```

instantiate sqlite database and migrate with prisma

```bash
npx prisma migrate dev
```

### run the project in development

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

## Dependencies

### backend

- [Prisma](https://www.prisma.io/)

### frontend

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadcnUi](https://shadcn-ui.vercel.app/)

## run the project

build the project first

```bash
npm run build
npm start
```

### .bat option

in the project root there is a .bat file edit with the folder path and it can be placed as a shortcut it will open your browser on the correct port.
