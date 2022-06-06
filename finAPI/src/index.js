const express = require('express')
const port = 3000
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

const customers = []

// Middleware

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers
  const customer = customers.find((customer) => customer.cpf === cpf)
  if (!customer) {
    return res
      .status(400)
      .json({ error: 'Customer not found' })
  }
  req.customer = customer
  return next()

}


app.post('/account', verifyIfExistsAccountCPF, (req, res) => {
  const { cpf, name } = req.body
  const customerAlreadyExists = customers.some((custumer) => custumer.cpf === cpf)

  if (customerAlreadyExists) {
    return res
      .status(400)
      .json({ error: "Costumer already exists" })
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })

  return res
    .status(201)
    .send()
})

app.get('/statement', verifyIfExistsAccountCPF, (req, res) => {

  const { customer } = req
  return res
    .status(200)
    .json(customer.statement)
})

app.post('/deposit', verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = request.body

  const { customer } = req

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }
  customer.statement.push(statementOperation)
  return res
    .status(201)
    .send()
})


app.listen(port, () => {
  console.log(`Listening app on port ${port}`)
})