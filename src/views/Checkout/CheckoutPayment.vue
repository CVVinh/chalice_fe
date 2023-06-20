<template>
  <v-row justify="center" class="mt-5" rounded="2">
    <v-dialog v-model="this.isOpen" width="100%" height="">
      <v-card>
        <v-card-title>
          <div class="d-flex" style="justify-content: end">
            <button @click="closeDialog()">X</button>
          </div>
        </v-card-title>
        <hr />
        <h1 class="ms-10 mt-10">Kiểm Tra Một Lần Nữa Thông Tin Của Bạn</h1>
        <p class="ms-10">Xác Nhận Thông Tin Thanh Toán Là Chính Xác ?</p>
        <v-card-text>
          <v-container>
            <v-row
              no-gutters
              class="justify-center pa-5"
              style="border-top: 1px solid black"
            >
              <v-col cols="5">
                <div class="flex-column">
                  <v-sheet class="">
                    <car-information-card
                      :isOpen="this.isOpen"
                      :infomationCarInCheckOut="listVehiclesSelected"
                    />
                  </v-sheet>
                  <v-sheet class="pa-2 ma-2">
                    <renter-information-card
                      :isOpen="this.isOpen"
                      :infomationUserInCheckOut="baseUserInfo"
                    />
                  </v-sheet>
                  <v-sheet class="pa-2 ma-2">
                    <payment-method-card :isOpen="this.isOpen" />
                  </v-sheet>
                </div>
              </v-col>

              <v-col cols="5">
                <v-sheet class="pa-2 ma-2">
                  <payment-price-card
                    :isOpen="this.isOpen"
                    :totalCostInCheckOut="totalCost"
                    :listVehicleInCheckOut="listDataVehicals"
                  />
                  <v-btn
                    style="width: 100%"
                    color="green"
                    variant="elevated"
                    class="mt-3 elevation-5"
                    @click="CheckOut()"
                  >
                    Xác nhận thanh toán
                  </v-btn></v-sheet
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { ref, onMounted } from "vue";
import CarInformationCard from "@/components/stub/CarInformationCard.vue";
import RenterInformationCard from "@/components/stub/RenterInformationCard.vue";
import PaymentMethodCard from "@/components/stub/PaymentMethodCard.vue";
import PaymentPriceCard from "@/components/stub/PaymentPriceCard.vue";
import { useRouter } from "vue-router";
import rental_orderService from "@/services/rental_order.service";
import { useStore } from "@/stores/index";

export default {
  props: [
    "isOpen",
    "baseUserInfo",
    "listVehiclesSelected",
    "totalCost",
    "listDataVehicals",
  ],
  components: {
    CarInformationCard,
    RenterInformationCard,
    PaymentMethodCard,
    PaymentPriceCard,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const phone = ref(null);
    const store = useStore();
    const closeDialog = () => {
      emit("closeDialog");
    };
    function CheckOut() {
      let details = [];
      let cartOrder = [];
      for (let index = 0; index < props.listDataVehicals.length; index++) {
        const element = props.listDataVehicals[index];

        const orderDetails = {
          vehicleId: null,
          optionId: null,
          insuranceId: null,
          quantity: null,
          amount: null,
          rentalStartDate: null,
          rentalEndDate: null,
        };

        orderDetails.amount = element.totalCost;

        orderDetails.vehicleId = element.vehicles.vehicleId;

        const optionIds = element.options.map((option) => option.optionId);
        orderDetails.optionId = optionIds.join(",");

        const insuranceIds = element.insurances.map(
          (insurance) => insurance.insuranceId
        );
        orderDetails.insuranceId = insuranceIds.join(",");
        //dang gan tam
        orderDetails.quantity = 1;
        orderDetails.rentalStartDate =
          element.rentalStartDate;
        orderDetails.rentalEndDate = element.rentalEndDate;

        const rentalOrderIds = element.rentalOrderCart.map(
          (cartItem) => cartItem.rentalOrdersCartId
        );
        cartOrder.push(...rentalOrderIds);

        details.push(orderDetails);
      }

      const order = {
        totalAmount: props.totalCost,
        paymentMethodId: 1,
        rentalStatus: 1,
        details: details,
        cartOrders: cartOrder,
      };
      rental_orderService
        .addRentalOrder(order)
        .then((res) => {
          const orderId = res.message.data;
          const updateOrder = () => {
            const newOrder = {
              orderId: orderId,
            };
            store.dispatch("setOrder", newOrder);
          };
          updateOrder();
          router.push("/paymentsuccess");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      phone,
      closeDialog,
      CheckOut,
    };
  },
};
</script>
