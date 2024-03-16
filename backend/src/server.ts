import app from './app'

const PORT = process.env.APP_PORT != null || 3001

app.listen(PORT, () => {
  console.log('listening on port:', PORT)
})
