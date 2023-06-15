import ArrivalInfo from "../AccountInfo";
import Vehicles from "../Vehicles";
import Option from "../Option";
import Insurance from "../Insurance";
import RentalOrderCart from "../RentalOrderCart";

export default interface RentalOrderCartCustomer {
  account?: ArrivalInfo;
  vehical?: Vehicles;
  options?: Option[];
  insurances?: Insurance[];
}

export default interface RentalOrderCartCustomerResponse {
  message: string;
  mstRenOrdCart: RentalOrderCartCustomer[];
  total: number;
  stasus: number;
}

export default interface RentalOrderCartModelResponse {
  message: string;
  mstRenOrdCartModel: RentalOrderCart[];
  total: number;
  stasus: number;
}
