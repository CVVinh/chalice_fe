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
              {{getByIdVehicles? getByIdVehicles.vehicleName: ''}} 
            </v-card-title>

            <p class="d-flex align-end">{{getByIdVehicles?getByIdVehicles.vehicleDescribe:''}}</p>
          </div>
          <div class="d-flex text-h5 mt-5">
            <div class="flex-column">
              <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                <v-icon icon="mdi mdi-account-outline" />
                <p>{{getByIdVehicles?getByIdVehicles.vehicleSeat:''}} chỗ</p>
              </div>
              <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                <v-icon icon="mdi mdi-cog-outline" />
                <p>{{getByIdVehicles?getByIdVehicles.vehicleEngine:''}}</p>
              </div>
            </div>
            <div class="flex-column">
              <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                <v-icon icon="mdi mdi-star" color="yellow" />
                <p>{{getByIdVehicles?getByIdVehicles.vehicleRating:''}}</p>
              </div>
              <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                <v-icon icon="mdi mdi-bag-carry-on" />
                <p>{{getByIdVehicles?getByIdVehicles.mileage:''}} dặm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, watch } from "vue";
import VehiclesResponse from "@/interfaces/response/vehicles-response.model";

const props = defineProps({
  getByIdVehicles: {
    type: Object,
    required: true,
  },
});

</script>
