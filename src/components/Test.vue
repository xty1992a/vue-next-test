<template>
  <div class="test">
    <button @click="sub">-</button>
    <span>{{ count }}</span>
    <button @click="add">+</button>
  </div>
</template>

<script>
import * as count from "./Counter/counter";
export default {
  name: "test",

  setup() {
    return {
      ...count,
    };
  },
};
</script>

<style lang="less" rel="stylesheet/less">
.test {
}
</style>
