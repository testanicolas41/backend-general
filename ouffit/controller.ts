import fs from 'fs/promises';
import path from 'path';
import { Request, Response } from 'express';

const PANT_PATH = path.join(__dirname, './dto/pants.dto.json');
const SHIRT_PATH = path.join(__dirname, './dto/shirts.dto.json');

interface HasId {
  id: number;
}

interface PantInt extends HasId {
  name: string
  shirtMatch: Array<number>
  uses: number
}

interface ShirtInt extends HasId {
  id: number
  name: string
  uses: number
}
 
// Helper function

async function helperReadFile<T extends HasId>(path: string): Promise<T[]> {
    const response = await fs.readFile(path, {encoding: 'utf-8'});
    if (!response) throw new Error(`No tiene contenido`);
    return JSON.parse(response)
}

async function helperGetById<T extends HasId>(path: string, id: number): Promise<T> {
    const array = await helperReadFile<T>(path);
    const element = array.find(array => array.id = id);
    if (!element) throw new Error(`No se encontro el objeto con id ${id}`);
    return element;
}

async function helperWriteFile<T>(path: string, idToUpdate: number, newData: T) {
    const array = await helperReadFile(path);
    const index = array.findIndex(item => item.id == idToUpdate);
    if (index == -1) throw new Error(`No se encontro el objeto con id ${idToUpdate}`);
    array[index] = { ...array[index], ...newData }
    await fs.writeFile(path, JSON.stringify(array, null, 2))
}

const OuffitController = {

    async armOuffit(req: Request, res: Response) {
      try {
        const pants = await helperReadFile<PantInt>(PANT_PATH);
        const pant = pants[Math.floor(Math.random() * pants.length)];
        
        const shirtId = pant.shirtMatch[Math.floor(Math.random() * pant.shirtMatch.length)];
        const shirt = await helperGetById<ShirtInt>(SHIRT_PATH, shirtId);

        res.json({ pant, shirt });
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
    },
    async getAllPants(req: Request, res: Response) {
      try {
        const pants = await helperReadFile<PantInt>(PANT_PATH);
        res.json(pants);    
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
    },
    async getPantById(req: Request, res: Response) {
      try {
        const { id } = req.params;
        if (typeof id !== 'string') throw new Error(`No tiene params ID`);
        const pant = await helperGetById<PantInt>(PANT_PATH, parseInt(id));
        res.json(pant);    
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
    },
    async updatePant(req: Request, res: Response) {
        try {
          const { id } = req.params;
          if (typeof id !== 'string') throw new Error(`No tiene params ID`);
          const newPant = await helperWriteFile<PantInt>(PANT_PATH, parseInt(id), req.body);
          res.json(newPant);    
        } catch (error) {
          res.status(500).json({ error: String(error) });
        }
    },
    async getAllShirts(req: Request, res: Response) {
      try {
        const shirt = await helperReadFile<ShirtInt>(SHIRT_PATH);
        res.json(shirt);    
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
    },
    async getShirtById(req: Request, res: Response) {
      try {
        const { id } = req.params;
        if (typeof id !== 'string') throw new Error(`No tiene params ID`);
        const shirt = await helperGetById<ShirtInt>(SHIRT_PATH, parseInt(id));
        res.json(shirt);    
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
    },
    async updateShirt(req: Request, res: Response) {
        try {
          const { id } = req.params;
          if (typeof id !== 'string') throw new Error(`No tiene params ID`);
          const newShirt = await helperWriteFile<ShirtInt>(SHIRT_PATH, parseInt(id), req.body);
          res.json(newShirt);    
        } catch (error) {
          res.status(500).json({ error: String(error) });
        }
    }

  };
  
export default OuffitController;
