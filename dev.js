const fs = require('fs');
const os = require('os');
const path = require('path');
const opn = require('opn');
const express = require('express');
const favicon = require('serve-favicon');
const proxy = require('express-http-proxy');
const { createBundleRenderer } = require('vue-server-renderer');

const { PROXY = 'http://127.0.0.1:8000', PORT = 9999 } = process.env;

const resolve = file => path.resolve(__dirname, file);
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;


console.warn(`> compile, please wait.\n`);

const app = express();
app.use(favicon('./public/favicon.png'));
app.use('/dist', express.static(resolve('./dist'), 0));
app.use('/public', express.static(resolve('./public'), 0));

let renderer;
const readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
  renderer = createBundleRenderer(bundle, Object.assign(options, {
    template: fs.readFileSync(resolve('./src/index.html'), 'utf-8'),
    basedir: resolve('./dist'),
    runInNewContext: 'once'
  }))
}).then(() => {
  app.listen(PORT, () => {
    function getLocalIps(flagIpv6) {
      const ifaces = os.networkInterfaces();
      const ips = [];
      const func = function(details) {
        if (!flagIpv6 && details.family === 'IPv6') {
          return;
        }
        ips.push(details.address);
      };
      for (const dev in ifaces) {
        ifaces[dev].forEach(func);
      }
      return ips;
    };
    const ips = getLocalIps();
    ips.unshift('localhost');
    ips.forEach(function(ip) {
      console.log(`> Listening at http://${ip}:${PORT}\n`);
    })
    opn('http://localhost:' + PORT);
  })
})

app.use('/api/', proxy(PROXY, {
  proxyReqPathResolver: (req) => {
    return req.originalUrl;
  },
  timeout: 5000,
  limit: '10mb'
}));

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
  readyPromise.then(() => {
    const s = Date.now();
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Server", serverInfo);
    const context = {
      title: 'Loading', // default title
      url: req.url,
      cookie: req.headers.cookie, // cookies 给应用
    };
    renderer.renderToString(context, (err, html) => {
      if (err) {
        if (err.url) {
          res.redirect(err.url);
          res.end();
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
        console.log(`whole request: ${Date.now() - s}ms`);
      }
    })
  }).catch((err) => {
    res.end();
  })
})

