const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const ouffitRoutes = require('./ouffit/routes');
app.use('/ouffit', ouffitRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));