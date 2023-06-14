import Stores from "../Stores";

export default interface StoresResponse {
  data: {
    message: string;
    stores_list: Stores[];
    totalRecords: number;
    status: number;
  };
  status: number;
}
