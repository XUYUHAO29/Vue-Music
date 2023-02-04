<template>
  <div id="routerContent">
    <canvas id="canvas"></canvas>
    <div id="backdrop"></div>
      <!-- <Transition name="handoff"> -->
        <slot></slot>
      <!-- </Transition> -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import "../static/css/canvasBackground.css"
import "../static/js/canvasBackground.js"
export default defineComponent({
  name: "va-content",
});
</script>

<style scoped>
#routerContent {
  width: 100%;
  margin-top: 63px;
  /* background-color: red; */
  overflow-y: hidden;
}
/* .handoff-enter-active {
  transition: all 0.3s ease-out;
}

.handoff-leave-active {
   transition: all 0.3s ease-out;
}

.handoff-enter-from,
.handoff-leave-to {
  opacity: 0;
} */
</style>