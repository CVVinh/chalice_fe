import axios from "axios";
import _CONFIG from "@/configs/_var";
import MakersResponse from "@/interfaces/response/makers-response.model";
// import Makers from "@/interfaces/Makers";

class MarkerService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object): Promise<MakersResponse> {
    const response = await axios.get(
      `${_CONFIG.API_URL}/func/get-makers-list`,
      {
        params: dataParam,
      }
    );
    return response as MakersResponse;
  }

  //   /**
  //    * データ情報を取得する
  //    * @param dataParam データを取得する条件です
  //    */
  //   async get(dataParam: object): Promise<Makers> {
  //     const response = await axios.get(`${_CONFIG.API_URL}/func/get-maker-info`, {
  //       params: dataParam,
  //     });
  //     return response.data as Makers;
  //   }

  /**
   * データを追加
   * @param dataParam データを取得する条件です
   */
  async add(dataParam: object): Promise<MakersResponse> {
    const response = await axios
      .post(`${_CONFIG.API_URL}/func/add-makers`, dataParam)
      .then((response) => response)
      .catch((error) => error.response);
    return response as MakersResponse;
  }

  /**
   * データ更新
   * @param dataParam データを取得する条件です
   */
  async update(dataParam: object): Promise<MakersResponse> {
    const response = await axios
      .put(`${_CONFIG.API_URL}/func/update-makers`, dataParam)
      .then((response) => response)
      .catch((error) => error.response);
    return response as MakersResponse;
  }

  /**
   * データを削除する
   * @param dataParam データを取得する条件です
   */
  async delete(dataParam: object): Promise<MakersResponse> {
    const response = await axios
      .delete(`${_CONFIG.API_URL}/func/delete-makers`, { params: dataParam })
      .then((response) => response)
      .catch((error) => {
        return error.response;
      });
    return response as MakersResponse;
  }
}

export default new MarkerService();
