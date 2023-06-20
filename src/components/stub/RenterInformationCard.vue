<template>
  <v-card class="mx-auto elevation-5" width="100%"
    ><template v-slot:title>
      <v-card-title class="font-weight-bold"
        >Thông Tin Người Thuê Xe</v-card-title
      >
      <v-card-subtitle>Thông tin cá nhân của tài xế</v-card-subtitle>
    </template>
    <v-card-text>
      <div :hidden="isOpen === true">
        <label for="inforUser"><b>Chọn thông tin người thuê</b> </label>
        <v-select
          id="inforUser"
          v-model="infoUserSelected"
          :items="mstBaseUser"
          item-title="address"
          item-value="baseId"
          no-data-text="Không có dữ liệu"
          variant="outlined"
        ></v-select>
      </div>
      <div>
        <label for="email"><b>Email</b> </label>
        <v-text-field
          id="email"
          type="email"
          placeholder="Nhập địa chỉ email của bạn"
          variant="outlined"
          v-model="baseUserInfo.eMailAddress"
          :readonly="isOpen === true"
          :rules="rulesEmail"
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
          :readonly="isOpen === true"
          :rules="[!!baseUserInfo.address || `This field is required.`]"
        ></v-text-field>
      </div>
      <div>
        <label for="faxNumber"><b>Số fax</b> </label
        ><v-text-field
          type="number"
          id="faxNumber"
          placeholder="Số fax"
          variant="outlined"
          v-model="baseUserInfo.faxNumber"
          :readonly="isOpen === true"
          :rules="rulesNumberFax"
        ></v-text-field>
      </div>
      <div>
        <label for="telephoneNumber"><b>Số điện thoại</b> </label>
        <div class="mt-2" v-if="isOpen === false">
          <v-phone-input
            id="telephoneNumber"
            variant="outlined"
            single-line="true"
            placeholder="Nhập số điện thoại của bạn"
            v-model="baseUserInfo.telephoneNumber"
          />
        </div>
        <div class="mt-2" v-else>
          <v-phone-input
            id="telephoneNumber"
            variant="outlined"
            single-line="true"
            placeholder="Nhập số điện thoại của bạn"
            v-model="infomationUserInCheckOut.telephoneNumber"
            :readonly="isOpen === true"
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

var infoUserSelected = ref(null);
const emit = defineEmits(["filterUserInfo"]);

const props = defineProps({
  mstBaseUser: {
    type: Array,
    required: true,
  },
  isOpen: {
    type: Boolean,
  },
  baseUserInfo: {
    type: Object,
    default: () => ({
      accountId: null,
      baseId: null,
      baseName: null,
      prefCode: null,
      address: null,
      addressee: null,
      eMailAddress: null,
      telephoneNumber: null,
      faxNumber: null,
    }),
  },
  infomationUserInCheckOut: {
    type: Object,
    default: () => ({
      accountId: null,
      baseId: null,
      baseName: null,
      prefCode: null,
      address: null,
      addressee: null,
      eMailAddress: null,
      telephoneNumber: null,
      faxNumber: null,
    }),
  },
});
onMounted(() => {
  if (props.isOpen === true) {
    Object.assign(props.baseUserInfo, props.infomationUserInCheckOut);
    props.baseUserInfo.telephoneNumber =
      props.infomationUserInCheckOut.telephoneNumber;
  }
});
watch(infoUserSelected, (newValue) => {
  emit("filterUserInfo", newValue);
});

const rulesEmail: any = computed((value) => {
  var result: Array<string> = [];
  var require: any = (value: string) => {
    return !!value || `This field is required.`;
  };
  result.push(require);
  var email: any = (value: string) => {
    return (
      (value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) ||
      `Invalid email.`
    );
  };
  result.push(email);
  return result;
});

const rulesNumberFax: any = computed(() => {
  var result: Array<string> = [];
  var require: any = (value: string) => {
    return !!value || `This field is required.`;
  };
  result.push(require);
  var maxLength: any = (value: string) => {
    return (value && /^[0-9]{0,10}$/.test(value)) || `Fax number is too long.`;
  };
  result.push(maxLength);
  return result;
});

</script>
<style scoped lang="scss"></style>
