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
                  <v-sheet class="pa-2 ma-2">
                    <car-information-card
                      :isOpen="this.isOpen"
                      :infomationCarInCheckOut="getByIdVehicles"
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
                  <v-card class="mx-auto elevation-5 pa-2" width="100%">
                    <template v-slot:title>
                      <v-card-title class="font-weight-bold"
                        ><h2>Tổng Chi Phí Thanh Toán</h2></v-card-title
                      >
                    </template>

                    <v-card-text class="ma-5">
                      <div class="d-flex justify-space-between">
                        <div style="font-size: large">Phí Thuê Xe</div>
                        <div
                          class="d-flex flex-column"
                          style="font-size: large"
                        >
                          <b>6,000,000</b>
                          <p class="d-flex justify-end">300,000</p>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-space-between mb-2"
                        style="font-size: large"
                      >
                        <div>Bảo Hiểm</div>
                        <div
                          class="d-flex flex-column"
                          style="font-size: large"
                        >
                          <b>6,000,000</b>
                          <p class="d-flex justify-end">300,000</p>
                        </div>
                      </div>
                      <hr class="mb-3" />
                      <h2>Dự chi cho 3 ngày: 13/06/2023 - 16/06/2023</h2>
                      <div class="d-flex justify-end"><h2>6,000,000</h2></div>
                    </v-card-text>
                  </v-card>
                  <v-btn
                    style="width: 100%"
                    color="green"
                    variant="elevated"
                    class="mt-3 elevation-5"
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

export default {
  props: ["isOpen", "baseUserInfo", "getByIdVehicles"],
  components: { CarInformationCard, RenterInformationCard, PaymentMethodCard },
  setup(props, { emit }) {
    const phone = ref(null);

    const closeDialog = () => {
      emit("closeDialog");
    };

    return {
      phone,
      closeDialog,
    };
  },
};
</script>
