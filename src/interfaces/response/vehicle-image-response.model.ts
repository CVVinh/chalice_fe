import VehicleImage from "../Vehicle-image";

export default interface VehicleImageResponse {
  data: {
    message: string;
    image_list: VehicleImage[];
    totalRecords: number;
    status: number;
  };
  status: number;
}
