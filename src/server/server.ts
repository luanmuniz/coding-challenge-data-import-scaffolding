
import express from 'express';
import { Vessel } from './models';
import { importVesselsIntoLocalDatabase, safeImportAllSchedules } from './import-service';
var path = require('path');

const app = express()
const port = 3000


const staticPath = path.resolve(__dirname, '..', '..', 'dist', 'front-end', 'public')
console.log('Serving sttaic files at ',staticPath)
app.use(express.static(staticPath));
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`)
  await importVesselsIntoLocalDatabase()
})

app.post('/api/import', async (req, res) => {
  safeImportAllSchedules()
    .then(() => {
      res.send({status:'ok'})
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({status:'ko', message: err.message})
    })
})

app.get('/api/vessels', async (req, res) => {
  const vessels = await Vessel.findAll()
  res.send(vessels || [])
})

app.get('/api/vessel-schedule/:vesselImo', async (req, res) => {
  // TODO: you need to implement this
  res.send([])
})

app.get('/api/port-call-history/:portCallId', async (req, res) => {
  // TODO: you need to implement this
  res.send([])
})