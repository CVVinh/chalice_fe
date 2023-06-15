<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-sheet>
          <div class="d-flex flex-column pa-2">
            <span class="text-h3 font-weight-bold mb-3">Checkout</span>
            <p class="text-h6 font-weight-regular">
              Xác nhận thông tin thanh toán
            </p>
          </div>
        </v-sheet>
        <hr />
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <v-col cols="8" xs="12">
        <!-- alert -->
        <v-alert
          type="success"
          title="Nếu bạn có sự thay đổi sau khi đặt xe?"
          text="Bạn sẽ được hoàn trả lại tiền nếu bạn huỷ đặt xe trong vòng 48 giờ!"
          color="#e9ffed"
          icon="mdi-check"
          class="elevation-2"
        >
        </v-alert>

        <!-- car information ordered  -->
        <v-sheet class="mt-5 mb-5">
          <CarInformationCard :getByIdVehicles="getByIdVehicles" />
        </v-sheet>

        <!-- info user -->
        <v-sheet class="mt-7">
          <RenterInformationCard
            :mstBaseUser="mstBaseUser"
            :baseUserInfo="baseUserInfo"
          />
        </v-sheet>
        <!-- payment method -->
        <v-sheet class="mt-7">
          <PaymentMethodCard :mstPaymentMethods="mstPaymentMethods" />
        </v-sheet>

        <div class="d-flex mt-3 justify-end">
          <v-btn color="primary" @click="openCheckOutPaymentDialog()">
            button open dropdown
          </v-btn>
          <!-- <v-btn color="primary" @click="addOrderRenderCar()">
            button add order render
          </v-btn> -->
        </div>
      </v-col>

      <v-col cols="4" xs="12">
        <v-sheet elevation="5">
          <v-card width="100%">
            <v-card-item class="pa-5">
              <v-card-title>
                <span class="text-h4 font-weight-bold"
                  >Tổng chi phí thanh toán</span
                >
              </v-card-title>
            </v-card-item>
            <v-card-text class="ml-2 pa-10">
              <v-row class="text-h5">
                <v-col class="d-flex justify-space-between mt-2" cols="12">
                  <span class="font-weight-bold">Phí thuê xe:</span>
                  <span>
                    <p>
                      {{
                        getByIdVehicles
                          ? ConvertUtils.convertNumberToVnCurrency(
                              getByIdVehicles.vehicleValue
                            )
                          : ""
                      }}
                    </p>
                    <!-- <small>290.800</small> -->
                  </span>
                </v-col>
              </v-row>
              <v-divider class="mt-5 mb-5"></v-divider>
              <v-row>
                <v-col class="text-h5 font-weight-bold">Bảo hiểm</v-col>
              </v-row>
              <v-row class="text-h5" v-if="dataVehical">
                <v-col
                  class="d-flex justify-space-between mt-2"
                  cols="12"
                  v-for="value in dataVehical[0].insurances"
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
              <v-divider class="mt-5 mb-5"></v-divider>
              <v-row>
                <v-col class="text-h5 font-weight-bold"
                  >Các lựa chọn khác</v-col
                >
              </v-row>
              <v-row class="text-h5" v-if="dataVehical">
                <v-col
                  class="d-flex justify-space-between mt-2"
                  cols="12"
                  v-for="value in dataVehical[0].options"
                  :key="value"
                >
                  <span class="ml-15">{{ value.optionName }}:</span>
                  <span>
                    <p>
                      {{
                        ConvertUtils.convertNumberToVnCurrency(
                          value.optionValue
                        )
                      }}
                    </p>
                  </span>
                </v-col>
              </v-row>
              <v-divider class="mt-5"></v-divider>
              <v-row class="text-h5">
                <v-col cols="12" class="mt-5">
                  <p class="font-weight-black" v-if="dataVehical">
                    Dự chi trong
                    {{
                      FormatDate.calculatorDay(
                        dataVehical[0].rentalOrderCart[0].rentalEndDate,
                        dataVehical[0].rentalOrderCart[0].rentalStartDate
                      )
                    }}
                    ngày:
                    {{
                      FormatDate.formatDateAvoidWarning(
                        new Date(
                          dataVehical[0].rentalOrderCart[0].rentalStartDate
                        )
                      )
                    }}
                    -
                    {{
                      FormatDate.formatDateAvoidWarning(
                        new Date(
                          dataVehical[0].rentalOrderCart[0].rentalEndDate
                        )
                      )
                    }}
                  </p>
                </v-col>
                <v-col class="d-flex justify-end mt-3" cols="12">
                  <p v-if="dataVehical">
                    {{ ConvertUtils.convertNumberToVnCurrency(totalCost) }}
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <checkout-payment
    :isOpen="openDialog"
    @closeDialog="closeCheckOutPaymentDialog()"
    :baseUserInfo="baseUserInfo"
    :getByIdVehicles="getByIdVehicles"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";
import BaseService from "@/services/base.service";
import RentalOrderService from "@/services/rental_order.service";
import RentalOrderCartService from "@/services/rental_order_cart.service";
import PaymentMethodsService from "@/services/payment_method.service";
import { useStore } from "@/stores";
import CheckoutPayment from "@/views/Checkout/CheckoutPayment.vue";
import CarInformationCard from "@/components/stub/CarInformationCard.vue";
import RenterInformationCard from "@/components/stub/RenterInformationCard.vue";
import PaymentMethodCard from "@/components/stub/PaymentMethodCard.vue";
import VehiclesService from "@/services/vehicles.service";
import FormatDate from "@/utils/dateTime";
import ConvertUtils from "@/utils/convertUtils";

var store = useStore();
var getStatusRes = computed(() => store.getters.getStatusResponse);
var idUserCurrent = 1;
var idVehical = 1;
var mstBaseUser = ref<any[]>([]);
var mstPaymentMethods = ref<any[]>([]);
var getByIdVehicles = ref<any>(null);
var totalCost = ref<any>(0);
var dataVehical = ref<any>(null);
var baseUserInfo = ref({
  accountId: null,
  baseId: null,
  baseName: null,
  prefCode: null,
  address: null,
  addressee: null,
  eMailAddress: null,
  telephoneNumber: null,
  faxNumber: null,
});

onMounted(async () => {
  await RentalOrderCartService.getAllRentalOrderCart({
    accountId: idUserCurrent,
    vehicleId: idVehical,
    statusCart: 0,
  }).then(async (res: any) => {
    dataVehical.value = [...res.mstRenOrdCart];

    await VehiclesService.getById({
      vehicleId: dataVehical.value[0].vehical.vehicleId,
    }).then(async (res: any) => {
      getByIdVehicles.value = res.data.vehicles_list[0];
      await calculatorOptionIssurance();
    });
  });
  await BaseService.getBaseUserInfo(idUserCurrent).then(async (res: any) => {
    mstBaseUser.value = [...res.mstBaseUser];
  });
  await PaymentMethodsService.getAllPaymentMethod().then(async (res: any) => {
    mstPaymentMethods.value = [...res.mstPaymentMethods];
  });
});

let openDialog = ref(false);
function openCheckOutPaymentDialog() {
  openDialog.value = true;
}

function closeCheckOutPaymentDialog() {
  openDialog.value = false;
}

async function calculatorOptionIssurance() {
  var numberDay: any = FormatDate.calculatorDay(
    dataVehical.value[0].rentalOrderCart[0].rentalEndDate,
    dataVehical.value[0].rentalOrderCart[0].rentalStartDate
  );
  var totaOption: any = 0.0;
  var totaIssurance: any = 0.0;
  dataVehical.value[0].options.forEach((item: any) => {
    totaOption += item.optionValue;
  });
  dataVehical.value[0].insurances.forEach((item: any) => {
    totaIssurance += item.insuranceValue;
  });
  totalCost.value =
    getByIdVehicles.value.vehicleValue * numberDay + totaOption + totaIssurance;
}

// async function addOrderRenderCar() {
//   var objectOrderDetail: any = [];
//   dataVehical.options.forEach((item: any) => {
//     var object = {
//       vehicleId: dataVehical.vehicleId,
//       optionId: item.optionId,
//       quantity: 1,
//       amount: 1,
//       rentalStartDate: dataVehical.rentalStartDate,
//       rentalEndDate: dataVehical.rentalEndDate,
//     };
//     objectOrderDetail.push(object);
//   });
//   var objectOrderCar = {
//     totalAmount: 4000750000,
//     paymentMethodId: 1,
//     rentalStatus: 1,
//     paymentedAt: new Date().toString(),
//     details: objectOrderDetail,
//   };
//   await RentalOrderService.addRentalOrder(objectOrderCar);
//   console.log("add order rental successful!");
// }
</script>
