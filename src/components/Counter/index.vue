<template>
  <div class="counter">
    <button @click="sub">-</button>
    <input
      type="text"
      @focus="(e) => e.target.select()"
      @input.stop="setValue"
      :value="vValue"
    />
    <button @click="add">+</button>
  </div>
</template>

<script>
import { computed } from "vue";
import { limit } from "@/utils";

export default {
  name: "counter",
  props: {
    value: Number,
    max: {
      type: Number,
      default: 100,
    },
    min: {
      type: Number,
      default: 0,
    },
  },

  setup(props, ctx) {
    const limitFn = limit(props.min, props.max);
    const vValue = computed({
      get() {
        return props.value;
      },
      set(v) {
        console.log("set vValue", v);
        ctx.emit("input", limitFn(v));
      },
    });
    const setValue = (e) => {
      const value = e.target.value;
      const oldValue = props.value;

      if (!/^-?[0-9]+\.?[0-9]*$/.test(value)) {
        e.target.value = oldValue;
        return;
      }
      vValue.value = +value;
      if (+value !== vValue.value) {
        e.target.value = vValue.value;
      }
    };
    const update = (v) => {
      vValue.value = v;
    };
    const add = () => {
      vValue.value++;
    };
    const sub = () => {
      vValue.value--;
    };

    return {
      vValue,
      add,
      sub,
      update,
      setValue,
    };
  },
};
</script>

<style lang="less" rel="stylesheet/less">
.counter {
  --border-color: #e5e5e5;
  font-size: 20px;
  width: fit-content;

  button {
    font-size: inherit;
    box-sizing: border-box;
    background-color: transparent;
    width: 1.5em;
    height: 1.5em;
    padding: 0;
    outline: transparent;
    border: 1px solid var(--border-color);
    position: relative;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
    }

    &:active {
      &:before {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }

  input {
    font-size: inherit;
    width: 3em;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid var(--border-color);
    height: 1.5em;
    margin: 0 0.1em;
    outline: transparent;
  }
}
</style>
