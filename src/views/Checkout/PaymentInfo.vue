<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col cols="1">
            <v-btn
              icon="mdi-arrow-left"
              @click="redirectToCartDetails()"
            ></v-btn>
          </v-col>
          <v-col cols="7">
            <v-sheet>
              <div class="d-flex flex-column pa-2">
                <span class="text-h3 font-weight-bold mb-3">Checkout</span>
                <p class="text-h6 font-weight-regular">
                  Xác nhận thông tin thanh toán
                </p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
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
        <v-sheet class="mb-5">
          <CarInformationCard
            :listDataVehicals="listDataVehicals"
            @arrVehicalSelected="calculatorTotalCost($event)"
          />
        </v-sheet>

        <!-- info user -->
        <v-sheet class="mt-7">
          <RenterInformationCard
            :mstBaseUser="mstBaseUser"
            :baseUserInfo="baseUserInfo"
            @filterUserInfo="filterUserInfo($event)"
          />
        </v-sheet>
        <!-- payment method -->
        <v-sheet class="mt-7">
          <PaymentMethodCard
            :mstPaymentMethods="mstPaymentMethods"
            :paymentMethodIndexSelected="paymentMethodIndexSelected"
            :updatePaymentMethodIndexSelected="updatePaymentMethodIndexSelected"
            :paymentInfomation="paymentInfomation"
          />
        </v-sheet>

        <div class="d-flex mt-3 justify-end">
          <v-btn
            color="primary"
            @click="openCheckOutPaymentDialog()"
            :disabled="listVehiclesSelected.length === 0"
          >
            button open dropdown
          </v-btn>
        </div>
      </v-col>
      <v-col cols="4" xs="12">
        <payment-price-card
          :listVehiclesSelected="listVehiclesSelected"
          :totalCost="totalCost"
        />
      </v-col>
    </v-row>
  </v-container>
  <checkout-payment
    :isOpen="openDialog"
    @closeDialog="closeCheckOutPaymentDialog()"
    :baseUserInfo="baseUserInfo"
    :listVehiclesSelected="listVehiclesSelected"
    :totalCost="totalCost"
    :listDataVehicals="listVehiclesSelected"
    :paymentMethodIndexSelected="paymentMethodIndexSelected"
    :paymentInfomation="paymentInfomation"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";
import BaseService from "@/services/base.service";
import RentalOrderService from "@/services/rental_order.service";
import CarCartService from "@/services/car_cart.service";
import PaymentMethodsService from "@/services/payment_method.service";
import { useStore } from "@/stores";
import CheckoutPayment from "@/views/Checkout/CheckoutPayment.vue";
import CarInformationCard from "@/components/stub/CarInformationCard.vue";
import RenterInformationCard from "@/components/stub/RenterInformationCard.vue";
import PaymentMethodCard from "@/components/stub/PaymentMethodCard.vue";
import PaymentPriceCard from "@/components/stub/PaymentPriceCard.vue";
import { useRouter } from "vue-router";

var router = useRouter();
var store = useStore();
var getStatusRes = computed(() => store.getters.getStatusResponse);
var idUserCurrent = 1;
var mstBaseUser = ref<any[]>([]);
var mstPaymentMethods = ref<any[]>([]);
var listVehiclesSelected = ref<any[]>([]);
var totalCost = ref<any>(0);
var listDataRentalOderCard = ref<any>(null);
var listDataVehicals = ref<any[]>([]);
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
const paymentMethodIndexSelected = ref(-1);
const paymentInfomation = ref({
  cardholderName: null,
  cardNumber: null,
  cardExpiryDate: null,
  cvc: null,
});

onMounted(async () => {
  await CarCartService.getAllCarCart({
    accountId: idUserCurrent,
    statusCart: 0,
  }).then(async (res: any) => {
    listDataRentalOderCard.value = [...res.carCartList];
    listDataVehicals.value = listDataRentalOderCard.value.map(
      (ele: any) => ele.vehicles
    );
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

async function calculatorTotalCost(data: any) {
  listVehiclesSelected.value = listDataRentalOderCard.value.filter(
    (item1: any) =>
      data.find((item2: any) => item2.vehicleId == item1.vehicleId)
  );
  calculatorOptionIssurance();
}
async function calculatorOptionIssurance() {
  totalCost.value = 0;

  listVehiclesSelected.value.forEach((item: any) => {
    totalCost.value += item.totalCost;
  });
}
function filterUserInfo(newValue: any) {
  baseUserInfo.value = mstBaseUser.value.filter(
    (ele: any) => ele.baseId == newValue
  )[0];
}
function redirectToCartDetails() {
  router.push({"name": "CarSearch"});
}

// async function addOrderRenderCar() {
//   var objectOrderDetail: any = [];
//   listDataRentalOderCard.options.forEach((item: any) => {
//     var object = {
//       vehicleId: listDataRentalOderCard.vehicleId,
//       optionId: item.optionId,
//       quantity: 1,
//       amount: 1,
//       rentalStartDate: listDataRentalOderCard.rentalStartDate,
//       rentalEndDate: listDataRentalOderCard.rentalEndDate,
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
function updatePaymentMethodIndexSelected(index: any) {
  paymentMethodIndexSelected.value = index;
}
</script>

<style scoped lang="scss"></style>
