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
    },
    clearKeranjang(state) {
      state.keranjangs = []
    }
  },
  actions: {
    fetchKeranjangs({ commit }) {
      axios
        .get('https://be-vue-node.vercel.app/api/keranjangs')
        .then((response) => {
          commit('setKeranjangs', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    deleteKeranjang({ dispatch }, id) {
      axios
        .delete('https://be-vue-node.vercel.app/api/keranjangs/' + id)
        .then(() => {
          alert('Product successfully deleted')

          // Directly update state after deletion
          dispatch('fetchKeranjangs') // Or call commit('setKeranjangs', new data) if available
        })
        .catch((error) => {
          console.log(error)
        })
    }, // Di dalam actions di store
    async checkout({ commit, dispatch }) {
      try {
        const response = await axios.post('https://be-vue-node.vercel.app/api/checkout')

        // Clear keranjang di state Vuex
        commit('clearKeranjang')

        // Jika perlu refresh data dari server
        await dispatch('fetchKeranjangs')

        return response.data
      } catch (error) {
        // Handle error
        if (error.response) {
          throw new Error(error.response.data.message || 'Checkout gagal')
        }
        throw new Error('Koneksi jaringan bermasalah')
      }
    }
  }
})

export default store
