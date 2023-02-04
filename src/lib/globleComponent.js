import VASingleSongList from "../components/VASingleSongList.vue";
import VAGridDisplay from "../components/VAGridDisplay.vue"
import VABack from "../components/VABack.vue"
export default {
  install(app) {
    app.component("va-single-songList", VASingleSongList);
    app.component("va-grid-display", VAGridDisplay)
    app.component("va-back", VABack)
  }
};
