export enum UserRoles {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  USER,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  HEALTHCARE,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ADMIN
}

export interface InfosUserModel {
  _id: string;
  name: string;
  surname: string;
  birthdate: string;
  email: string;
  category: UserRoles;
}

export interface ILoginResponse {
  user: InfosUserModel;
  token: string;
}

export type IRegisterResponse = ILoginResponse;
