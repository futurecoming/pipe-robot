<template>
  <div id="inspecting">
    <el-radio-group v-model="modeRadio" fill="#47cced" @change="changeMode">
      <el-radio-button label="全自动巡检"></el-radio-button>
      <el-radio-button label="半自动巡检"></el-radio-button>
      <el-radio-button label="手动巡检"></el-radio-button>
    </el-radio-group>
    <div class="video">
      <el-aside v-if="asideShow" width="158px">
        <div class="robot">
          <el-dropdown>
            <span class="el-dropdown-link r_title el-icon-caret-bottom">机器人名称</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="r in robots"
                :key="r.id"
                @click.native="selectRobot(r)"
              >{{r.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <p class="r_name">{{curRobot.name}}</p>
        </div>
        <ul>
          <el-popover
            v-for="item in menus"
            :key="item"
            placement="right"
            width="480"
            trigger="click"
            @show="onPopoverShow(item)"
          >
            <el-card>
              <div slot="header">
                <span>{{item === '信息报警' ? item+'设定值' : item}}</span>
                <i
                  class="el-icon-close"
                  style="float: right; padding: 3px 0; cursor:pointer"
                  @click="closePopover"
                ></i>
              </div>
              <div class="fn-area">
                <template v-if="item === '任务计划'">
                  <MissionScheduler @close="closePopover" />
                </template>

                <template v-else-if="item === '信息回传'">
                  <Sensor @close="closePopover" />
                </template>

                <template v-else-if="item === '信息显示'">
                  <MsgShow @close="closePopover" />
                </template>

                <template v-else-if="item === '信息报警'">
                  <Warning @close="closePopover" />
                </template>
              </div>
            </el-card>
            <li slot="reference">{{item}}</li>
          </el-popover>
        </ul>
      </el-aside>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as types from "../store/action-types";
import MissionScheduler from "@/components/MissionScheduler";
import Sensor from "@/components/Sensor";
import MsgShow from "@/components/MsgShow";
import Warning from "@/components/Warning";

export default {
  components: {
    MissionScheduler,
    Sensor,
    MsgShow,
    Warning,
  },
  data() {
    return {
      modeRadio: "全自动巡检",
      pendingList: [],
    };
  },
  computed: {
    ...mapState({
      curRobot: (state) => state.machine.curRobot,
      robots: (state) => state.machine.robots,
      missions: (state) => state.mission.missions,
      sensors: (state) => state.sensor.sensors,
    }),
    menus() {
      if (this.modeRadio === "全自动巡检") {
        return [
          "任务计划",
          "信息回传",
          "信息显示",
          "实时视频流",
          "信息报警",
          "事件记录",
          "返回充电",
        ];
      } else if (this.modeRadio === "半自动巡检") {
        return [
          "运动指令",
          "信息回传",
          "信息显示",
          "实时视频流",
          "信息报警",
          "事件记录",
          "返回充电",
        ];
      } else {
        return
      }
    },
    asideShow() {
      let isShow = true;
      if (this.modeRadio === "手动巡检") {
        isShow = false
      }
      return isShow
    }
  },
  async created() {
    await this[types.GET_ALL_SENSORS]();
  },
  methods: {
    ...mapMutations({
      [types.SET_CUR_MACHINE]: `machine/${[types.SET_CUR_MACHINE]}`,
    }),
    ...mapActions({
      [types.GET_AUTO_MISSIONS]: `mission/${[types.GET_AUTO_MISSIONS]}`,
      [types.GET_ALL_SENSORS]: `sensor/${[types.GET_ALL_SENSORS]}`,
      [types.GET_SENSOR_FROM_MACHINE]: `sensor/${[
        types.GET_SENSOR_FROM_MACHINE,
      ]}`,
    }),
    changeMode() {},
    onPopoverShow(e) {
      if (e === "任务计划") {
        this[types.GET_AUTO_MISSIONS](this.curRobot.id);
      }
      if (e === "信息回传" || e === "信息报警") {
        this[types.GET_SENSOR_FROM_MACHINE](this.curRobot.id);
      }
    },
    closePopover() {
      document.getElementById("app").click();
    },
    selectRobot(cur) {
      this[types.SET_CUR_MACHINE](cur);
    },
  },
};
</script>

<style lang="less">
.el-popover {
  padding: 0 !important;
  .el-card {
    border: none;
    max-height: 830px;
    overflow-y: auto;
    .el-card__body {
      padding: 15px 0;
    }
  }
}

.fn-area {
  .el-form {
    padding: 0 7%;
  }
  .comfirm-btn {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
    width: 73px;
    background: #47cced;
    color: white;
    &:hover,
    &:focus {
      background: #47cced;
      color: white;
    }
  }
}

#inspecting {
  padding: 20px;
  height: 100%;
  .el-radio-group {
    margin-bottom: 20px;
  }
  .video {
    width: 85vw;
    height: 80vh;
    padding: 2px;
    background: url("../assets/images/map.png") no-repeat;
    background-size: 100%;
    .el-aside {
      height: 350px;
      padding: 3px;
      text-align: center;
      .robot {
        border-bottom: 1px solid #c9ccd3;
        padding: 10px 20px;
        line-height: 30px;
        .r_title {
          color: #bbc6fc;
          font-size: 1.1rem;
        }
        .r_name {
          font-size: 1rem;
          color: #2c2a3f;
          font-weight: bold;
        }
      }
      ul {
        text-align: center;
        font-size: 0.9rem;
        li {
          &:focus {
            background: #7598ea;
            color: #fff;
          }
          height: 35px;
          line-height: 35px;
          padding-left: 0;
        }
      }
    }
  }
}
</style>
