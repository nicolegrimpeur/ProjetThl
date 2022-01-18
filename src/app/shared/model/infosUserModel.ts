import {TestModel} from './testModel';
import {VaccineModel} from './vaccineModel';

export class InfosUserModel {
  token: string;
  name: string;
  surname: string;
  birthday: Date;
  mail: string;
  category: number;
  vaccine: VaccineModel;
  tests_result: TestModel;
  medical_id: string;
}
