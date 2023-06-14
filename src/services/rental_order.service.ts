import CONST from '@/services/_constant'
import RentalOrderResponse from '@/interfaces/response/rental-order.model';
import apiClient from './api.service'
import { log } from 'console';


class RentalOrderService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAllRentalOrder(dataParam?: object ): Promise<RentalOrderResponse> {
    return await apiClient
      .get(CONST.API.RENTAL_ORDER.LIST, { params: dataParam})
      .then(async (response:any) => {
        return await response.data as RentalOrderResponse
      })
      .catch(async (response:any) => {return response.response});
  }

   async addRentalOrder(dataParam?: object ): Promise<RentalOrderResponse> {
    return await apiClient
      .post(CONST.API.RENTAL_ORDER.CREATE, { params: dataParam})
      .then(async (response:any) => {
        return await response.data as RentalOrderResponse
      })
      .catch(async (response:any) => {return response.response});
  }

}

export default new RentalOrderService();
