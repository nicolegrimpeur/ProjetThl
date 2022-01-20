import {TestModel} from './testModel';
import {VaccineModel} from './vaccineModel';

export interface InfosQrModel {
  token: string;
  name: string;
  surname: string;
  birthday: Date;
  category: number;
  vaccine: Array<VaccineModel>;
  tests_results: Array<TestModel>;
  medical_id: string;
}
