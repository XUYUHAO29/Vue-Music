import { defineStore } from "pinia";
// import api from "@/utils/api_method";
import  TopJson from "../../public/js/TopBarItemList.json"
export const useTopItemLists = defineStore("topItemsLists", {
  state: () => ({
    Itemlists: {}
  }),
  getters: {
    getterTopItemlists(state){
      return state.Itemlists
    }
  },
  actions: {
    getTopItemlists() {
      this.Itemlists = TopJson
      console.log(this.Itemlists)
    }
  }
});
