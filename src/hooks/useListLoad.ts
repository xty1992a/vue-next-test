import { onMounted, onUnmounted, ref } from "vue";
import * as scroll from "@/utils/dom/scroll.ts";
import { throttle, debounce } from "@/utils/index.ts";

type result = {
  onReachBottom: Function;
};
type Options = {
  offset?: number;
};

const dftOptions: Options = {
  offset: 100,
};

export default (el: HTMLElement, options: Options = {}): result => {
  if (!el) return { onReachBottom: () => {} };
  options = { ...dftOptions, ...options };
  let loading = ref(false);
  let finished = ref(false);

  const scroller = scroll.getScroller(el);
  const scrollTop = scroll.getScrollTop(scroller);

  function check() {
    if (loading || finished) return;
    const allowHeight = scroll.getScrollAllowHeight(scroller);
    const top = scroll.getScrollTop(scroller);
    if ((options?.offset ?? 0) + top >= allowHeight) {
      console.log("reach bottom");
    }
  }

  const onScroll = throttle((e: Event) => {
    check();
  });
  const onScrollEnd = debounce((e: Event) => {
    console.log("scroll end", e);
  });

  scroller.addEventListener("scroll", onScroll);
  scroller.addEventListener("scroll", onScrollEnd);

  onUnmounted(() => {
    scroller.removeEventListener("scroll", onScroll);
    scroller.removeEventListener("scroll", onScrollEnd);
  });

  return {
    onReachBottom: () => {},
  };
};
