<template>
  <div class="pa-4">
    <h3>TÌM KIẾM XE</h3>
    <div class="elevation-5">
      <SearchComponent @onSearch="onClickSearch" @onClear="onClickClear">
        <template v-slot:searchForm>
          <v-form class="pb-3">
            <v-row>
              <v-col cols="3">
                <h4>Địa điểm thuê</h4>
                <v-select
                  label="Chọn địa điểm"
                  name="メーカーID"
                  v-model="dataSearch.storeId"
                  hide-details
                  variant="underlined"
                  :items="state.dataStore"
                  item-title="storeName"
                  item-value="storeId"
                />
              </v-col>
              <v-col cols="3">
                <h4>Loại xe</h4>
                <v-select
                  label="Chọn loại xe"
                  v-model="dataSearch.vehicleModel"
                  hide-details
                  variant="underlined"
                  :items="state.dataModel"
                  item-title="modelName"
                  item-value="modelId"
                />
              </v-col>
              <v-col cols="3">
                <h4>Số lượng chỗ ngồi</h4>
                <v-select
                  label="Chọn số lượng chỗ ngồi"
                  v-model="dataSearch.vehicleSeat"
                  hide-details
                  variant="underlined"
                  :items="dataSeat"
                />
              </v-col>
              <v-col cols="3">
                <h4>Hãng xe</h4>
                <v-select
                  label="Chọn hãng xe"
                  v-model="dataSearch.makerId"
                  hide-details
                  variant="underlined"
                  :items="state.dataMaker"
                  item-title="makerName"
                  item-value="makerId"
                />
              </v-col>
            </v-row>
          </v-form> </template
      ></SearchComponent>
    </div>
    <v-form class="elevation-5 mt-15">
      <div
        v-for="item in state.dataTable"
        :key="item.vehicleId"
        class="elevation-5 mt-5"
      >
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-img
                :width="330"
                aspect-ratio="16/9"
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img>
            </v-col>
            <v-col cols="7">
              <v-row>
                <v-col>
                  <h1 class="text-uppercase">{{ item.vehicleName }}</h1>
                </v-col>
                <v-col
                  v-for="models in item.models_list"
                  :key="models.modelId"
                  class="text-left pt-7"
                >
                  <h4 class="text-disabled">{{ models.modelName }}</h4>
                </v-col>
                <span class="mdi mdi-map-marker"></span>
                <v-col
                  v-for="store in item.stores_list"
                  :key="store.storeId"
                  class="text-left pt-7"
                  cols="9"
                >
                  <h4>{{ store.storeName }}</h4>
                </v-col>
              </v-row>
              <v-row>
                <h4 class="text-medium-emphasis mr-14">
                  <span class="mdi mdi-account-outline"></span
                  >{{ item.vehicleSeat }} seat
                </h4>

                <h4 class="text-medium-emphasis">
                  <span class="mdi mdi-star"></span> {{ item.vehicleRating }}
                </h4>
              </v-row>
              <v-row>
                <h4 class="text-medium-emphasis mr-5">
                  <span class="mdi mdi-car-cog"></span>{{ item.vehicleEngine }}
                </h4>

                <h4 class="text-medium-emphasis">
                  <span class="mdi mdi-wallet-travel"></span
                  >{{ item.mileage }} miles
                </h4>
              </v-row>
            </v-col>
            <v-col cols="3">
              <div class="d-flex flex-column-reverse bd-highlight pr-5">
                <div class="p-2 bd-highlight pt-5">
                  <v-btn
                    class="btn-detail"
                    variant="elevated"
                    @click="ClickCarDetail(item.vehicleId)"
                  >
                    Xem xe
                  </v-btn>
                </div>
                <div class="p-2 bd-highlight">
                  <span class="mdi mdi-check">Hủy miễn phí</span>
                </div>
                <div class="p-2 bd-highlight">
                  <h1 class="text-for-money">
                    {{ item.vehicleValue?.toLocaleString() }} VNĐ
                  </h1>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="pagination">
        <v-row>
          <v-col>
            <v-pagination
              v-model="dataSearch.pageNum"
              :length="Math.ceil(state.totalRecords / dataSearch.pageSize)"
              size="small"
              rounded="circle"
            />
          </v-col>
        </v-row>
        <div class="pagination_select">
          <div class="d-flex align-center">
            <v-select
              density="compact"
              v-model="dataSearch.pageSize"
              hide-details
              :items="[10, 20, 50]"
              @onChange="onChange"
            />
          </div>
        </div>
      </div>
    </v-form>
  </div>
  <v-dialog v-model="carDetailsState.open">
    <CarDetailsModal
      :vehicleId="vehicleId"
      v-on:clickCarDetail="onClickCarDetail"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import CarDetailsModal from "@/components/stub/CarDetailsModal.vue";
import SearchComponent from "@/components/tabs/search-button/ForCarSreach.vue";
import { computed, onMounted, reactive, Ref, ref, watch } from "vue";
import VehiclesService from "@/services/vehicles.service";
import Vehicles from "@/interfaces/Vehicles";
import StoresService from "@/services/stores.service";
import Stores from "@/interfaces/Stores";
import MakersService from "@/services/makers.service";
import Makers from "@/interfaces/Makers";
import ModelService from "@/services/models.service";
import Models from "@/interfaces/Models";
import { it } from "node:test";
import { log } from "node:console";

const dataSearch = reactive({
  storeId: null,
  vehicleModel: null,
  vehicleSeat: null,
  makerId: null,
  pageNum: 1,
  pageSize: 5,
});

const dataSeat = ["2", "4", "7", "16", "32"];

const state = reactive({
  dataStore: [] as Stores[],
  dataModel: [] as Models[],
  dataMaker: [] as Makers[],
  dataTable: [] as Vehicles[],
  totalRecords: 0,
});

watch(
  [() => dataSearch.pageNum, () => dataSearch.pageSize],
  ([newPageNum, newPageSize], [oldPageNum, oldPageSize]) => {
    onChange();
  }
);
const onClickSearch = async () => {
  search();
};

const onClickClear = async () => {
  dataSearch.vehicleSeat = null;
  dataSearch.makerId = null;
  dataSearch.vehicleModel = null;
  dataSearch.storeId = null;
  fetchData_Vehicles();
};
const onChange = async () => {
  search();
  // fetchData_Vehicles();
};

onMounted(async () => {
  // Lấy data của bảng store
  const Data_Stores = await StoresService.getAll();
  state.dataStore = [...Data_Stores?.data?.stores_list];
  // Lấy data của bảng Model
  const Data_Models = await ModelService.getAll();
  state.dataModel = [...Data_Models?.data?.models_list];
  // Lấy data của bảng maker
  const Data_Makers = await MakersService.getAll();
  state.dataMaker = [...Data_Makers?.data?.makers_list];

  await fetchData_Vehicles();
});

/**
 * データをロードする
 */
const fetchData_Vehicles = async () => {
  try {
    const response = await VehiclesService.getAll(dataSearch);
    console.log("fetchData_Vehicles", response);
    if (response && response.data) {
      state.dataTable = response.data.vehicles_list;
      state.totalRecords = response.data.totalRecords;
    }
  } catch (error) {
    console.log(error);
  }
};

const search = async () => {
  try {
    state.dataTable = [];
    state.totalRecords = 0;
    const response = await VehiclesService.getByParam(dataSearch);

    state.dataTable = response.data.vehicles_list;
    state.totalRecords = response.data.totalRecords;
  } catch (error) {
    // Handle the error
  } finally {
    // TODO: Turn off loading flag or handle loading state
  }
};

const vehicleId = ref<number>(0);

const carDetailsState = reactive({ open: false });
const onClickCarDetail = () => {
  carDetailsState.open = false;
};
const ClickCarDetail = (clickedVehicleId: number | undefined) => {
  vehicleId.value = clickedVehicleId !== undefined ? clickedVehicleId : 0;
  carDetailsState.open = true;
};
</script>

<style lang="css" scoped>
.v-col.v-col-3.text-center.pt-7.pr-15 {
  padding: 0;
}
span.mdi.mdi-map-marker {
  font-size: 40px;
  color: royalblue;
}
span.mdi.mdi-account-outline {
  font-size: 40px;
}
span.mdi.mdi-star {
  font-size: 40px;
  color: darkorange;
}
span.mdi.mdi-car-cog {
  font-size: 40px;
}
span.mdi.mdi-wallet-travel {
  font-size: 40px;
}
span.mdi.mdi-check {
  font-size: 25px;
  color: rgb(13, 216, 13);
  float: right;
}
.d-flex.flex-column-reverse.bd-highlight {
  float: right;
}
button.v-btn.v-btn--elevated.v-theme--light.v-btn--density-default.v-btn--size-default.v-btn--variant-elevated {
  float: right;
  width: 150px;
  background-color: green;
  color: white;
}
h1.text-for-money {
  font-size: 2.5vw;
}
span.v-btn__content {
  color: black;
  font-size: 25px;
}
.v-overlay.v-overlay--active.v-theme--light.v-locale--is-ltr.v-dialog.v-overlay--scroll-blocked {
  padding-left: 10%;
}
</style>
