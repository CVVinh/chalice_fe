<template>
  <v-sheet elevation="5">
    <v-card width="100%">
      <v-card-item class="pa-5">
        <v-card-title>
          <span class="text-h4 font-weight-bold">Tổng chi phí thanh toán</span>
        </v-card-title>
      </v-card-item>
      <div v-if="listVehiclesSelected && listVehiclesSelected.length > 0">
        <v-card-text
          class="ml-2 pa-5"
          v-for="item in listVehiclesSelected"
          :key="item"
        >
          <v-sheet class="elevation-5 rounded-xl pa-6">
            <v-row class="text-h4 font-weight-bold mt-5 ml-3 mb-5">
              <v-row>
                <span class="">{{ item.vehical.vehicleName }}</span>
              </v-row>
            </v-row>
            <v-row class="text-h5">
              <v-col class="d-flex justify-space-between mt-1" cols="12">
                <span class="font-weight-bold">Phí thuê xe:</span>
                <span>
                  <p v-if="!isOpen">
                    {{
                      ConvertUtils.convertNumberToVnCurrency(
                        item.vehical.vehicleValue
                      )
                    }}
                  </p>
                  <p v-else>
                    {{
                      infomationCarInCheckOut
                        ? ConvertUtils.convertNumberToVnCurrency(
                            infomationCarInCheckOut.vehicleValue
                          )
                        : ""
                    }}
                  </p>
                  <!-- <small>290.800</small> -->
                </span>
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-2"></v-divider>
            <v-row>
              <v-col class="text-h5 font-weight-bold">Bảo hiểm</v-col>
            </v-row>
            <v-row class="text-h5" v-if="!dataVehicalInCheckOut">
              <v-col
                class="d-flex justify-space-between"
                cols="12"
                v-for="itemInsurance in item.insurances"
                :key="itemInsurance"
              >
                <span class="ml-15">{{ itemInsurance.insuranceName }}:</span>
                <span>
                  <p>
                    {{
                      ConvertUtils.convertNumberToVnCurrency(
                        itemInsurance.insuranceValue
                      )
                    }}
                  </p>
                </span>
              </v-col>
            </v-row>
            <v-row class="text-h5" v-else>
              <v-col
                class="d-flex justify-space-between"
                cols="12"
                v-for="value in dataVehicalInCheckOut[0].insurances"
                :key="value"
              >
                <span class="ml-15">{{ value.insuranceName }}:</span>
                <span>
                  <p>
                    {{
                      ConvertUtils.convertNumberToVnCurrency(
                        value.insuranceValue
                      )
                    }}
                  </p>
                </span>
              </v-col>
            </v-row>
            <v-divider class="mt-5 mb-2"></v-divider>
            <v-row>
              <v-col class="text-h5 font-weight-bold">Các lựa chọn khác</v-col>
            </v-row>
            <v-row class="text-h5" v-if="!dataVehicalInCheckOut">
              <v-col
                class="d-flex justify-space-between"
                cols="12"
                v-for="itemOption in item.options"
                :key="itemOption"
              >
                <span class="ml-15">{{ itemOption.optionName }}:</span>
                <span>
                  <p>
                    {{
                      ConvertUtils.convertNumberToVnCurrency(
                        itemOption.optionValue
                      )
                    }}
                  </p>
                </span>
              </v-col>
            </v-row>
            <v-row class="text-h5" v-else>
              <v-col
                class="d-flex justify-space-between"
                cols="12"
                v-for="value in dataVehicalInCheckOut[0].options"
                :key="value"
              >
                <span class="ml-15">{{ value.optionName }}:</span>
                <span>
                  <p>
                    {{
                      ConvertUtils.convertNumberToVnCurrency(value.optionValue)
                    }}
                  </p>
                </span>
              </v-col>
            </v-row>
            <v-divider class="mt-3"></v-divider>
            <v-row class="text-h5">
              <v-col cols="12" class="mt-3">
                <p class="font-weight-black" v-if="!dataVehicalInCheckOut">
                  Dự chi trong
                  {{
                    FormatDate.calculatorDay(
                      item.rentalOrderCart[0].rentalEndDate,
                      item.rentalOrderCart[0].rentalStartDate
                    )
                  }}
                  ngày:
                  {{
                    FormatDate.formatDateAvoidWarning(
                      new Date(item.rentalOrderCart[0].rentalStartDate)
                    )
                  }}
                  -
                  {{
                    FormatDate.formatDateAvoidWarning(
                      new Date(item.rentalOrderCart[0].rentalEndDate)
                    )
                  }}
                </p>
                <p class="font-weight-black" v-else>
                  Dự chi trong
                  {{
                    FormatDate.calculatorDay(
                      dataVehicalInCheckOut[0].rentalOrderCart[0].rentalEndDate,
                      dataVehicalInCheckOut[0].rentalOrderCart[0]
                        .rentalStartDate
                    )
                  }}
                  ngày:
                  {{
                    FormatDate.formatDateAvoidWarning(
                      new Date(
                        dataVehicalInCheckOut[0].rentalOrderCart[0].rentalStartDate
                      )
                    )
                  }}
                  -
                  {{
                    FormatDate.formatDateAvoidWarning(
                      new Date(
                        dataVehicalInCheckOut[0].rentalOrderCart[0].rentalEndDate
                      )
                    )
                  }}
                </p>
              </v-col>
              <v-col class="d-flex justify-end mt-1" cols="12">
                <p v-if="!dataVehicalInCheckOut">
                  {{
                    ConvertUtils.convertNumberToVnCurrency(
                      filterMoney(item.vehical.vehicleId)
                    )
                  }}
                </p>
                <p v-else>
                  {{
                    ConvertUtils.convertNumberToVnCurrency(totalCostInCheckOut)
                  }}
                </p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
      </div>

      <div
        v-else-if="listVehicleInCheckOut && listVehicleInCheckOut.length > 0"
      >
        <v-card-text
          class="ml-2 pa-5"
          v-for="item in listVehicleInCheckOut"
          :key="item"
        >
          <v-sheet class="elevation-5 rounded-xl pa-6">
            <v-row class="text-h4 font-weight-bold mt-5 ml-3 mb-5">
              <v-row>
                <span class="">{{ item.vehical.vehicleName }}</span>
              </v-row>
            </v-row>
            <v-row class="text-h5">
              <v-col class="d-flex justify-space-between mt-1" cols="12">
                <span class="font-weight-bold">Phí thuê xe:</span>
                <span>
                  <p v-if="!isOpen">
                    {{
                      ConvertUtils.convertNumberToVnCurrency(
                        item.vehical.vehicleValue
                      )
                    }}
                  </p>
                  <p v-else>
                    {{
                      infomationCarInCheckOut
                        ? ConvertUtils.convertNumberToVnCurrency(
                            infomationCarInCheckOut.vehicleValue
                          )
                        : ""
                    }}
                  </p>
                  <!-- <small>290.800</small> -->
                </span>
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-2"></v-divider>
            <v-row>
              <v-col class="text-h5 font-weight-bold">Bảo hiểm</v-col>
            </v-row>
            <v-row class="text-h5" v-if="!dataVehicalInCheckOut">
              <v-col
                class="d-flex justify-space-between"
                cols="12"
                v-for="itemInsurance in item.insurances"
                :key="itemInsurance"
              >
                <span class="ml-15">{{ itemInsurance.insuranceName }}:</span>
                <span>
                  <p>
                    {{
                      ConvertUtils.convertNumberToVnCurrency(
                        itemInsurance.insuranceValue
                      )
                    }}
                  </p>
                </span>
              </v-col>
            </v-row>
            <v-row class="text-h5" v-else>
              <v-col
                class="d-flex justify-space-between"
                cols="12"
                v-for="value in dataVehicalInCheckOut[0].insurances"
                :key="value"
              >
                <span class="ml-15">{{ value.insuranceName }}:</span>
                <span>
                  <p>
                    {{
                      ConvertUtils.convertNumberToVnCurrency(
                        value.insuranceValue
                      )
                    }}
                  </p>
                </span>
              </v-col>
            </v-row>
            <v-divider class="mt-5 mb-2"></v-divider>
            <v-row>
              <v-col class="text-h5 font-weight-bold">Các lựa chọn khác</v-col>
            </v-row>
            <v-row class="text-h5" v-if="!dataVehicalInCheckOut">
              <v-col
                class="d-flex justify-space-between"
                cols="12"
                v-for="itemOption in item.options"
                :key="itemOption"
              >
                <span class="ml-15">{{ itemOption.optionName }}:</span>
                <span>
                  <p>
                    {{
                      ConvertUtils.convertNumberToVnCurrency(
                        itemOption.optionValue
                      )
                    }}
                  </p>
                </span>
              </v-col>
            </v-row>
            <v-row class="text-h5" v-else>
              <v-col
                class="d-flex justify-space-between"
                cols="12"
                v-for="value in dataVehicalInCheckOut[0].options"
                :key="value"
              >
                <span class="ml-15">{{ value.optionName }}:</span>
                <span>
                  <p>
                    {{
                      ConvertUtils.convertNumberToVnCurrency(value.optionValue)
                    }}
                  </p>
                </span>
              </v-col>
            </v-row>
            <v-divider class="mt-3"></v-divider>
            <v-row class="text-h5">
              <v-col cols="12" class="mt-3">
                <p class="font-weight-black" v-if="!dataVehicalInCheckOut">
                  Dự chi trong
                  {{
                    FormatDate.calculatorDay(
                      item.rentalOrderCart[0].rentalEndDate,
                      item.rentalOrderCart[0].rentalStartDate
                    )
                  }}
                  ngày:
                  {{
                    FormatDate.formatDateAvoidWarning(
                      new Date(item.rentalOrderCart[0].rentalStartDate)
                    )
                  }}
                  -
                  {{
                    FormatDate.formatDateAvoidWarning(
                      new Date(item.rentalOrderCart[0].rentalEndDate)
                    )
                  }}
                </p>
                <p class="font-weight-black" v-else>
                  Dự chi trong
                  {{
                    FormatDate.calculatorDay(
                      dataVehicalInCheckOut[0].rentalOrderCart[0].rentalEndDate,
                      dataVehicalInCheckOut[0].rentalOrderCart[0]
                        .rentalStartDate
                    )
                  }}
                  ngày:
                  {{
                    FormatDate.formatDateAvoidWarning(
                      new Date(
                        dataVehicalInCheckOut[0].rentalOrderCart[0].rentalStartDate
                      )
                    )
                  }}
                  -
                  {{
                    FormatDate.formatDateAvoidWarning(
                      new Date(
                        dataVehicalInCheckOut[0].rentalOrderCart[0].rentalEndDate
                      )
                    )
                  }}
                </p>
              </v-col>
              <v-col class="d-flex justify-end mt-3" cols="12">
                <p v-if="!dataVehicalInCheckOut">
                  {{
                    ConvertUtils.convertNumberToVnCurrency(
                      filterMoney(item.vehical.vehicleId)
                    )
                  }}
                </p>
                <p v-else>
                  {{
                    ConvertUtils.convertNumberToVnCurrency(totalCostInCheckOut)
                  }}
                </p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
      </div>

      <v-sheet
        class="elevation-5 rounded-xl ma-6 mt-5 pa-1"
        v-if="listVehiclesSelected && listVehiclesSelected.length > 0"
      >
        <v-row class="text-h5 font-weight-bold mt-5 ml-3 mb-5">
          <v-col>
            <p class="d-flex justify-space-between">
              <span>Tổng phải thanh toán:</span>
              <span class="mr-5">{{
                ConvertUtils.convertNumberToVnCurrency(totalCost)
              }}</span>
            </p>
          </v-col>
        </v-row>
      </v-sheet>

      <v-sheet
        class="elevation-5 rounded-xl ma-6 mt-5 pa-1"
        v-else-if="listVehicleInCheckOut && listVehicleInCheckOut.length > 0"
      >
        <v-row class="text-h5 font-weight-bold mt-5 ml-3 mb-5">
          <v-col>
            <p class="d-flex justify-space-between">
              <span>Tổng phải thanh toán:</span>
              <span class="mr-5">{{
                ConvertUtils.convertNumberToVnCurrency(totalCostInCheckOut)
              }}</span>
            </p>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card>
  </v-sheet>
  {{ listVehicleInCheckOut }}
</template>
<script lang="ts">
import { defineComponent, onMounted, watch, ref } from "vue";
import ConvertUtils from "@/utils/convertUtils";
import FormatDate from "@/utils/dateTime";

export default defineComponent({
  props: [
    "listVehiclesSelected",
    "listTotalCost",
    "totalCost",
    "isOpen",
    "dataVehicalInCheckOut",
    "infomationCarInCheckOut",
    "totalCostInCheckOut",
    "listVehicleInCheckOut",
  ],
  setup(props) {
    function filterMoney(id: any) {
      return props.listTotalCost.filter((item: any) => item.vehicleId == id)[0]
        .money;
    }
    return { ConvertUtils, FormatDate, filterMoney };
  },
});
</script>
