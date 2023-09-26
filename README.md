# Basic App Scaffold

## Features

* JS compilation (esbuild)
* CSS compilation with (scss, postcss, autoprefixer, cssnano)
* Copy public (a.k.a. static) files to build dir alongside JS and CSS assets
* Local server for development

## Setup

Ins and Outs definied in `/app.config.js`:

```js
export const config = {
    appName: "rss-reader",
    entryPoints: ["src/js/app.js"],
    styles: "src/scss",
    port: 1337,
    out: "build",
    public: "src/public"
};
```

## Scripts

* `yarn dev` fires up local server and watches for changes
* `yarn build` creates a production build