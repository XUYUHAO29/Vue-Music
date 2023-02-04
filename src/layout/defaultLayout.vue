<template>
  <div id="defaultLayout">
    <va-top-bar class="va-top-bar"/>
    <va-content class="va-content">
      <!-- <Transition name="handoff"> -->
        <slot></slot>
      <!-- </Transition> -->
    </va-content>
    <va-back class="va-back"/>
    <va-bottom-bar class="va-bottom-bar"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import VaTopBar from './TopNavigationBar';
import VaContent from './Content';
import VaBottomBar from './BottomMusicStatusBar.vue';
export default defineComponent({
  name: 'defaultLayout',
  components:{ 
    "va-top-bar": VaTopBar,
    "va-content": VaContent,
    "va-bottom-bar": VaBottomBar
  }
})
</script>

<style scoped>
.va-top-bar{
  position: fixed;
  top: 0;
  z-index: 99;
}
.va-bottom-bar{
  position: fixed;
  bottom: 0;
}
.va-back{
  position: fixed;
  top: 70px;
  left: 3px;
  z-index: 7;
  /* color: aqua; */
}
/* .handoff-enter-active {
  transition: all 1s ease-out;
}

.handoff-leave-active {
   transition: all 0.3s ease-out;
}

.handoff-enter-from,
.handoff-leave-to {
  opacity: 0;
} */
</style>