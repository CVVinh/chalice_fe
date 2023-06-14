<template>
  <v-container>
    <div class="d-flex flex-wrap">
      <v-col :cols="12" class="pa-0">
        <slot name="searchForm"></slot>
      </v-col>
      <v-col :cols="12">
        <v-btn
          class="mr-4"
          variant="tonal"
          elevation="1"
          @click="$emit('onClear')"
        >
          Refesh
        </v-btn>
        <v-btn class="mr-4" color="secondary" @click="$emit('onSearch')">
          Tìm kiếm
        </v-btn>
      </v-col>
    </div>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

const emit = defineEmits(["onSearch", "onClear"]);
</script>

<style lang="scss" scoped>
.form-selection {
  width: 100%;
}

.expansion-area {
  height: 0px;
  transition: transform 0.5s ease-in-out;
}

.expanded {
  min-height: 100px;
  height: fit-content;
}

.mr-4 {
  float: right;
}
.v-container {
  padding: 20px;
}
</style>
