import axios from "axios";
import _CONFIG from "@/configs/_var";
import VehiclesResponse from "@/interfaces/response/vehicles-response.model";
// import vehicles from "@/interfaces/vehicles";

class VehiclesService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object): Promise<VehiclesResponse> {
    const response = await axios.get(
      `${_CONFIG.API_URL}/func/get-vehicles-list`,
      {
        params: dataParam,
      }
    );
    return response as VehiclesResponse;
  }

  //   /**
  //    * データ情報を取得する
  //    * @param dataParam データを取得する条件です
  //    */
  //   async get(dataParam: object): Promise<vehicles> {
  //     const response = await axios.get(`${_CONFIG.API_URL}/func/get-maker-info`, {
  //       params: dataParam,
  //     });
  //     return response.data as vehicles;
  //   }

  /**
   * データを追加
   * @param dataParam データを取得する条件です
   */
  async add(dataParam: object): Promise<VehiclesResponse> {
    const response = await axios
      .post(`${_CONFIG.API_URL}/func/add-vehicles`, dataParam)
      .then((response) => response)
      .catch((error) => error.response);
    return response as VehiclesResponse;
  }

  /**
   * データ更新
   * @param dataParam データを取得する条件です
   */
  async update(dataParam: object): Promise<VehiclesResponse> {
    const response = await axios
      .put(`${_CONFIG.API_URL}/func/update-vehicles`, dataParam)
      .then((response) => response)
      .catch((error) => error.response);
    return response as VehiclesResponse;
  }

  /**
   * データを削除する
   * @param dataParam データを取得する条件です
   */
  async delete(dataParam: object): Promise<VehiclesResponse> {
    const response = await axios
      .delete(`${_CONFIG.API_URL}/func/delete-vehicles`, { params: dataParam })
      .then((response) => response)
      .catch((error) => {
        return error.response;
      });
    return response as VehiclesResponse;
  }

  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getById(dataParam?: object): Promise<VehiclesResponse> {
    const response = await axios.get(
      `${_CONFIG.API_URL}/func/get-vehicles-by-id`,
      {
        params: dataParam,
      }
    );
    return response as VehiclesResponse;
  }
}

export default new VehiclesService();
