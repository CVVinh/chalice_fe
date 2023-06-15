import Options from "../Options";

export default interface OptionsResponse {
  data: {
    message: string;
    mstOptions: Options[];
    totalRecords: number;
    status: number;
  };
  status: number;
}
