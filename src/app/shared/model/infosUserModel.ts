import {TestModel} from './testModel';
import {VaccineModel} from './vaccineModel';

export interface InfosUserModel {
  token: string;
  name: string;
  surname: string;
  birthday: string;
  mail: string;
  category: number;
  vaccine: VaccineModel;
  tests_result: TestModel;
  medical_id: string;
  uuid: string;
}
