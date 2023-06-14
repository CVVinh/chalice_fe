<template>
  <div class="pa-4 d-inline-flex justify-space-between">
    <v-img height="70" width="70" src="/assets/images/logo.png"></v-img>
    <div class="align-self-center text-h5 pa-4">PC-LCM</div>
  </div>
  <v-divider></v-divider>
  <v-list>
    <v-list-group v-for="nav_list in navLists" :key="nav_list.name">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" active-color="primary"
          ><v-icon :icon="nav_list.icon" class="mr-2" />{{
            nav_list.name
          }}</v-list-item
        >
      </template>
      <v-list-item
        active-color="primary"
        v-if="nav_list.lists"
        v-for="nav_list_item in nav_list.lists"
        :key="nav_list_item.id"
        :title="nav_list_item.name"
        :value="nav_list_item.id"
        :to="nav_list_item.link ?? undefined"
      />
    </v-list-group>
  </v-list>
</template>

<script setup lang="ts">
const navLists = [
  {
   name: "お客様管理",
    icon: "mdi-account",
    lists: [
      {
        id: "account",
        name: "Thông tin",
        link: "/account",
      },
      {
        id: "maker-management",
        name: "メーカー管理",
        link: "",
      },
    ],
  },
  {
    name: "予約一覧管理",
    icon: "mdi-cart",
    lists: [
      {
        id: "vehicle-management",
        name: "車両管理",
        link: "",
      },
      {
        id: "maker-management",
        name: "メーカー管理",
        link: "",
      },
    ],
  },
  {
    name: "車情報管理",
    icon: "mdi-car-side",
    lists: [],
  },
  {
    name: "Tìm kiếm xe",
    icon: "mdi mdi-car-search",
    lists: [
      {
        id: "Car",
        name: "Car",
        // link: "/Makers",
        link: "/car-search",
      },
      {
        id: "Makers",
        name: "Makers",
        link: "/makers",
      },
    ],
  },
  {
    name: "オプション管理",
    icon: "mdi-brightness-5",
    link: "",
  },
  {
    name: "売上管理",
    icon: "mdi-store",
    link: "",
  },
  {
    name: "Checkout",
    icon: "mdi-store",
    lists: [
      {
        id: "PaymentInformation",
        name: "Payment Management",
        link: "/payment_management",
      },
    ],
  },
  {
    name: "Chi tiết xe",
    icon: "mdi-car-side",
    lists: [
      {
        id: "car-details",
        name: "Car Details",
        link: "/car-details",
      }
    ]
  },
];
</script>
