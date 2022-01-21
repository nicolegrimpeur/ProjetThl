export enum CertificateType {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  VACCINE,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TEST,
}

export interface ICertificate {
  email?: string;
  _id: string;
  type: CertificateType;
  date: string;
  metadata: Record<string, string>;
}
