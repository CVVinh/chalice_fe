<template>
    <div class="p-2 bd-highlight">
        <v-btn variant="elevated" @click="ClickCarDetail"> Xem xe </v-btn>
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
import { reactive, ref, onMounted } from "vue";

const vehicleId = ref<number>(0);

const carDetailsState = reactive({ open: false })
const onClickCarDetail = () => {
    carDetailsState.open = false
}
const ClickCarDetail = () => {
    vehicleId.value = 3
    carDetailsState.open = true
}
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
}
</style>
