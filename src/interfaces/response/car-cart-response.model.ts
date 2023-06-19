import ArrivalInfo from "../AccountInfo";
import Vehicles from "../Vehicles";
import Options from "../Options";
import Insurances from "../Insurances";
import CarCart from "../CarCart";

export default interface CarCartCustomer {
  account?: ArrivalInfo;
  vehical?: Vehicles;
  options?: Options[];
  insurances?: Insurances[];
}

export default interface CarCartCustomerResponse {
  message: string;
  mstRenOrdCart: CarCartCustomer[];
  total: number;
  status: number;
}

export default interface CarCartModelResponse {
  message: string;
  mstRenOrdCartModel: CarCart[];
  total: number;
  status: number;
}
