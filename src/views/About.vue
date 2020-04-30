<script>
import { h } from "vue";
import Calendar from "@/components/Calendar";
export default {
  setup() {},
  render: (ctx) => (
    <div class="about">
      <Calendar />
      <Calendar />
    </div>
  ),
};
</script>

<style lang="less" rel="stylesheet/less">
.about {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .box {
    width: 100px;
    height: 100px;
    border: 1px solid #e5e5e5;
    margin: 10px;
  }
}
</style>
