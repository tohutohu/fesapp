const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('booth.json')
const chatData = {}
const middlewares = jsonServer.defaults({static: 'doc'})
 
server.use(middlewares)

server.use(jsonServer.bodyParser)
server.get('/chat/:device/:id', (req, res, next) => {
  const device = req.params.device
  const id = req.params.id
  if (!chatData[device]) {
    chatData[device] = {}
  }
  if (!chatData[device][id]) {
    chatData[device][id] = []
  }
  res.json(chatData[device][id])
})
server.post('/chat/:device/:id', (req, res, next) => {
  const device = req.params.device
  const id = req.params.id
  if (!chatData[device]) {
    chatData[device] = {}
  }
  if (!chatData[device][id]) {
    chatData[device][id] = []
  }
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
    req.body.you = true
    const r = Math.floor(Math.random() * 5000)
    setTimeout(() => {
      chatData[device][id].push({
        you: false,
        text: 'poyopoyo',
        createdAt: Date.now() + r,
      })
    }, r)
  }
  chatData[device][id].push(req.body)
  res.sendStatus(201)
})

server.use((req, res, next) => {
  if (req.method !== 'GET') {
    res.sendStatus(405)
    return
  }
  next()
})
server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})
