
<p align="center">
<img src="https://img.shields.io/github/languages/code-size/fiskryeziu/crudapp" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/last-commit/fiskryeziu/crudapp" alt="GitHub last commit" />
<img src="https://img.shields.io/github/commit-activity/m/fiskryeziu/crudapp" alt="GitHub commit activity month" />
<img src="https://img.shields.io/github/license/fiskryeziu/crudapp" alt="GitHub license" />
</p>

<p></p>
<p></p>

# 📌 Overview

crudapp is a project built with Next.js and Prisma, using NextAuth for authentication. It also utilizes React Query and TRPC for data fetching and communication. The project includes various dependencies such as React, Tailwind CSS, and TypeScript.

## 🔍 Table of Contents

* [📁 Project Structure](#-project-structure)

* [📝 Project Summary](#-project-summary)

* [💻 Stack](#-stack)

* [⚙️ Setting Up](#-setting-up)

* [🚀 Run Locally](#-run-locally)

* [🙌 Contributors](#-contributors)

## 📁 Project Structure

```bash
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── prettier.config.cjs
├── prisma
│   └── schema.prisma
├── public
│   ├── favicon.ico
│   ├── images
│   │   ├── icons8-home.svg
│   │   └── icons8-menu.svg
│   └── user.png
├── src
│   ├── components
│   │   ├── accessDenied.tsx
│   │   ├── empty.tsx
│   │   ├── layout.tsx
│   │   ├── loader.tsx
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   ├── todoEditModal.tsx
│   │   ├── todoItem.tsx
│   │   └── todoModal.tsx
│   ├── env.mjs
│   ├── hooks
│   │   └── useHover.ts
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth].ts
│   │   │   └── trpc
│   │   │       └── [trpc].ts
│   │   ├── index.tsx
│   │   ├── today.tsx
│   │   └── upcoming.tsx
│   ├── server
│   │   ├── api
│   │   │   ├── root.ts
│   │   │   ├── routers
│   │   │   │   └── todos.ts
│   │   │   └── trpc.ts
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   └── helpers
│   │       └── dateChecker.ts
│   ├── styles
│   │   └── globals.css
│   └── utils
│       └── api.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 📝 Project Summary

- [**src**](src): Main source code directory containing components, hooks, pages, and utils.
- [**src/components**](src/components): Reusable UI components used throughout the project.
- [**src/hooks**](src/hooks): Custom hooks providing common functionalities.
- [**src/pages**](src/pages): React pages for routing and rendering different views.
- [**src/pages/api**](src/pages/api): Serverless API endpoints for handling HTTP requests.
- [**src/pages/api/auth**](src/pages/api/auth): API endpoints for authentication-related functionalities.
- [**src/pages/api/trpc**](src/pages/api/trpc): API endpoints for trpc (typed RPC) integration.
- [**src/server**](src/server): Server-side code for backend logic and API implementation.
- [**src/server/api/routers**](src/server/api/routers): Express routers for organizing API routes.
- [**src/server/helpers**](src/server/helpers): Helper functions and utilities for server-side operations.

## 💻 Stack

- [next-auth/prisma-adapter](https://github.com/nextauthjs/adapters/tree/main/packages/prisma): Adapter for NextAuth.js authentication library with Prisma ORM integration.
- [tanstack/react-query](https://github.com/tannerlinsley/react-query): Data fetching and caching library for React applications.
- [trpc/client](https://github.com/trpc/trpc/tree/main/packages/client): TypeScript RPC (Remote Procedure Call) library for client-side communication with the server.
- [trpc/next](https://github.com/trpc/trpc/tree/main/packages/next): trpc server middleware for Next.js applications.
- [next](https://github.com/vercel/next.js): Framework for server-rendered React applications.
- [react](https://reactjs.org/): JavaScript library for building user interfaces.
- [prisma](https://www.prisma.io/): Database toolkit to access databases with type safety and auto-generated queries.
- [tailwindcss](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.

## ⚙️ Setting Up

#### DATABASE_URL
- No guide needed. The value is already provided as "file:./db.sqlite".

#### NEXTAUTH_SECRET
- Generate a new secret on the command line with the following command:
  - openssl rand -base64 32

#### NEXTAUTH_URL
- No guide needed. The value is already provided as "http://localhost:3000".

#### GITHUB_CLIENT_ID
- Insert a guide.

#### GITHUB_CLIENT_SECRET
- Insert a guide.

## 🚀 Run Locally
1.Clone the crudapp repository:
```sh
git clone https://github.com/fiskryeziu/crudapp
```
2.Install the dependencies with one of the package managers listed below:
```bash
pnpm install
bun install
npm install
yarn install
```
3.Start the development mode:
```bash
pnpm dev
bun dev
npm run dev
yarn dev
```

## 🙌 Contributors
<a href="https://github.com/fiskryeziu/crudapp/graphs/contributors">
<img src="https://contrib.rocks/image?repo=fiskryeziu/crudapp" />
</a>
