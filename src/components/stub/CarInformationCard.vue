<template>
  <div v-if="listDataVehicals && listDataVehicals.length > 0">
    <v-card
      class="mx-auto elevation-5 mt-5"
      width="100%"
      v-for="item in listDataVehicals"
      :key:any="item"
    >
      <div class="d-flex justify-space-between">
        <div class="d-flex">
          <v-avatar class="ma-3" size="230" rounded="0">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
            ></v-img>
          </v-avatar>
          <div class="d-flex flex-column">
            <div class="d-flex mt-3">
              <v-card-title class="text-h3 font-weight-bold">
                {{ item.vehicleName }}
              </v-card-title>
              <p class="d-flex align-end">
                {{ item.vehicleDescribe }}
              </p>
            </div>
            <div class="d-flex text-h5 mt-5">
              <div class="flex-column">
                <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                  <v-icon icon="mdi mdi-account-outline" />
                  <p class="ml-3">{{ item.vehicleSeat }} chỗ</p>
                </div>
                <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                  <v-icon icon="mdi mdi-cog-outline" />
                  <p class="ml-3">{{ item.vehicleEngine }}</p>
                </div>
              </div>
              <div class="flex-column">
                <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                  <v-icon icon="mdi mdi-star" color="yellow" />
                  <p class="ml-3">{{ item.vehicleRating }}</p>
                </div>
                <div style="padding: 0.5rem 1rem" class="d-flex align-center">
                  <v-icon icon="mdi mdi-bag-carry-on" />
                  <p class="ml-3">{{ item.mileage }} km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex align-start mr-4 mt-1">
          <v-checkbox v-model="arrVehicalSelected" :value="item"></v-checkbox>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, reactive, watch } from "vue";
import Vehicles from "@/interfaces/Vehicles";
import { computed } from "vue";
var arrVehicalSelected = ref<any[]>([]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  listDataVehicals: {
    type: Array<Vehicles>,
    required: true,
  },
  infomationCarInCheckOut: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["arrVehicalSelected"]);

const CarInformation = ref();

onMounted(async () => {
  if (props.isOpen === true) {
    CarInformation.value = props.infomationCarInCheckOut;
  }
});

watch(() => props.listDataVehicals, async (newValue) => {
  arrVehicalSelected.value =  props.listDataVehicals
});

watch(arrVehicalSelected, async () => {
  emit("arrVehicalSelected", arrVehicalSelected.value);
});
</script>
