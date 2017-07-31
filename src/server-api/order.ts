import * as express from 'express';
import {readFileSync, writeFileSync} from 'fs';
import {createGUID} from './common/index';
import {join} from 'path';

const filePath = join(__dirname, './data/orders.db.json');

class Order {
  orderID: string = createGUID();
  userID: string;
  sitID: string;
  orderDate: string;
  expireDate: string;
  createdAt: string;
  lastModifiedAt: string;

  static getAllOrders(): Order[] {
    return JSON.parse(readFileSync(filePath).toString());
  }
  static getOrder(id: string): Order {
    return this.getAllOrders().find(o => o.orderID === id);
  }
}

export const OrderRouter = express.Router();

OrderRouter.get('/order-list', (req, res) => {
  res.json(Order.getAllOrders());
});

OrderRouter.get('/:id', (req, res) => {
  res.json(Order.getOrder(req.params.id));
});