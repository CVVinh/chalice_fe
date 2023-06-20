import CONST from "@/services/_constant";
import OptionResponse from "@/interfaces/response/option-response.model";
import apiClient from "./api.service";

class OptionService {
  async getAllOptions(dataParam?: object): Promise<OptionResponse> {
    return await apiClient
      .post(CONST.API.OPTION.LIST, { params: dataParam })
      .then((response: any) => {
        return response.data as OptionResponse;
      })
      .catch((error: any) => error.response);
  }

  async getOptionInfo(id: number): Promise<OptionResponse> {
    return await apiClient
      .get(CONST.API.OPTION.DETAIL(id))
      .then((response: any) => {
        return response.data as OptionResponse;
      })
      .catch((error: any) => error.response);
  }

  async addOption(dataParam: object): Promise<OptionResponse> {
    return await apiClient
      .post(CONST.API.OPTION.CREATE, { params: dataParam })
      .then((response: any) => {
        return response.data as OptionResponse;
      })
      .catch((error: any) => error.response);
  }

  async addMultiOption(dataParam: object): Promise<OptionResponse> {
    return await apiClient
      .post(CONST.API.OPTION.CREATE_MULTI, { params: dataParam })
      .then((response: any) => {
        return response.data as OptionResponse;
      })
      .catch((error: any) => error.response);
  }

  async updateOption(dataParam: object): Promise<OptionResponse> {
    return await apiClient
      .put(CONST.API.OPTION.UPDATE, { params: dataParam })
      .then((response: any) => {
        return response.data as OptionResponse;
      })
      .catch((error: any) => error.response);
  }

  async deleteOption(id: number): Promise<OptionResponse> {
    return await apiClient
      .delete(CONST.API.OPTION.DELETE(id))
      .then((response: any) => {
        return response.data as OptionResponse;
      })
      .catch((error: any) => error.response);
  }

  async deleteMultiOption(dataParam: object): Promise<OptionResponse> {
    return await apiClient
      .post(CONST.API.OPTION.DELETE_MULTI, { params: dataParam })
      .then((response: any) => {
        return response.data as OptionResponse;
      })
      .catch((error: any) => error.response);
  }

  async exportOptions(dataParam?: object): Promise<OptionResponse> {
    return await apiClient
      .post(CONST.API.OPTION.EXPORT, { params: dataParam })
      .then((response: any) => {
        return response.data as OptionResponse;
      })
      .catch((error: any) => error.response);
  }
}
export default new OptionService();
