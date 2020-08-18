<template>
  <div class="msg-wrapper">
    <div v-for="msg in msgs" :key="msg.type">
      {{msg.type}}
      <template v-if="msg.type === '空气质量传感器'">
        <div class="air" v-for="(pm, i) in msg.value" :key="i">
          . {{pm.type}}
          <span>{{pm.value}}</span>
        </div>
      </template>
      <template v-else>
        <span>{{msg.value}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgs: {
        air: {
          type: "空气质量传感器",
          value: [
            {
              type: "pm1",
              value: "900（ug/m3)",
            },
            {
              type: "pm2.5",
              value: "900（ug/m3)",
            },
            {
              type: "pm10",
              value: "900（ug/m3)",
            },
          ],
        },
        oxygen: {
          type: "氧气浓度传感器",
          value: "10%",
        },
        humidity: {
          type: "湿度传感器",
          value: "25%RH",
        },
        CO: {
          type: "一氧化碳传感器",
          value: "400ppm",
        },
        CH4: {
          type: "甲烷气体传感器",
          value: "7000ppm",
        },
        temperature: {
          type: "温度传感器",
          value: "40 ℃",
        },
        smog: {
          type: "烟雾传感器",
          value: "600ppm",
        },
        H2S: {
          type: "硫化氢传感器",
          value: "120ppm",
        },
      },
    }
  }
};
</script>

<style lang="less">
.msg-wrapper {
    padding: 0 35px;
    margin-top: -10px;
    line-height: 40px;
    span {
      float: right;
    }
    .air {
      margin-left: 30px;
    }
  }
  .warning-type {
    margin-bottom: 30px;
    p {
      margin-bottom: 15px;
    }
  }
</style>