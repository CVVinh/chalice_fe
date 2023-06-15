import CONST from '@/services/_constant'
import PaymentMethodsResponse from '@/interfaces/response/payment-method-response.model';
import PaymentMethods from '@/interfaces/PaymentMethods';
import apiClient from './api.service'


class PaymentMethodsService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAllPaymentMethod(dataParam?: object ): Promise<PaymentMethodsResponse> {
    return await apiClient
      .get(CONST.API.PAYMENT_METHOD.LIST, { params: dataParam})
      .then((response) => {
        return response.data as PaymentMethodsResponse
      })
      .catch((error) => error.response);
  }

  async getPaymentMethodInfo(id: number): Promise<PaymentMethodsResponse> {
    return await apiClient
      .get(CONST.API.PAYMENT_METHOD.DETAIL(id))
      .then((response) => {
        return response.data as PaymentMethodsResponse
      })
      .catch((error) => error.response);
  }

  async addPaymentMethod(dataParam: object): Promise<PaymentMethodsResponse> {
    return await apiClient
      .post(CONST.API.PAYMENT_METHOD.CREATE, { params: dataParam})
      .then((response) => {
        return response.data as PaymentMethodsResponse
      })
      .catch((error) => error.response);
  }

  async updatePaymentMethod(id: number, dataParam: object): Promise<PaymentMethodsResponse> {
    return await apiClient
      .put(CONST.API.PAYMENT_METHOD.UPDATE(id), { params: dataParam})
      .then((response) => {
        return response.data as PaymentMethodsResponse
      })
      .catch((error) => error.response);
  }

  async deletePaymentMethod(id: number): Promise<PaymentMethodsResponse> {
    return await apiClient
      .put(CONST.API.PAYMENT_METHOD.DELETE(id))
      .then((response) => {
        return response.data as PaymentMethodsResponse
      })
      .catch((error) => error.response);
  }

}

export default new PaymentMethodsService();
