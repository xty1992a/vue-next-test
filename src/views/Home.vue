<template>
  <div class="home">
    <router-link to="/about">about</router-link>
    <Counter :value="count" @input="setNumber" />
    <p>{{ count }}</p>
    <List :loading="loading" :finished="finished" @load="onLoad">
      <div class="card" v-for="item in list" :key="item.key">
        <img
          src="https://h5.yunhuiyuan.cn/Images/ShopDiy/default_goods.png"
          alt=""
        />
        <div class="info">
          <p class="name">{{ item.title }}</p>
          <Counter :value="item.count" @input="(v) => setCount(item)(v)" />
        </div>
      </div>
    </List>
  </div>
</template>

<script>
import List from "@/components/List";
import Counter from "@/components/Counter/index";
import { ref } from "vue";
import { rdm } from "@/utils";

export default {
  name: "Home",
  setup(props, ctx) {
    const loading = ref(false);
    const finished = ref(false);
    const list = ref([]);
    const count = ref(0);

    const setCount = (item) => (v) => {
      console.log("set count", item, v);
      item.count = v;
      list.value = list.value.map((it) => (it.key === item.key ? item : it));
    };

    const onLoad = (e) => {
      if (list.value.length > 30) return;
      const last = list.value.slice(-1)[0] || 0;
      list.value.push(
        ...Array(10)
          .fill(0)
          .map((n, i) => ({ title: `item-${i + last}`, key: rdm(), count: 0 }))
      );
    };

    const setNumber = (value) => {
      console.log(value);
      count.value = value;
    };

    return {
      loading,
      finished,
      list,
      count,
      onLoad,
      setCount,
      setNumber,
    };
  },

  components: { List, Counter },
};
</script>

<style lang="less">
.home {
  background-color: #f7f7f7;

  .list {
    padding: 10px;
  }
  .card {
    height: 100px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
      height: 80px;
      width: 80px;
      flex-shrink: 0;
    }

    .info {
      height: 80px;
      flex: 1;
      padding-left: 10px;
    }
  }
}
</style>
