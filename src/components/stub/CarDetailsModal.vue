<template>
  <v-card>
    <div class="header">
      <div class="icon">
        <span class="mdi mdi-close-circle-outline mdi-48px" v-on:click="ClickCarDetail"></span> 
      </div>              
    </div>
    <hr>
    <v-form>
      <div 
        v-for="item in state.dataDetail"
        :key="item.vehicleId"
      >
      <v-container>           
        <v-row class="image">
          <v-col>
            <v-img class="image-left" cover
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>
          </v-col>
          <v-col>
            <div class="image-right image-margin">
              <v-img  
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img> 
            </div>
            <div class="image-right image-margin">
              <v-img  
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              >
              </v-img> 
            </div>
            <div class="image-right">
              <v-img  
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img> 
            </div>
          </v-col>
        </v-row>              
      </v-container>
      <v-container>
        <div class="body" v-for="store in item.stores_list" :key="store.storeId">
          <v-col cols="8" class="body-left">
            <v-row>
              <h1 class="text-uppercase">{{ item.vehicleName }}</h1>                  
            </v-row>
            <v-row>
              <v-col cols="2" v-if="item.vehicleRating">
                <h2 class="text-row-1">
                  <span class="mdi mdi-star"></span>
                  {{ item.vehicleRating }}
                </h2>
              </v-col>
              <v-col cols="3" v-if="item.mileage">                                 
                <h2 class="text-row-1">
                  <span class="mdi mdi-wallet-travel"></span>
                  {{ item.mileage }} Dặm
                </h2>
              </v-col>
              <v-col v-if="store.storeName">
                <h2 class="text-row-1">
                  <span class="mdi mdi-map-marker"></span>
                  {{ store.storeName }}
                </h2>
              </v-col>
            </v-row>
            <hr>
            <v-row>
              <h1 class="text-header">Đặc điểm</h1>                  
            </v-row>
            <v-row>
              <span v-if="item.vehicleSeat"><Icon icon="ic:baseline-chair"/></span>
              <v-col cols="2" v-if="item.vehicleSeat">
                <h4>Số ghế</h4>
                <h2 class="characteristic">{{ item.vehicleSeat }} Ghế</h2>
              </v-col>
              <span v-if="item.vehicleEngine"><Icon icon="arcticons:automation"/></span>
              <v-col cols="3" v-if="item.vehicleEngine">
                <h4>Truyền động</h4>
                <h2 class="characteristic">{{ item.vehicleEngine }}</h2>
              </v-col>
              <span><Icon icon="mdi:gasoline" /></span>
              <v-col cols="2">
                <h4>Nhiên liệu</h4>
                <h2 class="characteristic">Xăng</h2>
              </v-col>
              <span v-if="item.vehicleConsumedEnergy"><Icon icon="mdi:motor" /></span>
              <v-col cols="4" v-if="item.vehicleConsumedEnergy">
                <h4>Năng lượng tiêu hao</h4>
                <h2 class="characteristic">{{ item.vehicleConsumedEnergy }}/100km</h2>
              </v-col>
            </v-row>
            <hr>
            <v-row>
              <h1 class="text-header">Mô tả</h1>
            </v-row>
            <v-row>
              <h2 class="describe">{{ item.vehicleDescribe }}</h2>
            </v-row>
            <hr>
            <v-row>
              <h1 class="text-header">Điều khoản</h1>
            </v-row>
            <v-row>
              <div class="rules">
                <div>
                  <h2>Quy định khác: </h2>
                </div>
                <div>
                  <h2>&#8728; Sử dụng xe đúng mục đích.</h2>
                  <h2>&#8728; Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.</h2>
                  <h2>&#8728; Không sử dụng xe thuê để cầm cố, thuế chấp.</h2>
                  <h2>&#8728; Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</h2>
                  <h2>&#8728; Không chở hàng quốc cấm, hàng dễ cháy nổ.</h2>
                  <h2>&#8728; Không chở hoa quả, thực phẩm nặng mùi trong xe, khách hàng vui lòng vệ sinh xe.</h2>
                  <h2>&#8728; Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ thu phí vệ sinh xe.</h2>
                  <h2>Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời!</h2>
                </div>
              </div>                                
            </v-row>
          </v-col>
          <v-col cols="3.5" class="body-right">
            <v-row>
              <h1 class="text-price">{{ item.vehicleValue?.toLocaleString() }}đ/ngày</h1>
            </v-row>
            <div class="note">
              <div class="note-text">
                <v-row>
                  <div class="received-date">
                    <v-col>
                      <h4>Ngày nhận xe</h4>
                      <vc-input-date 
                        v-model="state.receivedDate"
                      ></vc-input-date>
                    </v-col>
                    <span
                      v-if="receivedDateInvalid"
                      class="error-message"
                    >Vui lòng chọn ngày nhận từ hôm nay trở đi!</span>
                  </div>
                  <div class="return-date">
                    <v-col>
                      <h4>Ngày trả xe</h4>
                      <vc-input-date 
                        v-model="state.returnDate"
                        :disabled="disableReturnDate"
                      ></vc-input-date>
                      
                    </v-col>
                    <span
                      v-if="returnDateInvalid"
                      class="error-message"
                    >Ngày trả phải lớn hơn ngày nhận!</span>
                  </div>
                </v-row>
                <v-row>
                  <div class="location">
                    <v-col>
                      <h4>Địa điểm nhận xe</h4>
                      <h2>{{ store.storeName }}</h2>
                    </v-col>
                  </div>
                </v-row>
                <v-row>
                  <div class="insurances">
                    <v-col>
                      <h4>Bảo hiểm</h4>
                      <v-select
                        v-model="state.selectedInsurance"
                        :items="state.dataInsurance"
                        item-title="insuranceName"
                        item-value="insuranceId"
                        variant="underlined"
                        density="comfortable"
                        multiple
                        chips
                      />
                    </v-col>                               
                  </div>                                  
                </v-row>
                <v-row>
                  <div class="options">
                    <v-col>
                      <h4>Options khác</h4>
                      <v-select
                        v-model="state.selectedOption"
                        :items="state.dataOption"
                        item-title="optionName"
                        item-value="optionId"
                        variant="underlined"
                        density="comfortable"
                        multiple
                        chips
                      />
                    </v-col>                               
                  </div>                                  
                </v-row>
                <v-row class="hr"></v-row>
                <div class="price-options">
                  <div>  
                    <v-row>
                      <v-col>
                        <h2>Đơn giá thuê theo 1 ngày</h2>
                      </v-col>
                      <v-col class="align-right">
                        <h2>{{ item.vehicleValue?.toLocaleString() }}đ</h2>
                      </v-col>
                    </v-row>
                    <v-row v-for="item in selectedInsurances" :key="item?.insuranceId">
                      <v-col>
                        <h2>{{ item?.insuranceName }}</h2>
                      </v-col>
                      <v-col class="align-right">
                        <h2>{{ item?.insuranceValue?.toLocaleString() }}đ</h2>
                      </v-col>
                    </v-row>
                    <v-row v-for="item in selectedOptions" :key="item?.optionId">
                      <v-col>
                        <h2>{{ item?.optionName }}</h2>
                      </v-col>
                      <v-col class="align-right">
                        <h2>{{ item?.optionValue?.toLocaleString() }}đ</h2>
                      </v-col>
                    </v-row>
                  </div>
                </div>  
                <v-row class="hr"></v-row>      
                <div class="expense">    
                  <v-row>
                    <v-col class="left">
                      <h2>Tổng thời gian thuê</h2>
                    </v-col>
                    <v-col class="align-right">
                      <h2>{{ borrowingTime }} ngày</h2>
                    </v-col>
                  </v-row>                                                           
                  <v-row>
                    <v-col class="left">
                      <h2>Tổng phí thuê xe</h2>
                    </v-col>
                    <v-col class="align-right">
                      <h2>{{ totalRentalFees?.toLocaleString() }}đ</h2>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="left">
                      <h2>Tổng chi phí khác</h2>
                    </v-col>
                    <v-col class="align-right">
                      <h2>{{ totalOtherExpenses?.toLocaleString() }}đ</h2>
                    </v-col>
                  </v-row>
                </div>                          
                <v-row class="hr"></v-row>
                <v-row>
                  <v-col>
                    <h2>Tổng cộng</h2>
                  </v-col>
                  <v-col class="align-right">
                    <h2>{{ totalCost?.toLocaleString() }}đ</h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col></v-col>
                </v-row>
                <v-row  class="book-a-car">
                  <v-btn :disabled="isBookButtonDisabled">Đặt Xe</v-btn>
                </v-row>
              </div>                               
            </div>                           
          </v-col>               
        </div>               
      </v-container>
      </div>     
    </v-form>
  </v-card>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { reactive, onMounted, computed, watchEffect } from "vue";
import VehiclesService from "@/services/vehicles.service";
import Vehicles from "@/interfaces/Vehicles";
import Options from "@/interfaces/Options";
import OptionService from "@/services/options.service";
import Insurances from "@/interfaces/Insurances";
import InsuranceService from "@/services/insurances.service";

interface Emits {
  (event: "clickCarDetail"): void;
}
const emit = defineEmits<Emits>();

const ClickCarDetail = (): void => {
  emit("clickCarDetail");
};

const props = defineProps({
  vehicleId: {
    type: Number,
    required: true,
  },
});

const data = reactive({
  vehicleId: props.vehicleId,
});

const state = reactive({
  dataDetail: [] as Vehicles[],
  dataOption: [] as Options[],
  selectedOption: [] as Options[],
  dataInsurance: [] as Insurances[],
  selectedInsurance: [] as Insurances[],
  receivedDate: null,
  returnDate: null,
  totalRentalFee: 0,
});

onMounted( async () => {
  try {
    await getData(data);
    await getDataOption();
    await getDataInsurance();
  } catch (error) {
    console.log(error);
  }
});

// Get vehicle details from vehicleId passed in via props
const getData = async (data: object) => {
  try {
    const response = await VehiclesService.getById(data);
    if (response && response.data) {
      state.dataDetail = response.data.vehicles_list;
      if (!state.dataDetail[0].vehicleDescribe) {
        state.dataDetail[0].vehicleDescribe = "Chúng tôi sẽ thêm mô tả sau."
      }
      state.totalRentalFee += state.dataDetail[0].vehicleValue? state.dataDetail[0].vehicleValue : 0
    }
  } catch (error) {
    console.log(error);
  }
};

// Get list of options save to state.dataOption
const getDataOption = async () => {
  try {
    const response = await OptionService.getAll();
    if (response && response.data) {
      state.dataOption = response.data.mstOptions;
    }
  } catch (error) {
    console.log(error);
  }
};

// Get list of insurances save to state.dataOption
const getDataInsurance = async () => {
  try {
    const response = await InsuranceService.getAll();
    if (response && response.data) {
      state.dataInsurance = response.data.mstIsurances;
    }
  } catch (error) {
    console.log(error);
  }
};

// Computed property to get selected options
const selectedOptions = computed(() => {
  return state.selectedOption.map((optionId) => {
    return state.dataOption.find((item) => item.optionId === optionId);
  });
});

// Computed property to get selected insurances
const selectedInsurances = computed(() => {
  return state.selectedInsurance.map((insuranceId) => {
    return state.dataInsurance.find((item) => item.insuranceId === insuranceId);
  });
});

// Computed to calculate the time to borrow a car
const borrowingTime = computed(() => {
  if (state.receivedDate && state.returnDate && !returnDateInvalid.value) {
    const receivedTime = new Date(state.receivedDate);
    const returnTime = new Date(state.returnDate);
    const timeDiff = returnTime.getTime() - receivedTime.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));  
    return daysDiff;
  } else {
    return 0;
  }
});

// Computed to calculate the total cost of car rental
const totalRentalFees = computed(() => {
  return state.totalRentalFee * borrowingTime.value
})

// Computed to calculate the total option value
const totalOptionValue = computed(() => {
  let total = 0;
  for (const option of selectedOptions.value) {
    total += option?.optionValue || 0;
  }
  return total;
});

// Computed to calculate the total insurance value
const totalInsuranceValue = computed(() => {
  let total = 0;
  for (const insurance of selectedInsurances.value) {
    total += insurance?.insuranceValue || 0;
  }
  return total;
});

// Computed to calculate the sum of other costs (option and insurance costs)
const totalOtherExpenses = computed(() => {
  return totalOptionValue.value + totalInsuranceValue.value;
});

// Computed to calculate the total cost when renting a car
const totalCost = computed(() => {
  return totalOtherExpenses.value + totalRentalFees.value
})

// Check validate return date
const returnDateInvalid = computed(() => {
  if (state.receivedDate && state.returnDate) {
    const receivedTime = new Date(state.receivedDate);
    const returnTime = new Date(state.returnDate);
    return returnTime <= receivedTime;
  } else {
    return false;
  }
});

// Check validate received date
const receivedDateInvalid = computed(() => {
  if (state.receivedDate) {
    const receivedTime = new Date(state.receivedDate);
    const date = new Date()
    return receivedTime <= date;
  } else {
    return false;
  }
});

// Check disable return date
const disableReturnDate = computed(() => {
  return !state.receivedDate || receivedDateInvalid.value
})

const isBookButtonDisabled = computed(() => {
  // Check if the parking button is disabled or not
  return !state.returnDate || returnDateInvalid.value;
});

</script>
<style lang="css" scoped>
div.header {
  padding: 20px;
}
div.icon {
  display: flex;
  float: right;
  width: 50px;
}
hr {
  border: 2px rgb(138, 136, 136) solid;
  margin-top: 1%;
}
div.v-container {
  display: flex;
  justify-content: center;
}
div.v-row {
  margin-top: 0;
}
div.v-row.image {
  margin: 0;
  flex: none;
  padding-top: 50px;
}
div.v-img.image-left {
  height: 800px;
  width: 1235px;
  margin-right: 20px;
}
div.image-right {
  height: 260px;
  width: 520px;
}
div.image-right.image-margin {
  margin-bottom: 10px;
}
div.body {
  width: 73%;
  display: flex;
}
.v-col.v-col-8.body-left {
  margin-right: 3%;
  float: left;
}
h1.text-uppercase {
  font-size: 70px;
  margin-left: 10px;
}
h1.text-header {
  font-weight: inherit;
  padding: 20px 30px;
}
span {
  font-size: 40px;
}
span.mdi.mdi-star {
  font-size: 40px;
  color: darkorange;
}
span.mdi.mdi-map-marker {
  color: royalblue;
}
div.v-col.v-col-2 {
  max-width: 12%;
}
h2.text-row-1 {
  color: rgb(133, 133, 133);
  font-weight: inherit;
}
span svg.iconify.iconify--ic {
  font-size: 60px;
  margin: 20px 0px 20px 45px;
}
span svg.iconify.iconify--arcticons {
  font-size: 60px;
  margin: 20px 0px;
}
span svg.iconify.iconify--mdi {
  font-size: 70px;
  margin: 20px 0px;
}
.v-col.v-col-3 {
  max-width: 15%;
}
h4 {
  font-size: 20px;
  color: rgb(155, 155, 155);
  font-weight: normal;
}
h2.characteristic {
  font-size: 30px;
  font-weight: inherit;
  color: black;
}
h2.describe {
  padding: 30px;
  color: rgb(155, 155, 155);
  font-weight: inherit;
}
div h2 {
  font-weight: inherit;
  color: rgb(155, 155, 155);
}
div.rules {
  padding: 30px;
}
.v-col.body-right{
  border: 1px black solid;
  float: right;
  margin-top: 10px;
  border-radius: 17px;
  background-color: rgb(246, 250, 253);
}
h1.text-price {
  padding: 10px 20px;
}
div.note {
  display: flex;
  justify-content: center;
}
div.note-text .v-row div.v-col h4 {
  color: black;
  font-size: medium;
}
div.note-text .v-row div.v-col h2 {
  color: black;
  font-weight: bold;
}
div.received-date {
  padding: 5px 5px 0px 0px;
  width: 50%;
}
div.received-date div.v-col {
  background-color: rgb(245, 244, 244);
  border-radius: 10px;
}
div.return-date {
  padding: 5px 5px 0px 0px;
  width: 50%;
}
div.return-date div.v-col {
  background-color: rgb(245, 244, 244);
  border-radius: 10px;
}
div.location {
  padding: 30px 0px 0px 0px;
  width: 100%;
}
div.location div.v-col {
  background-color: rgb(245, 244, 244);
  border-radius: 10px;
}
div.insurances {
  padding-top: 30px;
  width: 100%;
}
div.insurances div.v-col {
  background-color: rgb(245, 244, 244);
  border-radius: 10px;
}
div.options {
  padding: 30px 0px 17px 0px;
  width: 100%;
}
div.options div.v-col {
  background-color: rgb(245, 244, 244);
  border-radius: 10px;
}
div.hr {
  border: 2px rgb(212, 212, 212) solid;
  margin-bottom: 5px;
  margin-top: 5px;
}
div.price-options {
  padding-bottom: 5px;
  width: 100%;
}
div.price-options .v-row .v-col h2 {
  color: rgb(83, 83, 83);
  /* font-size: 1.5rem; */
}
div.expense .v-row .v-col.left h2 {
  color: rgb(83, 83, 83);
  width: 250px;
}
.book-a-car {
  display: flex;
  justify-content: center;
  padding: 50px 0;
}
.v-btn {
  background-color: rgb(3, 167, 85);
  color: white;
  width: 65%;
  border-radius: 25px;
  height: 45px;
  font-weight: bold;
  text-transform: none;
  font-size: 22px;
}
.error-message {
  color: red;
  font-size: 15px;
}
.align-right {
  text-align: right;
}
</style>
