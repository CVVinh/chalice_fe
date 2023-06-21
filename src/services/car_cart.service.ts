import CONST from "@/services/_constant";
import CarCartModelResponse from "@/interfaces/response/car-cart-response.model";
import apiClient from "./api.service";

class CarCartService {
  async getAllCarCart(dataParam?: object): Promise<CarCartModelResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.LIST, { params: dataParam })
      .then((response: any) => {
        return response.data as CarCartModelResponse;
      })
      .catch((error: any) => error.response);
  }

  async getCarCartInfo(dataParam?: object): Promise<CarCartModelResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.DETAIL, { params: dataParam })
      .then((response: any) => {
        return response.data as CarCartModelResponse;
      })
      .catch((error: any) => error.response);
  }

  async addCarCart(dataParam: object): Promise<CarCartModelResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.CREATE, { params: dataParam })
      .then((response: any) => {
        return response.data as CarCartModelResponse;
      })
      .catch((error: any) => error.response);
  }

  async addMultiCarCart(dataParam: object): Promise<CarCartModelResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.CREATE_MULTI, { params: dataParam })
      .then((response: any) => {
        return response.data as CarCartModelResponse;
      })
      .catch((error: any) => error.response);
  }

  async updateCarCart(dataParam: object): Promise<CarCartModelResponse> {
    return await apiClient
      .put(CONST.API.CAR_CART.UPDATE, { params: dataParam })
      .then((response: any) => {
        return response.data as CarCartModelResponse;
      })
      .catch((error: any) => error.response);
  }

  async deleteSoftCarCart(id: number): Promise<CarCartModelResponse> {
    return await apiClient
      .delete(CONST.API.CAR_CART.DELETE_SOFT(id))
      .then((response: any) => {
        return response.data as CarCartModelResponse;
      })
      .catch((error: any) => error.response);
  }

  async deleteHardCarCart(id: number): Promise<CarCartModelResponse> {
    return await apiClient
      .delete(CONST.API.CAR_CART.DELETE_HARD(id))
      .then((response: any) => {
        return response.data as CarCartModelResponse;
      })
      .catch((error: any) => error.response);
  }
  async deleteSoftMultiCarCart(
    dataParam: object
  ): Promise<CarCartModelResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.DELETE_SOFT_MULTI, { params: dataParam })
      .then((response: any) => {
        return response.data as CarCartModelResponse;
      })
      .catch((error: any) => error.response);
  }
  async getCarCart(dataParam?: object): Promise<CarCartModelResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.CAR_CART_DETAIL, { params: dataParam })
      .then((response: any) => {
        return response.data as CarCartModelResponse;
      })
      .catch((error: any) => error.response);
  }
}

export default new CarCartService();
