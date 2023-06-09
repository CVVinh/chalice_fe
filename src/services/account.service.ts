import apiClient from './api.service'
import CONST from '@/services/_constant'
import axios from "axios";
import _CONFIG from "@/configs/_var";

import AccountResponse from "@/interfaces/response/account-response.model";

const accountService = {
  async getList(params?: Object): Promise<AccountResponse> {
    return await apiClient
      .get(CONST.API.ACCOUNT.LIST, { params })
      .then((response) => {
        return response.data as AccountResponse
      })
  },
}

export default accountService
