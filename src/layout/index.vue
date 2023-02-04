<template>
  <defaultLayout>
      <router-view v-slot = "{ Component }">
        <Transition name="handoff">
            <keep-alive>
              <component v-if="$route.meta.keepAlive" :key="$route.name" :is="Component"/>
            </keep-alive>
        </Transition>
        <Transition name="handoff">
          <component v-if="!$route.meta.keepAlive" :key="$route.name" :is="Component"/>
        </Transition>
      </router-view>
  </defaultLayout>
</template>

<script>
import { defineComponent } from "vue";
import defaultLayout from "./defaultLayout"
export default defineComponent({
  components:{ defaultLayout }
})
</script>

<style scoped>
.handoff-enter-active {
  transition: all 1s ease-out;
}

.handoff-leave-active {
   transition: all 0.3s ease-out;
}

.handoff-enter-from,
.handoff-leave-to {
  opacity: 0;
}
</style>