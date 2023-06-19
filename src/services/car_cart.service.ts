import CONST from "@/services/_constant";
import CarCartCustomerResponse from "@/interfaces/response/car-cart-response.model";
import CarCartModelResponse from "@/interfaces/response/car-cart-response.model";
import PaymentMethods from "@/interfaces/PaymentMethods";
import apiClient from "./api.service";

class CarCartService {
  async getAllCarCart(dataParam?: object): Promise<CarCartCustomerResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.LIST, { params: dataParam })
      .then((response) => {
        return response.data as CarCartCustomerResponse;
      })
      .catch((error) => error.response);
  }

  async getCarCartInfo(dataParam?: object): Promise<CarCartModelResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.DETAIL, { params: dataParam })
      .then((response) => {
        return response.data as CarCartModelResponse;
      })
      .catch((error) => error.response);
  }

  async addCarCart(dataParam: object): Promise<CarCartCustomerResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.CREATE, { params: dataParam })
      .then((response) => {
        return response.data as CarCartCustomerResponse;
      })
      .catch((error) => error.response);
  }

  async addMultiCarCart(dataParam: object): Promise<CarCartCustomerResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.CREATE_MULTI, { params: dataParam })
      .then((response) => {
        return response.data as CarCartCustomerResponse;
      })
      .catch((error) => error.response);
  }

  async updateCarCart(dataParam: object): Promise<CarCartCustomerResponse> {
    return await apiClient
      .put(CONST.API.CAR_CART.UPDATE, { params: dataParam })
      .then((response) => {
        return response.data as CarCartCustomerResponse;
      })
      .catch((error) => error.response);
  }

  async deleteSoftCarCart(id: number): Promise<CarCartCustomerResponse> {
    return await apiClient
      .delete(CONST.API.CAR_CART.DELETE_SOFT(id))
      .then((response) => {
        return response.data as CarCartCustomerResponse;
      })
      .catch((error) => error.response);
  }

  async deleteHardCarCart(id: number): Promise<CarCartCustomerResponse> {
    return await apiClient
      .delete(CONST.API.CAR_CART.DELETE_HARD(id))
      .then((response) => {
        return response.data as CarCartCustomerResponse;
      })
      .catch((error) => error.response);
  }
  async deleteSoftMultiCarCart(
    dataParam: object
  ): Promise<CarCartCustomerResponse> {
    return await apiClient
      .post(CONST.API.CAR_CART.DELETE_SOFT_MULTI, { params: dataParam })
      .then((response) => {
        return response.data as CarCartCustomerResponse;
      })
      .catch((error) => error.response);
  }
}

export default new CarCartService();
