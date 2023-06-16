import axios from "axios";
import _CONFIG from "@/configs/_var";
import VehicleImageResponse from "@/interfaces/response/vehicle-image-response.model";
// import Stores from "@/interfaces/Stores";

class StoresService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object): Promise<VehicleImageResponse> {
    const response = await axios.get(
      `${_CONFIG.API_URL}/func/get-vehicles-img-list`,
      {
        params: dataParam,
      }
    );
    return response as VehicleImageResponse;
  }

  //   /**
  //    * データ情報を取得する
  //    * @param dataParam データを取得する条件です
  //    */
  //   async get(dataParam: object): Promise<Stores> {
  //     const response = await axios.get(`${_CONFIG.API_URL}/func/get-maker-info`, {
  //       params: dataParam,
  //     });
  //     return response.data as Stores;
  //   }

  /**
   * データを追加
   * @param dataParam データを取得する条件です
   */
  async add(dataParam: object): Promise<VehicleImageResponse> {
    const response = await axios
      .post(`${_CONFIG.API_URL}/func/add-vehicles-img`, dataParam)
      .then((response) => response)
      .catch((error) => error.response);
    return response as VehicleImageResponse;
  }

  /**
   * データ更新
   * @param dataParam データを取得する条件です
   */
  async update(dataParam: object): Promise<VehicleImageResponse> {
    const response = await axios
      .put(`${_CONFIG.API_URL}/func/update-vehicles-img`, dataParam)
      .then((response) => response)
      .catch((error) => error.response);
    return response as VehicleImageResponse;
  }

  /**
   * データを削除する
   * @param dataParam データを取得する条件です
   */
  async delete(dataParam: object): Promise<VehicleImageResponse> {
    const response = await axios
      .delete(`${_CONFIG.API_URL}/func/delete-vehicles-img`, {
        params: dataParam,
      })
      .then((response) => response)
      .catch((error) => {
        return error.response;
      });
    return response as VehicleImageResponse;
  }
}

export default new StoresService();
