import Insurances from "../Insurances";

export default interface InsuranceResponse {
  message: string;
  mstIsurances: Insurances[];
  total: number;
  status: number;
}
