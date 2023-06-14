<template>
  <v-card class="mx-auto elevation-5" width="100%"
    ><template v-slot:title>
      <v-card-title class="font-weight-bold"
        >Phương Thức Thanh Toán</v-card-title
      >
    </template>
    <v-card-text>
      <div class="d-flex">
        <img
          src="https://cdn.icon-icons.com/icons2/1186/PNG/512/1490135017-visa_82256.png"
          width="50"
        />
        <img
          src="https://e7.pngegg.com/pngimages/910/492/png-clipart-mastercard-logo-credit-card-visa-brand-mastercard-text-label-thumbnail.png"
          width="50"
        />
      </div>
      <div>
        <label for="inforUser"><b>Chọn phương thức thanh toán</b> </label>
        <v-select
          id="inforUser"
          v-model="paymentMethodSelected"
          :items="mstPaymentMethods"
          item-title="paymentMethodName"
          item-value="paymentMethodId"
          no-data-text="Không có dữ liệu"
          variant="outlined"
        ></v-select>
      </div>
      <div v-if="paymentMethodSelected==1">
          <v-alert
            class="mt-3"
            type="success"
            title="Thanh toán bằng tiền mặt!"
            text="Thanh toán trực tiếp với người cho thuê."
          />
      </div>
      <div v-else>
<div>
          <label for="cardHolder"
            ><b class="d-flex"
              >Tên Chủ Thẻ
              <p style="color: red">*</p></b
            > </label
          ><v-text-field
            id="cardHolder"
            placeholder="Nhập Tên Chủ Thẻ"
            variant="outlined"
          ></v-text-field>
        </div>
        <div>
          <label for="cardNumber"
            ><b class="d-flex"
              >Số Thẻ
              <p style="color: red">*</p></b
            > </label
          ><v-text-field
            id="cardNumber"
            placeholder="Nhập Số Thẻ"
            variant="outlined"
            prepend-icon="mdi-card-bulleted"
          ></v-text-field>
        </div>
        <div>
          <v-row>
            <v-col cols="6">
              <label for="expiriDate"
                ><b class="d-flex"
                  >Ngày Hết Hạn
                  <p style="color: red">*</p></b
                > </label
              ><v-text-field
                id="expiriDate"
                placeholder="Chọn ngày hết hạn thẻ"
                variant="outlined"
                type="date"
              ></v-text-field
            ></v-col>
            <v-col cols="6">
              <label for="passcode"
                ><b class="d-flex"
                  >CVC
                  <p style="color: red">*</p></b
                > </label
              ><v-text-field
                id="passcode"
                placeholder="Nhập Tên của bạn"
                variant="outlined"
                prepend-icon="mdi-lock-question"
              ></v-text-field
            ></v-col>
          </v-row>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, watch } from "vue";

var paymentMethodSelected:any = ref(null);
const props = defineProps({
  mstPaymentMethods: {
    type: Array,
    required: true,
  },
});

watch(paymentMethodSelected, (newValue) => {
  console.log(newValue);
});

</script>
