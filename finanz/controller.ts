import path from 'path';
import { Request, Response } from 'express';
import HelperService from '../@common/helper.service';

const BALANCE_PATH = path.join(__dirname, './dto/balances.json');
const BALANCE_TYPES_PATH = path.join(__dirname, './dto/balances-types.json');

interface HasId {
  id: number;
}

interface BalanceInt extends HasId {
  balanceTypeId: number;
  price: number;
  isDolar: boolean;
  isInverted: boolean;
  observations: string;
  dateInit?: Date;
  dateFinish?: Date;
  percentageAnnual?: number;
}

interface BalanceTypeInt extends HasId {
  name: string;
  color: string;
  icon: string;
}

interface CardInt {
  balanceTypeId: number;
  name?: string;
  color?: string;
  icon?: string;
  total: number;
  balances: BalanceInt[];
}

const FinanzController = {
  async getDashboard(req: Request, res: Response) {
    try {
      const balances = await HelperService.helperReadFile<BalanceInt>(BALANCE_PATH);
      const balanceTypes = await HelperService.helperReadFile<BalanceTypeInt>(BALANCE_TYPES_PATH);

      // Map para acceso rápido por id
      const balanceTypeMap = new Map(
        balanceTypes.map(type => [type.id, type])
      );

      const cardsMap = new Map<number, CardInt>();

      for (const balance of balances) {
        const balanceType = balanceTypeMap.get(balance.balanceTypeId);

        if (!cardsMap.has(balance.balanceTypeId)) {
          cardsMap.set(balance.balanceTypeId, {
            balanceTypeId: balance.balanceTypeId,
            name: balanceType?.name,
            color: balanceType?.color,
            icon: balanceType?.icon,
            total: balance.price,
            balances: [balance],
          });
        } else {
          const card = cardsMap.get(balance.balanceTypeId)!;
          card.balances.push(balance);
          card.total += balance.price;
        }
      }

      res.json([...cardsMap.values()]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el dashboard financiero' });
    }
  },
};

export default FinanzController;
