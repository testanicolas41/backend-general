import path from 'path';
import { Request, Response } from 'express';
import HelperService from '../@common/helper.service';

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

const OuffitController = {

  async armOuffit(req: Request, res: Response) {
    try {
      const pants = await HelperService.helperReadFile<PantInt>(PANT_PATH);
      const pant = pants[Math.floor(Math.random() * pants.length)];
      const shirtId = pant.shirtMatch[Math.floor(Math.random() * pant.shirtMatch.length)];
      const shirt = await HelperService.helperGetById<ShirtInt>(SHIRT_PATH, shirtId);

      res.json({ pant, shirt });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  },
  async getAllPants(req: Request, res: Response) {
    try {
      const pants = await HelperService.helperReadFile<PantInt>(PANT_PATH);
      res.json(pants);    
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  },
  async getPantById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (typeof id !== 'string') throw new Error(`No tiene params ID`);
      const pant = await HelperService.helperGetById<PantInt>(PANT_PATH, parseInt(id));
      res.json(pant);    
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  },
  async updatePant(req: Request, res: Response) {
      try {
        const { id } = req.params;
        if (typeof id !== 'string') throw new Error(`No tiene params ID`);
        const newPant = await HelperService.helperWriteFile<PantInt>(PANT_PATH, parseInt(id), req.body);
        res.json(newPant);    
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
  },
  async getAllShirts(req: Request, res: Response) {
    try {
      const shirt = await HelperService.helperReadFile<ShirtInt>(SHIRT_PATH);
      res.json(shirt);    
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  },
  async getShirtById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (typeof id !== 'string') throw new Error(`No tiene params ID`);
      const shirt = await HelperService.helperGetById<ShirtInt>(SHIRT_PATH, parseInt(id));
      res.json(shirt);    
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  },
  async updateShirt(req: Request, res: Response) {
      try {
        const { id } = req.params;
        if (typeof id !== 'string') throw new Error(`No tiene params ID`);
        const newShirt = await HelperService.helperWriteFile<ShirtInt>(SHIRT_PATH, parseInt(id), req.body);
        res.json(newShirt);    
      } catch (error) {
        res.status(500).json({ error: String(error) });
      }
  }

};
  
export default OuffitController;
