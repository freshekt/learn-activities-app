import { IBaseModel } from './../../shared/database/models/IBaseModel';
export  class ActivityPlace  implements IBaseModel<string> {
  id: string;
  name: string;
  placeId: string;
  userId: string;
  lat: any;
  lng: any;
  formattedAddress: string;
}
