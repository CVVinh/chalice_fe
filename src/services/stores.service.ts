import axios from "axios";
import _CONFIG from "@/configs/_var";
import StoresResponse from "@/interfaces/response/stores-response.model";
// import Stores from "@/interfaces/Stores";

class StoresService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object): Promise<StoresResponse> {
    const response = await axios.get(
      `${_CONFIG.API_URL}/func/get-stores-list`,
      {
        params: dataParam,
      }
    );
    return response as StoresResponse;
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
  async add(dataParam: object): Promise<StoresResponse> {
    const response = await axios
      .post(`${_CONFIG.API_URL}/func/add-stores`, dataParam)
      .then((response) => response)
      .catch((error) => error.response);
    return response as StoresResponse;
  }

  /**
   * データ更新
   * @param dataParam データを取得する条件です
   */
  async update(dataParam: object): Promise<StoresResponse> {
    const response = await axios
      .put(`${_CONFIG.API_URL}/func/update-stores`, dataParam)
      .then((response) => response)
      .catch((error) => error.response);
    return response as StoresResponse;
  }

  /**
   * データを削除する
   * @param dataParam データを取得する条件です
   */
  async delete(dataParam: object): Promise<StoresResponse> {
    const response = await axios
      .delete(`${_CONFIG.API_URL}/func/delete-stores`, { params: dataParam })
      .then((response) => response)
      .catch((error) => {
        return error.response;
      });
    return response as StoresResponse;
  }
}

export default new StoresService();
