import Makers from "../Makers";

export default interface MakersResponse {
  data: {
    message: string;
    makers_list: Makers[];
    totalRecords: number;
    status: number;
  };
  status: number;
}
