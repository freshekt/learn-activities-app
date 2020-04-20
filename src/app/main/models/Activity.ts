import { IBaseModel } from '../../shared/database/models/IBaseModel';

export class Activity implements IBaseModel<string> {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  userId: string;
}
