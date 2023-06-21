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
          :hidden="paymentMethodIndexSelectedInCheckOut == 0 && isOpen == true"
        />
        <img
          src="https://e7.pngegg.com/pngimages/910/492/png-clipart-mastercard-logo-credit-card-visa-brand-mastercard-text-label-thumbnail.png"
          width="50"
          :hidden="paymentMethodIndexSelectedInCheckOut == 0 && isOpen == true"
        />
      </div>
      <div :hidden="isOpen === true" class="mb-3">
        <label for="inforUser"><b>Chọn phương thức thanh toán</b> </label>
        <v-select
          id="inforUser"
          v-model="paymentMethodSelected"
          :items="mstPaymentMethods"
          item-title="paymentMethodName"
          item-value="paymentMethodId"
          no-data-text="Không có dữ liệu"
          variant="outlined"
          :rules="[!!paymentMethodSelected || `Payment method is required.`]"
        ></v-select>
      </div>

      <div v-if="!isOpen">
        <div v-if="paymentMethodSelected == 1 && !isOpen">
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
              v-model="paymentInfomation.cardholderName"
            ></v-text-field>
          </div>
          <div>
            <label for="cardNumber"
              ><b class="d-flex"
                >Số Thẻ
                <p style="color: red">*</p></b
              > </label
            ><v-text-field
              type="number"
              id="cardNumber"
              placeholder="Nhập Số Thẻ"
              variant="outlined"
              prepend-icon="mdi-card-bulleted"
              v-model="paymentInfomation.cardNumber"
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
                  v-model="paymentInfomation.cardExpiryDate"
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
                  placeholder="Nhập Mã Bảo Mật"
                  variant="outlined"
                  prepend-icon="mdi-lock-question"
                  v-model="paymentInfomation.cvc"
                ></v-text-field
              ></v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="paymentMethodIndexSelectedInCheckOut == 0 && isOpen">
          <v-alert
            class="mt-3"
            type="success"
            title="Thanh toán bằng tiền mặt!"
            text="Thanh toán trực tiếp với người cho thuê."
          />
        </div>
        <div v-else-if="paymentMethodSelectedIndex != 0">
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
              v-model="paymentInfomation.cardholderName"
              readonly
            ></v-text-field>
          </div>
          <div>
            <label for="cardNumber"
              ><b class="d-flex"
                >Số Thẻ
                <p style="color: red">*</p></b
              > </label
            ><v-text-field
              type="number"
              id="cardNumber"
              placeholder="Nhập Số Thẻ"
              variant="outlined"
              prepend-icon="mdi-card-bulleted"
              v-model="paymentInfomation.cardNumber"
              readonly
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
                  v-model="paymentInfomation.cardExpiryDate"
                  readonly
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
                  placeholder="Nhập Mã Bảo Mật"
                  variant="outlined"
                  prepend-icon="mdi-lock-question"
                  v-model="paymentInfomation.cvc"
                  readonly
                ></v-text-field
              ></v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, PropType, onMounted } from "vue";

let paymentMethodSelected = ref<number>(2);
//Default Value Is -1
let paymentMethodSelectedIndex = ref<number>(-1);

const props = defineProps({
  mstPaymentMethods: {
    type: Array as PropType<
      { paymentMethodId: number; paymentMethodName: string }[]
    >,
    required: true,
  },
  isOpen: {
    type: Boolean,
  },
  paymentMethodIndexSelected: {
    type: Number,
    required: true,
  },
  updatePaymentMethodIndexSelected: {
    type: Function as PropType<(index: number) => void>,
    required: true,
  },
  paymentMethodIndexSelectedInCheckOut: {
    type: Number,
  },
  paymentInfomation: {
    type: Object,
    default: () => ({
      cardholderName: null,
      cardNumber: null,
      cardExpiryDate: null,
      cvc: null,
    }),
  },
  paymentInfomationInCheckOut: {
    type: Object,
    default: () => ({
      cardholderName: null,
      cardNumber: null,
      cardExpiryDate: null,
      cvc: null,
    }),
  },
});
onMounted(() => {
  if (props.isOpen === true) {
    Object.assign(props.paymentInfomation, props.paymentInfomationInCheckOut);
  }
});
watch(paymentMethodSelected, (newValue) => {
  const index = props.mstPaymentMethods.findIndex(
    (method) => method.paymentMethodId === newValue
  );
  console.log(index);
  props.updatePaymentMethodIndexSelected(index);
});
</script>
