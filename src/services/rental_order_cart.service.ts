import CONST from '@/services/_constant'
import RentalOrderCartCustomerResponse from '@/interfaces/response/retal-order-cart-response.model';
import RentalOrderCartModelResponse from '@/interfaces/response/retal-order-cart-response.model';
import PaymentMethods from '@/interfaces/PaymentMethods';
import apiClient from './api.service'


class RentalOrderCartService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAllRentalOrderCart(dataParam?: object): Promise<RentalOrderCartCustomerResponse> {
    return await apiClient
      .post(CONST.API.RENTAL_ORDER_CART.LIST, { params: dataParam})
      .then((response) => {
        return response.data as RentalOrderCartCustomerResponse
      })
      .catch((error) => error.response);
  }

  async getRentalOrderCartInfo(dataParam?: object): Promise<RentalOrderCartModelResponse> {
    return await apiClient
      .post(CONST.API.RENTAL_ORDER_CART.DETAIL, { params: dataParam})
      .then((response) => {
        return response.data as RentalOrderCartModelResponse
      })
      .catch((error) => error.response);
  }

  async addRentalOrderCart(dataParam: object): Promise<RentalOrderCartCustomerResponse> {
    return await apiClient
      .post(CONST.API.RENTAL_ORDER_CART.CREATE, { params: dataParam})
      .then((response) => {
        return response.data as RentalOrderCartCustomerResponse
      })
      .catch((error) => error.response);
  }

  async updateRentalOrderCart(dataParam: object): Promise<RentalOrderCartCustomerResponse> {
    return await apiClient
      .put(CONST.API.RENTAL_ORDER_CART.UPDATE, { params: dataParam})
      .then((response) => {
        return response.data as RentalOrderCartCustomerResponse
      })
      .catch((error) => error.response);
  }

  async deleteSoftRentalOrderCart(id: number): Promise<RentalOrderCartCustomerResponse> {
    return await apiClient
      .delete(CONST.API.RENTAL_ORDER_CART.DELETE_SOFT(id))
      .then((response) => {
        return response.data as RentalOrderCartCustomerResponse
      })
      .catch((error) => error.response);
  }

  async deleteHardRentalOrderCart(id: number): Promise<RentalOrderCartCustomerResponse> {
    return await apiClient
      .delete(CONST.API.RENTAL_ORDER_CART.DELETE_HARD(id))
      .then((response) => {
        return response.data as RentalOrderCartCustomerResponse
      })
      .catch((error) => error.response);
  }
  async deleteSoftMultiRentalOrderCart(dataParam: object): Promise<RentalOrderCartCustomerResponse> {
    return await apiClient
      .post(CONST.API.RENTAL_ORDER_CART.DELETE_SOFT_MULTI, { params: dataParam})
      .then((response) => {
        return response.data as RentalOrderCartCustomerResponse
      })
      .catch((error) => error.response);
  }
}

export default new RentalOrderCartService();
