import Models from "../Models";

export default interface ModelsResponse {
  data: {
    message: string;
    models_list: Models[];
    totalRecords: number;
    status: number;
  };
  status: number;
}
