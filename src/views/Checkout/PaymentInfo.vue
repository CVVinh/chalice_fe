<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-sheet>
          <div class="d-flex flex-column pa-2">
            <span class="text-h4 font-weight-bold mb-3">Checkout</span>
            <p>Xác nhận thông tin thanh toán</p>
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
        >
        </v-alert>

        <!-- car information ordered  -->
        <v-sheet class="mt-5 mb-5">
          <CarInformationCard :getByIdVehicles="getByIdVehicles"/>
        </v-sheet>

        <!-- info user -->
        <v-sheet class="mt-7">
          <RenterInformationCard :mstBaseUser="mstBaseUser" />
        </v-sheet>

        <!-- payment method -->
        <v-sheet class="mt-7">
          <PaymentMethodCard :mstPaymentMethods="mstPaymentMethods" />
        </v-sheet>

        <div class="d-flex mt-3 justify-end">
          <v-btn color="primary" @click="openCheckOutPaymentDialog()">
            button open dropdown
          </v-btn>
          <v-btn color="primary" @click="addOrderRenderCar()">
            button add order render
          </v-btn>
        </div>
      </v-col>

      <v-col cols="4" xs="12">
        <v-sheet elevation="5">
            <v-card width="100%">
                <v-card-item>
                    <v-card-title>
                    <!-- <v-icon color="blue" icon="mdi-account-credit-card" size="50"></v-icon> -->
                    <span class="text-h4">Tổng chi phí thanh toán</span>
                    </v-card-title>
                </v-card-item>
                <v-card-text class="ml-2">
                    <v-row class="text-h5">
                        <v-col class="d-flex justify-space-between mt-2" cols="12">
                            <span>Phí thuê xe:</span>
                            <span>
                                <p>{{getByIdVehicles?ConvertUtils.convertNumberToVnCurrency(getByIdVehicles.vehicleValue):''}}</p>
                                <!-- <small>290.800</small> -->
                            </span>
                        </v-col>
                    </v-row>
                    <v-divider class="mt-5 mb-5"></v-divider>
                    <v-row>
                        <v-col class="text-h5 font-weight-bold text-center">Bảo hiểm</v-col>
                    </v-row>
                    <v-row class="text-h5" v-if="dataVehical">
                        <v-col class="d-flex justify-space-between mt-2" cols="12" v-for="value in dataVehical.issurances" :key="value">
                            <span>{{value.insuranceName}}:</span>
                            <span>
                                <p>{{ConvertUtils.convertNumberToVnCurrency(value.insuranceValue)}}</p>
                            </span>
                        </v-col>
                    </v-row>
                    <v-divider class="mt-5 mb-5"></v-divider>
                    <v-row>
                        <v-col class="text-h5 font-weight-bold text-center">Các lựa chọn khác</v-col>
                    </v-row>
                    <v-row class="text-h5" v-if="dataVehical">
                        <v-col class="d-flex justify-space-between mt-2" cols="12" v-for="value in dataVehical.options" :key="value">
                            <span>{{value.optionName}}:</span>
                            <span>
                                <p>{{ConvertUtils.convertNumberToVnCurrency(value.optionValue)}}</p>
                            </span>
                        </v-col>
                    </v-row>
                    <v-divider class="mt-5"></v-divider>
                    <v-row class="text-h5">
                        <v-col cols="12" class="mt-5">
                            <p class="font-weight-black">
                            Dự chi trong {{ FormatDate.calculatorDay(dataVehical.rentalEndDate, dataVehical.rentalStartDate) }} ngày: {{ dataVehical? FormatDate.formatDateAvoidWarning(new Date(dataVehical.rentalStartDate)):'' }} - {{ dataVehical? FormatDate.formatDateAvoidWarning(new Date(dataVehical.rentalEndDate)):'' }}
                            </p>
                        </v-col>
                        <v-col class="d-flex justify-end mt-3" cols="12">
                            <p>{{ ConvertUtils.convertNumberToVnCurrency(dataVehical.totalCost) }}</p>
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
  />
</template>

<script setup lang="ts">
import {
  PropType,
  ref,
  reactive,
  computed,
  Ref,
  onMounted,
  watchEffect,
  watch,
  onUpdated, 
  onBeforeMount,
  onBeforeUpdate,
} from "vue";
import BaseService from "@/services/base.service";
import RentalOrderService from "@/services/rental_order.service";
import PaymentMethodsService from "@/services/payment_method.service";
import { useStore } from "@/stores";
import CheckoutPayment from "@/views/Checkout/CheckoutPayment.vue";
import CarInformationCard from "@/components/stub/CarInformationCard.vue";
import RenterInformationCard from "@/components/stub/RenterInformationCard.vue";
import PaymentMethodCard from "@/components/stub/PaymentMethodCard.vue";
import BaseUserResponse from "@/interfaces/response/base-response.model";
import VehiclesService from "@/services/vehicles.service";
import FormatDate from "@/utils/dateTime"
import ConvertUtils from "@/utils/convertUtils"

const store = useStore();
const getStatusRes = computed(() => store.getters.getStatusResponse);
var idUserCurrent = 1;
var mstBaseUser = ref<any[]>([]);
var mstPaymentMethods = ref<any[]>([]);
var getByIdVehicles = ref<any>(null);
var totalCost = ref<any>(0);
var dataVehical = ref<any>(null);

var localstogared: any = ref({
    vehicleId: 1,
    rentalStartDate: '2023/06/15',
    rentalEndDate: '2023/06/19',
    totalCost: 4242425,
    options: [
      {
          "optionId": 5,
          "optionName": "option 1",
          "optionValue": 200000.0
      },
      {
          "optionId": 6,
          "optionName": "option 2",
          "optionValue": 250000.0
      },
    ],
    issurances: [
      {
          "insuranceId": 4,
          "insuranceName": "insurance 2",
          "insuranceValue": 100000.0
      },
      {
          "insuranceId": 5,
          "insuranceName": "insurance 3",
          "insuranceValue": 200000.0
      },
    ]
})

var baseUserInfo: any = ref({
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

onBeforeMount(async () => {
    //localStorage.setItem("dataVehical",JSON.stringify(localstogared.value));
    await getCarInfomation();
});

onMounted(async () => {
    const baseUserTemp = await BaseService.getBaseUserInfo(idUserCurrent);
    const paymentMethodTemp = await PaymentMethodsService.getAllPaymentMethod();
    mstBaseUser.value = [...baseUserTemp.mstBaseUser];
    mstPaymentMethods.value = [...paymentMethodTemp.mstPaymentMethods];
});

function onChangeSelected(data: any) {
    baseUserInfo.value = mstBaseUser.value.filter((ele:any) => ele.baseId == data)[0];
    console.log(baseUserInfo);
}

let openDialog = ref(false);
function openCheckOutPaymentDialog() {
    openDialog.value = true;
}

function closeCheckOutPaymentDialog() {
    openDialog.value = false;
}

async function getCarInfomation() {
    var decore = localStorage.getItem('dataVehical');
    dataVehical = JSON.parse(decore? decore: '');
    var result = await VehiclesService.getById({vehicleId: dataVehical.vehicleId}); 
    getByIdVehicles.value = result.data.vehicles_list[0];
    await calculatorOptionIssurance();
}

async function calculatorOptionIssurance() {
    var numberDay: any = FormatDate.calculatorDay(dataVehical.rentalEndDate, dataVehical.rentalStartDate);
    var totaOption: any = 0.0;
    var totaIssurance: any = 0.0;
    dataVehical.options.forEach((item:any) => {
        totaOption += item.optionValue
    }); 
    dataVehical.issurances.forEach((item:any) => {
        totaIssurance += item.insuranceValue
    }); 
    totalCost = (getByIdVehicles.value.vehicleValue * numberDay) + totaOption + totaIssurance;
    dataVehical.totalCost = totalCost;
    console.log( dataVehical.totalCost);
}

async function addOrderRenderCar(){
  var objectOrderDetail:any = []
  dataVehical.options.forEach((item:any) => {
    var object = {
      vehicleId: dataVehical.vehicleId,
      optionId: item.optionId,
      quantity: 1,
      amount: 1,
      rentalStartDate: dataVehical.rentalStartDate,
      rentalEndDate: dataVehical.rentalEndDate
    }
    objectOrderDetail.push(object)
  }); 
  var objectOrderCar = {
    totalAmount: '4000750000',
    paymentMethodId: 1,
    rentalStatus: 1,
    paymentedAt: new Date().toString(),
    details: objectOrderDetail
  }
  await RentalOrderService.addRentalOrder(objectOrderCar).then(res => {
    console.log("add order rental successful!");
  })
}

</script>
