
import express from 'express';
import { Vessel } from './models';
import { importVesselsIntoLocalDatabase, importAll, importSingleVessel } from './import-service';
var path = require('path');

const app = express()
const port = 3000


const staticPath = path.resolve(__dirname, '..', '..', 'dist', 'front-end', 'public')
console.log('Serving sttaic files at ',staticPath)
app.use(express.static(staticPath));
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`)
  await importVesselsIntoLocalDatabase()

  importSingleVessel()
})

app.get('/api/vessels', async (req, res) => {
  const vessels = await Vessel.findAll()
  res.send(vessels || [])
})
