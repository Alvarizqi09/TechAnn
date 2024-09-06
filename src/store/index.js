import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    keranjangs: []
  },
  getters: {
    jumlahPesanans(state) {
      return state.keranjangs.length
    },
    totalHarga(state) {
      return state.keranjangs.reduce((acc, keranjang) => {
        return acc + keranjang.jumlah_pesanan * keranjang.products.harga
      }, 0)
    }
  },
  mutations: {
    setKeranjangs(state, keranjangs) {
      state.keranjangs = keranjangs
    },
    deleteKeranjang(state, id) {
      state.keranjangs = state.keranjangs.filter((keranjang) => keranjang.id !== id)
    }
  },
  actions: {
    fetchKeranjangs({ commit }) {
      axios
        .get('http://localhost:3000/keranjangs')
        .then((response) => {
          commit('setKeranjangs', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteKeranjang({ dispatch }, id) {
      axios
        .delete('http://localhost:3000/keranjangs/' + id)
        .then(() => {
          alert('Product successfully deleted')

          // Directly update state after deletion
          dispatch('fetchKeranjangs') // Or call commit('setKeranjangs', new data) if available
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})

export default store
