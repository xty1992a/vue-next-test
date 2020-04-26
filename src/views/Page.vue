<template>
  <div class="page">
    <Test v-model="number" />
  </div>
</template>

<script>
import Test from "@/components/Test";

export default {
  name: "page",
  props: {},
  components: { Test },
  data() {
    return {
      number: 0,
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
}
</style>
