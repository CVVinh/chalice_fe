<template>
  <v-card class="mx-auto elevation-5" width="100%"
    ><template v-slot:title>
      <v-card-title class="font-weight-bold"
        >Thông Tin Người Thuê Xe</v-card-title
      >
      <v-card-subtitle>Thông tin cá nhân của tài xế</v-card-subtitle>
    </template>
    <v-card-text>
      <div>
        <label for="inforUser"><b>Chọn thông tin người thê</b> </label>
        <v-select
          id="inforUser"
          v-model="infoUserSelected"
          :items="mstBaseUser"
          item-title="baseName"
          item-value="baseId"
          no-data-text="Không có dữ liệu"
          variant="outlined"
        ></v-select>
      </div>
      <div>
        <label for="email"><b>Email</b> </label>
        <v-text-field
          id="email"
          placeholder="Nhập địa chỉ email của bạn"
          variant="outlined"
          v-model="baseUserInfo.eMailAddress"
        >
        </v-text-field>
      </div>
      <div>
        <label for="address"><b>Địa chỉ người thuê</b> </label
        ><v-text-field
          id="address"
          placeholder="Nhập địa chỉ"
          variant="outlined"
          v-model="baseUserInfo.address"
        ></v-text-field>
      </div>
      <div>
        <label for="faxNumber"><b>Số fax</b> </label
        ><v-text-field
          id="faxNumber"
          placeholder="Số fax"
          variant="outlined"
          v-model="baseUserInfo.faxNumber"
        ></v-text-field>
      </div>
      <div>
        <label for="telephoneNumber"><b>Số điện thoại</b> </label>
        <div class="mt-2">
          <v-phone-input
            id="telephoneNumber"
            variant="outlined"
            single-line="true"
            placeholder="Nhập số điện thoại của bạn"
            v-model="baseUserInfo.telephoneNumber"
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import BaseUserResponse from "@/interfaces/response/base-response.model";
import { onMounted, PropType, ref, watch } from "vue";

var infoUserSelected = ref(null);
const props = defineProps({
  mstBaseUser: {
    type: Array,
    required: true,
  },
});

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

watch(infoUserSelected, (newValue) => {
  baseUserInfo.value = props.mstBaseUser.filter((ele:any) => ele.baseId == newValue)[0];
  console.log(baseUserInfo);
});


</script>
