import Options from "../Options";

export default interface OptionsResponse {
  message: string;
  mstOptions: Options[];
  total: number;
  status: number;
}
