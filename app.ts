import express from 'express';
import cors from 'cors';
import ouffitRoutes from './ouffit/routes';
import finanzRoutes from './finanz/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/ouffit', ouffitRoutes);
app.use('/finanz', finanzRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));