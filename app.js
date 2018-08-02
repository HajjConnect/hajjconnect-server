const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'hajjconnect'
const colName = 'guide-updates'

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/guide_update/:id', (req, res) => {
  const id = Number(req.params.id)
  const payload = {timestamp: new Date(), ...req.body}
  console.log(payload)
  MongoClient.connect(url, (err, client) => {
    if (err) res.sendStatus(500)

    const db = client.db(dbName)
    db.collection(colName).updateOne({ _id: id }, { $push: { histoy: payload } }, { upsert: true }, (err, result) => {
      if (err) res.sendStatus(500)
      client.close()
      res.sendStatus(200)
    })
  })

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))