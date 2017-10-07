const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const cookie = require('cookie');

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    template: fs.readFileSync(resolve('./src/index.html'), 'utf-8'),
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    basedir: resolve('./dist'),
    runInNewContext: 'once'
  }))
}

const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const renderer = createRenderer(bundle, {
  clientManifest
})

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && 1000 * 60 * 60 * 24 * 30
})

const app = express()
app.use(compression({ threshold: 0 }))
app.use(favicon('./public/favicon.png'))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/service-worker.js', serve('./dist/service-worker.js'))
app.disable('x-powered-by');

app.post('/__log', (req, res) => {
  const arr = [];
  req.on('data', buff => {
    arr.push(buff);
  });
  req.on('end', () => {
    const log = JSON.parse(arr.join());
    if (log.err) {
      console.error(log);
    } else {
      console.log(log);
    }
    res.end();
  });
});


app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  const context = {
    title: 'Loading', // default title
    url: req.url,
    cookie: req.headers.cookie, // cookies 给应用
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.url) {
        res.redirect(err.url);
      } else if(err.code === 404) {
        res.status(404).send('404 | Page Not Found');
      } else {
        // Render Error Page or Redirect
        res.status(500).send('500 | Internal Server Error');
        console.error(`error during render : ${req.url}`);
        console.error(err.stack);
      }
    } else {
      if (context.httpStatus) res.status(context.httpStatus);
      res.send(html);
    }
  })
});

const port = process.env.PORT || 9999
app.listen(port, () => {
  console.log(`> server started at localhost:${port}\n`)
})


