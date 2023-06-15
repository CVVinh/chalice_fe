import RentalOrder from "../RentalOrder";

export default interface RentalOrderResponse {
  message: string;
  data: RentalOrder[];
  totalRecord: number;
  status: number;
}