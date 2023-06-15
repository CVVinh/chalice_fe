import Insurances from "../Insurances";

export default interface InsuranceResponse {
  data: {
    message: string;
    mstIsurances: Insurances[];
    totalRecords: number;
    status: number;
  };
  status: number;
}
