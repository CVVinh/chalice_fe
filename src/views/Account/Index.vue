<template>
    <v-container>
        <h2 class="title">THÔNG TIN KHÁCH HÀNG</h2>
    </v-container>
    <v-container>
        <div class="elevation-5">
            <v-form class="pb-3">
                <v-container>
                    <h3>Thông tin tài khoản</h3>
                </v-container>
                <v-row class="custom-row">
                    <v-col cols="2">
                        <v-text-field
                            label="Mã tài khoản"
                            variant="underlined"
                            density="compact"
                        />
                    </v-col>
                    <v-col cols="2">
                        <vc-input
                            label="Tên tài khoản"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            label="Địa chỉ email"
                            variant="underlined"
                            density="compact"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            label="ID tài khoản liên kết"
                            variant="underlined"
                            density="compact"
                        />
                    </v-col>
                </v-row>
            </v-form>
        </div>
    </v-container>
    <v-container>
        <div class="elevation-5">
            <v-form class="pb-3">
                <v-container>
                    <h3>Thông tin cơ bản</h3>
                </v-container>
                <v-row class="custom-row">
                    <v-col cols="2">
                        <v-text-field
                            label="Mã thông tin"
                            variant="underlined"
                            density="compact"
                        />
                    </v-col>
                    <v-col cols="2">
                        <vc-input
                            label="Họ và tên"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            label="Địa chỉ liên lạc"
                            variant="underlined"
                            density="compact"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            label="Số điện thoại"
                            variant="underlined"
                            density="compact"
                        />
                    </v-col>
                    <!-- <v-col cols="2">
                        <v-text-field
                            label="Email"
                            variant="underlined"
                            density="compact"
                        />
                    </v-col> -->
                    <v-col cols="2">
                        <v-text-field
                            label="số fax"
                            variant="underlined"
                            density="compact"
                        />
                    </v-col>
                </v-row>
                <v-row class="custom-row">
                    <v-col cols="2">
                        <v-text-field
                            label="Địa điểm giao xe"
                            variant="underlined"
                            density="compact"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-select
                            label="Tỉnh"
                            variant="underlined"
                            density="comfortable"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="Ghi chú"
                            variant="underlined"
                            density="compact"
                        />
                    </v-col>
                </v-row>
            </v-form>
        </div>
    </v-container>
</template>
<script setup lang="ts">
import ColumnAttributes from "@/interfaces/response/column-attributes.model";
import { onMounted, reactive, Ref, ref } from "vue";
import accountService from '@/services/account.service'
import TabCommon from '@/interfaces/tab-common';

const accountDetails = [
    { tabName: "AccountManagement", tabTitle: "Thông tin" }
] as TabCommon[];
// let dataSearch = ref({

// })
// const state = reactive({
//     total: 10,
//     tableAttrs: {
//         labels: ["ID", "name"],
//         fields: [""],
//         clickableColumn: [false, false, true],
//         columnsWidth: [120],
//     } as ColumnAttributes,
//     tableHeight: 370,
//     dataTable: [] as any,
// })
// onMounted(() => {
    
// })
// const fetchData = async () => {
//     cons response = await accountService.getList()
// }
</script>
<style lang="scss" scoped>
.border-table {
    border: thin solid black;
}
.custom-row {
    padding: 0px 16px;
}
.title {
    color: rgb(51, 189, 243);
}
</style>
