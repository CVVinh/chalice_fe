import axios from "axios";
import _CONFIG from "@/configs/_var";
import OptionResponse from "@/interfaces/response/option-response.model";

class OptionService {
  /**
   * データ取得都道府県
   */
  async getAll(dataParam?: object): Promise<OptionResponse> {
    const response = await axios.get(
      `${_CONFIG.API_URL}/func/get-option-list`,
      {
        params: dataParam,
      }
    );
    return response as OptionResponse;
  }
}
export default new OptionService();
