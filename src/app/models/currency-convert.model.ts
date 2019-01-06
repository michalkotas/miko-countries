import {BaseModel} from './base.model';

export class CurrencyConvertModel extends BaseModel {
  from: string;
  to: string;
  from_amount: number;
  to_amount: number;
  error?: string;

  constructor(data?) {
    super(data);
  }
}
