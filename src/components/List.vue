<template>
  <div class="list">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, defineComponent, h } from "vue";
import { debounce } from "utils/index.ts";
import { SetupContext } from "vue";
import useListLoad from "@/hooks/useListLoad.ts";

export default defineComponent({
  props: {
    finished: Boolean,
    loading: Boolean,
  },
  setup(props, ctx) {
    const vm = getCurrentInstance();
    onMounted(() => {
      const el = vm?.ctx.$el;
      if (!(el instanceof HTMLElement)) return;
      const { onReachBottom } = useListLoad(el);
      onReachBottom(() => {
        ctx.emit("load");
      });
    });
    console.log(props, ctx);
    ctx.emit("load");
  },
});
</script>

<style lang="less" rel="stylesheet/less">
.list {
}
</style>
