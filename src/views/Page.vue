<template>
  <div class="page">
    <button @click="show = !show">按钮</button>
    <transition name="fade">
      <component :is="show ? 'box1' : 'box'"></component>
    </transition>
  </div>
</template>

<script>
import { h } from "vue";
export default {
  name: "page",
  props: {},
  components: {
    box: () => <div class="box"></div>,
    box1: () => <div class="box"></div>,
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {},
  methods: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less" rel="stylesheet/less">
.page {
  .box {
    width: 100px;
    height: 100px;
    background-color: #f7f7f7;
  }
  .fade-enter-from {
    transform: scale(0);
  }
  .fade-leave-to {
    transform: scale(2);
    position: absolute;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: 1s;
  }
}
</style>
