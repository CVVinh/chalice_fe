import ArrivalInfo from "../AccountInfo";

export default interface ArrivalResponse {
  message: string;
  arrivalList: ArrivalInfo[];
  itemTotal: number;
  stasus: number;
}
