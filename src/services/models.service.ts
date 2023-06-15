import axios from "axios";
import _CONFIG from "@/configs/_var";
import ModelResponse from "@/interfaces/response/models-response.model";
// import models from "@/interfaces/models";

class ModelService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object): Promise<ModelResponse> {
    const response = await axios.get(
      `${_CONFIG.API_URL}/func/get-models-list`,
      {
        params: dataParam,
      }
    );
    return response as ModelResponse;
  }

  //   /**
  //    * データ情報を取得する
  //    * @param dataParam データを取得する条件です
  //    */
  //   async get(dataParam: object): Promise<models> {
  //     const response = await axios.get(`${_CONFIG.API_URL}/func/get-maker-info`, {
  //       params: dataParam,
  //     });
  //     return response.data as models;
  //   }

  /**
   * データを追加
   * @param dataParam データを取得する条件です
   */
  async add(dataParam: object): Promise<ModelResponse> {
    const response = await axios
      .post(`${_CONFIG.API_URL}/func/add-models`, dataParam)
      .then((response) => response)
      .catch((error) => error.response);
    return response as ModelResponse;
  }

  /**
   * データ更新
   * @param dataParam データを取得する条件です
   */
  async update(dataParam: object): Promise<ModelResponse> {
    const response = await axios
      .put(`${_CONFIG.API_URL}/func/update-models`, dataParam)
      .then((response) => response)
      .catch((error) => error.response);
    return response as ModelResponse;
  }

  /**
   * データを削除する
   * @param dataParam データを取得する条件です
   */
  async delete(dataParam: object): Promise<ModelResponse> {
    const response = await axios
      .delete(`${_CONFIG.API_URL}/func/delete-models`, { params: dataParam })
      .then((response) => response)
      .catch((error) => {
        return error.response;
      });
    return response as ModelResponse;
  }
}

export default new ModelService();
