<template>
  <div class="container-table elevation-5 mt-4">
    <!-- <CommonTable
      :column-attrs="state.tableAttrs"
      :data="state.dataTable"
      :total="state.total"
      :tableHeight="state.tableHeight"
      v-model:page-size="dataSearch.pageSize"
      v-model:pageNum="dataSearch.pageNum"
      @page="fetchData"
      @click-detail="handleAddEditItem"
      @on-add-item="handleAddEditItem()"
      @refresh-data="fetchData"
    /> -->
    <CommonTable
      :column-attrs="state.tableAttrs"
      :data="state.dataTable"
      :total="state.total"
      :tableHeight="state.tableHeight"
      v-model:page-size="dataSearch.pageSize"
      v-model:pageNum="dataSearch.pageNum"
    />
  </div>
</template>

<script setup lang="ts">
import vcInput from "@/components/commons/vc-input.vue";
import vcSelect from "@/components/commons/vc-select.vue";
import { computed, onMounted, reactive, Ref, ref } from "vue";
import ColumnAttributes from "@/interfaces/response/column-attributes.model";
import CommonTable from "@/components/custom-table/index.vue";
import Makers from "@/interfaces/Makers";
import MakerService from "@/services/makers.service";
import { log } from "console";

const state = reactive({
  total: 0,
  tableAttrs: {
    labels: ["makerId", "makerName"],
    fields: ["makerId", "makerName"],
    clickableColumn: [true],
    columnsWidth: [100, 250, 250, 250],
  } as ColumnAttributes,
  tableHeight: 370,
  dataTable: [] as Makers[],
});

const dataSearch = reactive({
  makerId: null,
  makerName: null,
  area: null,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
});

onMounted(() => {
  fetchData();
});

/**
 * データをロードする
 */
const fetchData = async (isSearch = false) => {
  try {
    if (isSearch) {
      dataSearch.pageNum = 1;
    }
    const response = await MakerService.getAll(dataSearch);
    console.log("data", response);
    if (response && response.data) {
      state.dataTable = response.data.makers_list;
      state.total = response.data.totalRecords;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
