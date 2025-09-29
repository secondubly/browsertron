import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('/*', cors())

app.use(
  "*",
  serveStatic({
    root: "../web/dist",
  }),
  cors({
    origin: "http://localhost:3000"
  })
);
app.use("/*", serveStatic({ root: "../web/dist", path: "index.html" }));

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
