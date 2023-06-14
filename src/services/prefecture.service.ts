import axios from "axios";
import _CONFIG from "@/configs/_var";
import PrefectureResponse from "@/interfaces/response/prefecture-response.model";
import Prefecture from "@/interfaces/Prefecture";
import { error } from "console";

class PrefectureService {
  /**
   * データ取得都道府県
   */
  async getAll(): Promise<Prefecture[]> {
    const response = await axios.get(
      `${_CONFIG.API_URL}/func/get-prefecture-list`
    );
    return (response.data as PrefectureResponse).mstPrefecture;
  }

  /**
   * データを追加
   *  @param dataParam データを取得する条件です
  */
  async add(dataParam: object): Promise <PrefectureResponse> {
    const response = await axios.post(`${_CONFIG.API_URL}/func/add-prefecture`, dataParam)
      .then(response => response)
      .catch(error => error.response);
    return response as PrefectureResponse;
  }

  /**
   * データ更新
   * @param dataParam データを取得する条件です
   */
  async update(dataParam: object): Promise<PrefectureResponse> {
    const response = await axios.put(`${_CONFIG.API_URL}/func/update-prefecture`, dataParam)
      .then(response => response)
      .catch(error => error.response);
    return response as PrefectureResponse;
  }

  /**
   * データを削除する
   * @param dataParam データを取得する条件です
   */
  async delete(dataParam: object): Promise<PrefectureResponse> {
    const response = await axios.delete(`${_CONFIG.API_URL}/func/delete-prefecture`, { params: dataParam })
      .then(response => response)
      .catch(error => {
        return error.response
      });
    return response as PrefectureResponse;
  }
}
export default new PrefectureService();
