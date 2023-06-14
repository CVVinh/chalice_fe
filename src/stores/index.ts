import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  message: string,
  statusResponse: number | null
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    message: '',
    statusResponse: null
  },
  mutations: {
    setMessage(state:any, message:any) {
      state.message = message;
    },
    setStatusResponse(state:any, status:any) {
      state.statusResponse = status;
    }
  },
  getters: {
    getMessage(state:any) {
      return state.message;
    },
    getStatusResponse(state:any) {
      return state.statusResponse;
    }
  },
  actions: {
    setMessage({commit }:any, message:any) {
      commit('setMessage', message);
    },
    setStatusResponse({ commit }:any, status:any) {
      commit('setStatusResponse', status);
    }
  }
})
export function useStore () {
  return baseUseStore(key);
}
