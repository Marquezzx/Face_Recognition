import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
const fs = require("fs");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    databaseImages: [],
    resultImages: []
  },
  getters: {
    databaseImages: state => state.databaseImages,
    resultImages: state => state.resultImages
  },
  mutations: {
    loadImages(state) {
      fs.readdir(process.cwd() + "/src/assets/images/database", (err, files) => {
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        state.databaseImages = files;
      });
    },
    resetResultImages(state) {
      state.resultImages = []
    }
  },
  actions: {
    searchImage({ state }, payload) {
      let image = {
        path: payload.path
      }
      Axios.post('recognition', image).then((res) => {
        router.push("/result")
        state.resultImages.push(res.data)
      })
        .catch((error) => {
          console.error(error);
        });
    }
  }
})
