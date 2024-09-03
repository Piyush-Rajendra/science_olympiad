// server.js
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './app' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom route for '/about'
  server.get('/create-tournament', (req, res) => {
    return app.render(req, res, '/create-tournament', req.query);
  });

  // Custom route for '/post/:id'
  /*server.get('/post/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { id: req.params.id };
    return app.render(req, res, actualPage, queryParams);
  });*/

  // Default catch-all route handler
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
