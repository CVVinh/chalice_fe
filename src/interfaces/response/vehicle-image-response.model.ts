import VehicleImage from "../Vehicles-image";

export default interface VehicleImageResponse {
  data: {
    message: string;
    vehicle_img_list: VehicleImage[];
    totalRecords: number;
    status: number;
  };
  status: number;
}
