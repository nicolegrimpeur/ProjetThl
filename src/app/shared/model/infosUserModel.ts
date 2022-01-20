import {TestModel} from './testModel';
import {VaccineModel} from './vaccineModel';

export interface InfosUserModel {
  jwtToken: string;
  _id: string;
  name: string;
  surname: string;
  birthday: string;
  mail: string;
  category: number;
  vaccine: Array<VaccineModel>;
  tests_results: Array<TestModel>;
  medical_id: string;
  uuid: string;
}

export interface ILoginResponse {
  user: InfosUserModel;
  token: string;
}
