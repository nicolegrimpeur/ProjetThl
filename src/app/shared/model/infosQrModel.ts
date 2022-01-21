import {InfosUserModel} from './infosUserModel';
import {ICertificate} from './certificates';

export interface InfosQrModel {
  user: InfosUserModel;
  certificates: Array<ICertificate>;
}
