<template>
  <div
    id="home"
    v-loading="wsLoading"
    element-loading-text="当前网络异常，正在尝试重连..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-container>
      <el-header height="80px">
        <div>
          <span class="title fl"><svg-icon iconClass="robot" style="margin-right: 10px"></svg-icon>机器人系统管理平台</span>
        </div>
        <div class="fr">
          <span class="username">{{userName}}</span>
          <a href="#" @click.prevent="logout" class="logout" style="color: skyblue">退出</a>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
      </el-header>
      <el-container>
        <el-aside width="225px" class="noScrollBar">
          <ul>
            <router-link tag="li" to="/overview">
              <i class="icon el-icon-copy-document"></i>运维总览
            </router-link>
            <router-link tag="li" to="/monitor">
              <i class="icon el-icon-help"></i>机器人监控管理
            </router-link>
            <router-link tag="li" to="/inspecting">
              <i class="icon el-icon-date"></i>巡检任务管理
            </router-link>
            <router-link tag="li" to="/repair">
              <i class="icon el-icon-document"></i>运维工单管理
            </router-link>
            <router-link tag="li" to="/report">
              <i class="icon el-icon-monitor"></i>系统报表
            </router-link>
            <!-- <router-link tag="li" to="/expert">
              <i class="icon el-icon-connection"></i>专家协助模式
            </router-link> -->
            <router-link tag="li" to="/account">
              <i class="icon el-icon-wallet"></i>账户管理
            </router-link>
            <router-link tag="li" to="/role">
              <i class="icon el-icon-setting"></i>角色权限管理
            </router-link>
          </ul>
        </el-aside>
        <el-main class="noScrollBar">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getSession } from "@/utils/local";
import { mapState, mapMutations, mapActions } from "vuex";
import * as types from "../store/action-types";
import WS from "@/utils/ws";

export default {
  data() {
    return {
      userName: "",
      wsLoading: false,
    };
  },
  computed: {
    ...mapState({
      robots: (state) => state.machine.robots,
      curRobot: (state) => state.machine.curRobot,
      statistics: (state) => state.notification.statistics,
      warning: (state) => state.notification.warning,
    }),
    totalRows() {
      return this.robots.length;
    },
  },
  async created() {
    this.userName = getSession("userName");
    const callbacks = {
      cbOnOpen: this.onWsOpen,
      cbOnClose: this.onWsClose,
      cbOnError: this.onWsError,
      cbOnMessage: this.onWsMessage,
      cbOnReconnect: this.onWsReconnect,
    };
    let wsClient = new WS(callbacks);
    wsClient.createWebSocket();
    await this[types.GET_ALL_ROLES]();
    await this[types.GET_ALL_MACHINES]();
    await this[types.GET_FAULT_TYPE]();
  },
  methods: {
    ...mapMutations({
      [types.SET_STATICTIS]: `notification/${[types.SET_STATICTIS]}`,
      [types.SET_WARNING]: `notification/${[types.SET_WARNING]}`,
    }),
    ...mapActions({
      [types.GET_ALL_ROLES]: `role/${[types.GET_ALL_ROLES]}`,
      [types.USER_LOGOUT]: `account/${[types.USER_LOGOUT]}`,
      [types.GET_ALL_MACHINES]: `machine/${[types.GET_ALL_MACHINES]}`,
      [types.GET_FAULT_TYPE]: `maintain/${[types.GET_FAULT_TYPE]}`,
    }),
    logout() {
      this[types.USER_LOGOUT]()
        .then(() => {
          this.$message.success("退出成功!");
          this.$router.push("/login");
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
    
    onWsOpen() {
      this.wsLoading = false;
    },
    onWsClose() {
      this.wsLoading = true;
    },
    onWsError() {},
    onWsMessage(data) {
      if (data !== "heart") {
        this[types.SET_STATICTIS](JSON.parse(data));
      }
    },
    onWsReconnect() {},
  },
};
</script>

<style lang="less">
#home {
  .el-loading-spinner {
    font-size: 3rem !important;
    .el-loading-text {
      font-size: 3rem !important;
    }
  }
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-main {
    padding: 0;
  }
  .el-header {
    border-bottom: 1px solid #c9ccd3;
    background-color: #fefefe;
    line-height: 80px;
    .el-avatar {
      width: 60px;
      height: 60px;
      // margin-top: 8px;
      vertical-align: middle;
    }
    .username {
      // line-height: 80px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .el-aside {
    background-color: #fff;
    height: 100%;
    box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.1);
    padding: 7px;
    z-index: 9;
    ul {
      li {
        height: 70px;
        line-height: 70px;
        padding-left: 20px;
        a {
          color: #303133; // 主要文本颜色
        }
        .icon {
          vertical-align: middle;
          font-size: 24px;
          line-height: 69px;
          margin-right: 8px;
        }
      }
    }
  }
}
.logout {
  margin-right: 10px;
}
.noScrollBar {
  scrollbar-width: none; //火狐可以用这个
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  &::-ms-scrollbar {
    display: none;
  }
  &:-ms-scrollbar {
    display: none;
  }
  &::-o-scrollbar {
    display: none;
  }
  &::scrollbar {
    display: none;
  }
  &:scrollbar {
    display: none;
  }
}
</style>
