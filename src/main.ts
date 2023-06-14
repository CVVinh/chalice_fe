import App from './App.vue'
import { createApp } from 'vue'
import { store, key } from './stores'
import { registerPlugins } from '@/plugins'
import router from "./router";
import VcRegister from '@/components/commons/_vc-register'
import 'flag-icons/css/flag-icons.min.css';
import 'v-phone-input/dist/v-phone-input.css';
import { createVPhoneInput } from 'v-phone-input';
const vPhoneInput = createVPhoneInput({
  countryIconMode: 'svg',
  displayFormat: 'international'
});

const app = createApp(App)
VcRegister.register(app)
registerPlugins(app)
app.use(store, key)
app.use(vPhoneInput);
app.use(router).mount('#app')
