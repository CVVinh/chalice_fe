<template>
  <div class="elevation-15">
    <v-content>
      <v-container fill-height>
        <v-row justify="center">
          <v-col cols="auto">
            <v-card width="600" height="300" raised>
              <v-card-title>Ví dụ về v-file-input trong Vuetify:</v-card-title>
              <br />
              <v-card-text>
                <v-file-input
                  accept="image/*"
                  label="Nhấp vào đây để chọn một hình ảnh"
                  outlined
                  v-model="chosenFile"
                >
                </v-file-input>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn right @click="importImage">Đọc File</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card width="600" height="300" raised>
              <v-card-title>Nội dung File:</v-card-title>
              <v-card-text>
                <img v-if="imageUrl" :src="imageUrl" alt="" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card width="600" height="300" raised>
              <v-card-title>Nội dung File:</v-card-title>
              <v-card-text v-for="img in state.dataTable" :key="img.vehicleId">
                <img :src="img.image" alt="" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import VehiclesImageService from "@/services/vehicle_image.service";
import VehiclesImage from "@/interfaces/Vehicles-image";
import { log } from "console";

const chosenFile = ref<File[]>([]);
const imageUrl = ref<string | null>(null);

const state = reactive({
  dataTable: [] as VehiclesImage[],
  totalRecords: 0,
});
const dataSearch = reactive({
  vehicleId: null,
  vehicleImageid: null,
  pageNum: 1,
  pageSize: 5,
});

const importImage = async (): Promise<void> => {
  if (chosenFile.value) {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      imageUrl.value = fileReader.result as string;
      console.log("imageUrl", imageUrl.value);

      try {
        const payload = {
          image: imageUrl.value,
          imagePath: imageUrl.value,
        };

        const response = await VehiclesImageService.add(payload);
        console.log("fetchData", response);
        if (response && response.data) {
          state.dataTable = response.data.vehicle_img_list;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fileReader.readAsDataURL(chosenFile.value[0]);
    console.log("chosenFile", chosenFile.value[0]);
  }

  // if (chosenFile.value) {
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     imageUrl.value = fileReader.result as string;
  //     console.log("imageUrl", imageUrl.value);
  //   };
  //   fileReader.readAsDataURL(chosenFile.value[0]);
  //   console.log("chosenFile", chosenFile.value[0]);
  // }
};

onMounted(async () => {
  // await addData();
});

const addData = async (): Promise<void> => {
  try {
    const response = await VehiclesImageService.add(dataSearch);
    console.log("fetchData", response);
    if (response && response.data) {
      state.dataTable = response.data.vehicle_img_list;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
