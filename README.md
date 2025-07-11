# Overview

This is the frontend code for my [blog site](https://blog.robinsao.uk).

It uses Next.js 15 and MUI.

# Installation

Please first setup the [backend](https://github.com/robinsao/blog-backend). To setup the frontend, run

```sh
git clone https://github.com/robinsao/blog-frontend
cd blog-frontend
npm run dev
```

Then, configure the environment variables, and next.config.ts.

# Blog Caching

All pages are cached. The `/index` cache is revalidated every 5 minutes, and the `/blog` page is revalidated every 10 minutes. You can view or tweak the configuration in the respective `/page.tsx` files.