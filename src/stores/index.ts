import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  message: string;
  statusResponse: number | null;
  order: {
      orderId: number | null,
    },
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    message: "",
    statusResponse: null,
    order: {
      orderId: null,
    },
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    setStatusResponse(state, status) {
      state.statusResponse = status;
    },
    setOrder(state, newOrder) {
      state.order = newOrder;
  },
  },
  getters: {
    getMessage(state) {
      return state.message;
    },
    getStatusResponse(state) {
      return state.statusResponse;
    },
    getOrder(state){
      return state.order
    }
  },
  actions: {
    setMessage({ commit }, message) {
      commit("setMessage", message);
    },
    setStatusResponse({ commit }, status) {
      commit("setStatusResponse", status);
    },
    setOrder({commit},Order){
      commit("setOrder",Order)
    }
  },
});
export function useStore() {
  return baseUseStore(key);
}
