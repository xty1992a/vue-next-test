<template>
  <div class="date-panel" ref="el">
    <div class="cell-list month-block">
      <span>{{ fmtDate(date) }}</span>
      <div class="month-btn">
        <Icon name="arrow_up" @click="subMonth" />
        <Icon name="arrow_down" @click="addMonth" />
      </div>
    </div>

    <div class="cell-list week-list">
      <div class="cell-item" :key="item" v-for="item in weeks">
        <span>{{ item }}</span>
      </div>
    </div>

    <DateList :list="dateList" />

    <Mask :position="position" />
  </div>
</template>

<script>
import { ref, computed, watchEffect, h, reactive, toRefs } from "vue";
import dayjs from "dayjs";
import useMousePosition from "@/hooks/useMousePosition";
import Icon from "@/components/Icon.vue";
const fmt = (fmtString) => (date) =>
  dayjs(date).isValid() ? dayjs(date).format(fmtString) : date;
const fmtDay = fmt("YYYY-MM-DD");

function Mask(props) {
  const position = props.position;
  const style = computed(() => {
    const size = Math.max(position.width, position.height) * 2;
    const isEnter = position.enter;
    return {
      transform: `translate(${position.x - size / 2}px, ${
        position.y - size / 2
      }px)`,
      backgroundImage: isEnter
        ? `radial-gradient(transparent, rgba(0, 0, 0, 1) 60px, #000)`
        : "",
      backgroundColor: isEnter ? "" : "#000",
      width: size ? size + "px" : "100%",
      height: size ? size + "px" : "100%",
    };
  });

  return <div class="mask" style={style.value} />;
}

function DateList(props) {
  // 日期数组中间的值,必然是本月
  const middleDay = props.list[Math.ceil(props.list.length / 2)];
  const mDayMonth = middleDay.month();
  const getClass = (item) =>
    ["date-cell", item.month() === mDayMonth && "current-month"]
      .filter(Boolean)
      .join(" ");

  return (
    <div class="cell-list date-list">
      {props.list.map((item) => (
        <div class="cell-item" key={item.toString()}>
          <div class={getClass(item)}>
            <span>{item.date()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default {
  props: {
    radius: {
      type: Number,
      default: 60,
    },
  },
  components: { Mask, DateList, Icon },
  setup(props, ctx) {
    const el = ref(null);
    const position = useMousePosition(el);
    const date = ref(dayjs().toDate());
    const dateList = ref([]);
    const fmtDate = fmt("YYYY年M月");

    const setDate = (isAdd) => () => {
      date.value = isAdd
        ? dayjs(date.value).add(1, "month")
        : dayjs(date.value).subtract(1, "month");
    };

    watchEffect(() => {
      dateList.value = getDateList(date);
    });

    return {
      dateList,
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      date,
      position,
      el,
      fmtDate,
      addMonth: setDate(true),
      subMonth: setDate(false),
    };
  },
};

// 生成日历表
function getDateList(date) {
  // 本月第一天
  const day0 = dayjs(date.value).startOf("month");
  console.log(fmtDay(day0));
  // 本月第一个星期的星期日
  const firstDay = day0.subtract(day0.get("day"), "day");
  // 星期数,以上月剩余天数+本月天数
  const rows = 6; //Math.ceil((day0.get("day") + day0.daysInMonth()) / 7);
  return Array(rows * 7)
    .fill(0)
    .map((n, i) => firstDay.add(i, "day"));
}
</script>

<style lang="less" rel="stylesheet/less">
.tooltip {
  position: fixed;
  top: 0;
  left: 0;
  color: #000;
}

.date-panel {
  position: relative;
  user-select: none;
  overflow: hidden;
  width: 350px;
  padding: 10px;
  background-color: #000;
  color: #fff;

  .month-block {
    position: relative;
    z-index: 1;
    padding: 10px 18px;
    justify-content: space-between;
    span {
      color: #fff;
    }
    .month-btn {
      margin-right: -10px;
      svg {
        cursor: pointer;
        margin: 0 10px;
      }
    }
  }

  .cell-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    .cell-item {
      width: 14.286%;
      &:hover {
        position: relative;
        z-index: 1;
      }
      span {
        z-index: 1;
        position: relative;
      }
    }
  }
  .week-list {
    .cell-item {
      line-height: 24px;
      padding: 5px 0;
    }
  }

  .date-list {
    .cell-item {
      padding: 2px;
      .date-cell {
        height: 42px;
        border: 2px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
      }
      .current-month {
        color: #fff;
      }
    }
  }

  .mask {
    width: 200%;
    height: 200%;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
