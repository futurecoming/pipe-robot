import * as types from '../action-types';

export default {
  state: {
    isMountedRoutes: false,
    asyncRoutes: []
  },
  mutations: {
    [types.SET_ROUTES]: (state, routes) => {
      state.isMountedRoutes = true
      state.asyncRoutes = routes;
    }
  },
  actions: { //构建路由的函数
    async [types.GENERATE_ROUTES]({
      commit, dispatch
    }, role) {
      let res = await dispatch(`permit/${types.GET_ROLE_PERMIT}`, role.id, {root: true});
      let asyncRoutes = res.map(v => {
        return {
          code: v.code,
          name: v.name
        }
      })
      console.log(asyncRoutes)

      return new Promise(resolve => {
        commit(types.SET_ROUTES, asyncRoutes);
        resolve(asyncRoutes)
      })
    }
  }
}
