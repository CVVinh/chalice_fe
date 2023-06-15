import axios from "axios";
import _CONFIG from "@/configs/_var";
import InsuranceResponse from "@/interfaces/response/insurance-response.model";

class InsuranceService {
  /**
   * データ取得都道府県
   */
  async getAll(dataParam?: object): Promise<InsuranceResponse> {
    const response = await axios.get(
      `${_CONFIG.API_URL}/func/get-isurance-list`,
      {
        params: dataParam,
      }
    );
    return response as InsuranceResponse;
  }
}
export default new InsuranceService();