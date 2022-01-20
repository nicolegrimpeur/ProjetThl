import {TestModel} from './testModel';
import {VaccineModel} from './vaccineModel';

export interface InfosQrModel {
  token: string;
  name: string;
  surname: string;
  birthday: Date;
  category: number;
  vaccine: VaccineModel;
  tests_result: TestModel;
  medical_id: string;
}
