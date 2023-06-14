import RentalOrder from "../RentalOreder";

export default interface RentalOrderResponse {
  message: string;
  data: RentalOrder[];
  totalRecord: number;
  status: number;
}