<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-card class="mx-auto" color="#e9ffed">
          <div>
            <v-card-title class="justify-center d-flex">
              <h3>
                <v-icon icon="mdi-check" color="green" class="me-2"></v-icon
                >Thanh Toán Thành Công
              </h3>
            </v-card-title>
          </div>

          <v-card-text class="pa-10 size text-h6">
            <p>Bạn đã thanh toán thành công hợp đồng giao dịch thuê xe</p>
            <p>
              Mã giao dịch thuê xe của bạn là
              <b>GD_000{{ Object.values(order.orderId)[0] }}</b>
            </p>
            <p>
              Hãy Đến địa điểm nhận xe đã chọn để nhận xe đúng thời gian trong
              hợp đồng. Mọi trường hợp nhận xe không đúng với thời gian nhận
              trong hợp đồng chúng tôi sẽ không chịu trách nhiệm
            </p>
            <div class="d-flex justify-center mt-5">
              <p>Quay về màn hình đặt xe sau {{ count }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "@/stores/index";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    let count = ref(5);
    // Sử dụng đối tượng user từ store
    const order = store.getters.getOrder;
    onMounted(() => {
      const timer = setInterval(() => {
        count.value--;
        if (count.value === 0) {
          clearInterval(timer);
          router.push("/car-search");
        }
      }, 1000);
    });

    return {
      order,
      count,
    };
  },
});
</script>
