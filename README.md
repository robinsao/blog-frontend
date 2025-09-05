# Overview

This is the frontend code for my [blog site](https://blog.robinsao.uk).

It uses Next.js 15 and MUI.

This is based on [Strapi CMS](https://strapi.io), an open-source ***HEADLESS*** CMS. Creating/updating blogs are done via a GUI provided by the CMS. The content of the blogs themselves are written in Markdown. The CMS provides a preview of the Markdown as well.

# Installation

Please first setup the [backend](https://github.com/robinsao/blog-backend). To setup the frontend, run

```sh
git clone https://github.com/robinsao/blog-frontend
cd blog-frontend
npm i --omit=dev
```

After this, configure the environment variables, and run it in either the development version with `npm run dev` or the production version with

```sh
npm run build
NODE_ENV=production npm run start
```

# Blog Caching

All pages are cached. The `/index` cache is revalidated every 5 minutes, and the `/blog` page is revalidated every 10 minutes. You can view or tweak the configuration in the respective `/page.tsx` files.
