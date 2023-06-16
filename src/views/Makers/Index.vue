<template>
  <div class="elevation-15">
    <v-card-text>
      <v-file-input
        accept="image/*"
        v-model="state.chosenFile"
        label="Choose a file"
        @change="handleFileChange($event)"
      ></v-file-input> </v-card-text
    ><v-card-text
      ><img v-if="state.data" :src="state.data" alt=""
    /></v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn right @click="importImage">Read File</v-btn>
    </v-card-actions>

    <v-card width="600" height="300" raised>
      <v-card-title>File contents:</v-card-title>
      <v-card-text><img v-if="data" alt="" /></v-card-text>
    </v-card>
  </div>
</template>

<script>
import { computed, onMounted, watch, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      chosenFile: null,
      data: null,
    });
    function handleFileChange(event) {
      state.chosenFile = event.target.files[0];
      console.log("state.chosenFile", state.chosenFile);
    }
    function importImage() {
      const file = state.chosenFile;
      if (file instanceof Blob) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          state.data = reader.result;
        };
      } else {
        console.error("Invalid file");
      }
    }

    return {
      state,
      importImage,
    };
  },
};
</script>
