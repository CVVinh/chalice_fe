<template>
  <v-card class="mx-auto elevation-5" width="100%">
    <div class="d-flex">
      <v-avatar class="ma-3" size="230" rounded="0">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
      </v-avatar>

      <div>
        <div class="d-flex flex-column">
          <div class="d-flex mt-3">
            <v-card-title class="text-h3 font-weight-bold">
              <div v-if="getByIdVehicles">
                {{ getByIdVehicles ? getByIdVehicles.vehicleName : "" }}
              </div>
              <div v-else>
                {{ CarInformation ? CarInformation.vehicleName : "no data" }}
              </div>
            </v-card-title>

            <p class="d-flex align-end" v-if="getByIdVehicles">
              {{ getByIdVehicles ? getByIdVehicles.vehicleDescribe : "" }}
            </p>
            <p class="d-flex align-end" v-else>
              {{ CarInformation ? CarInformation.vehicleDescribe : "no data" }}
            </p>
          </div>
          <div class="d-flex text-h5 mt-5">
            <div class="flex-column">
              <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                <v-icon icon="mdi mdi-account-outline" />
                <p v-if="getByIdVehicles">
                  {{ getByIdVehicles ? getByIdVehicles.vehicleSeat : "" }} chỗ
                </p>
                <p v-else>
                  {{ CarInformation ? CarInformation.vehicleSeat : "no data" }}
                </p>
              </div>
              <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                <v-icon icon="mdi mdi-cog-outline" />
                <p v-if="getByIdVehicles">
                  {{ getByIdVehicles ? getByIdVehicles.vehicleEngine : "" }}
                </p>
                <p v-else>
                  {{
                    CarInformation ? CarInformation.vehicleEngine : "no data"
                  }}
                </p>
              </div>
            </div>
            <div class="flex-column">
              <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                <v-icon icon="mdi mdi-star" color="yellow" />
                <p v-if="getByIdVehicles">
                  {{ getByIdVehicles ? getByIdVehicles.vehicleRating : "" }}
                </p>
                <p v-else>
                  {{
                    CarInformation ? CarInformation.vehicleRating : "no data"
                  }}
                </p>
              </div>
              <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                <v-icon icon="mdi mdi-bag-carry-on" />
                <p v-if="getByIdVehicles">
                  {{ getByIdVehicles ? getByIdVehicles.mileage : "" }} dặm
                </p>
                <p v-else>
                  {{ CarInformation ? CarInformation.mileage : "no data" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, reactive, watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  getByIdVehicles: {
    type: Object,
    required: true,
  },
  infomationCarInCheckOut: {
    type: Object,
    required: true,
  },
});
const CarInformation = ref();
onMounted(() => {
  if (props.isOpen === true) {
    CarInformation.value = props.infomationCarInCheckOut;
  }
});
</script>
