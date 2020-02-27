
import express from 'express';
var path = require('path');

const app = express()
const port = 3000


const staticPath = path.resolve(__dirname, '..', '..', 'dist', 'front-end', 'public')
console.log('Serving sttaic files at ',staticPath)
app.use(express.static(staticPath));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))