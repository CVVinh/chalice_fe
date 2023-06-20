import CarCart from "../CarCart";
export default interface CarCartModelResponse {
  message: string;
  carCartList: CarCart[];
  total: number;
  status: number;
}
