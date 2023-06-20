import CONST from "@/services/_constant";
import InsuranceResponse from "@/interfaces/response/insurance-response.model";
import apiClient from "./api.service";

class InsuranceService {
  async getAllInsurance(dataParam?: object): Promise<InsuranceResponse> {
    return await apiClient
      .post(CONST.API.INSURANCE.LIST, { params: dataParam })
      .then((response: any) => {
        return response.data as InsuranceResponse;
      })
      .catch((error: any) => error.response);
  }

  async getInsuranceInfo(id: number): Promise<InsuranceResponse> {
    return await apiClient
      .get(CONST.API.INSURANCE.DETAIL(id))
      .then((response: any) => {
        return response.data as InsuranceResponse;
      })
      .catch((error: any) => error.response);
  }

  async addInsurance(dataParam: object): Promise<InsuranceResponse> {
    return await apiClient
      .post(CONST.API.INSURANCE.CREATE, { params: dataParam })
      .then((response: any) => {
        return response.data as InsuranceResponse;
      })
      .catch((error: any) => error.response);
  }

  async addMultiInsurance(dataParam: object): Promise<InsuranceResponse> {
    return await apiClient
      .post(CONST.API.INSURANCE.CREATE_MULTI, { params: dataParam })
      .then((response: any) => {
        return response.data as InsuranceResponse;
      })
      .catch((error: any) => error.response);
  }

  async updateInsurance(dataParam: object): Promise<InsuranceResponse> {
    return await apiClient
      .put(CONST.API.INSURANCE.UPDATE, { params: dataParam })
      .then((response: any) => {
        return response.data as InsuranceResponse;
      })
      .catch((error: any) => error.response);
  }

  async deleteInsurance(id: number): Promise<InsuranceResponse> {
    return await apiClient
      .delete(CONST.API.INSURANCE.DELETE(id))
      .then((response: any) => {
        return response.data as InsuranceResponse;
      })
      .catch((error: any) => error.response);
  }

  async deleteMultiInsurance(dataParam: object): Promise<InsuranceResponse> {
    return await apiClient
      .post(CONST.API.INSURANCE.DELETE_MULTI, { params: dataParam })
      .then((response: any) => {
        return response.data as InsuranceResponse;
      })
      .catch((error: any) => error.response);
  }
}
export default new InsuranceService();
