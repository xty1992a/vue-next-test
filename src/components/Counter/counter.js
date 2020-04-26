import { ref } from "vue";

export const count = ref(0);
export const add = () => {
  count.value++;
};

export const sub = () => {
  count.value--;
};
