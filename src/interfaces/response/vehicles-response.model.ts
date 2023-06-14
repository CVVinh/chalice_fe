import Vehicles from "../Vehicles";

export default interface VehiclesResponse {
  data: {
    message: string;
    vehicles_list: Vehicles[];
    totalRecords: number;
    status: number;
  };
  status: number;
}
