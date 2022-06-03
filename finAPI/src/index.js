const { response } = require('express')
const express = require('express')
const port = 3000
const app = express()


app.get('/', (req, res) => {
  return res.json()
})

app.post('/', (req, res) => {
  return res.json()
})

app.put('//:id', (req, res) => {
  return res.json()
})
app.patch('//:id', (req, res) => {
  return res.json()
})

app.delete('//:id', (req, res) => {
  return res.json()
})




app.listen(port, () => {
  console.log(`Listening app on port ${port}`)
})