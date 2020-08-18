import * as sensor from '@/api/sensor';
import * as types from '../action-types';

export default {
  state: {
    sensors: [],
    cur_machine_sensorIds: [],
    cur_machine_sensor_value: []
  },
  mutations: {
    [types.SET_ALL_SENSORS](state, sensors) {
      state.sensors = sensors;
    },
    [types.CUR_MACHINE_SENSORIDS](state, ids) {
      state.cur_machine_sensorIds = ids;
    },
    [types.CUR_MACHINE_SENSOR_VALUE](state, value) {
      state.cur_machine_sensor_value = value;
    }
  },
  actions: {
    async [types.GET_ALL_SENSORS]({
      commit
    }) {
      try {
        const {
          data
        } = await sensor.getAll();
        commit(types.SET_ALL_SENSORS, data);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async [types.GET_SENSOR_FROM_MACHINE]({
      commit
    }, machineId) {
      try {
        const sensorEnum = {
          TEMPERATURE: "temperature_",
          HUMIDITY: "humidity_",
          OXYGEN: "oxygen_",
          CO: "CO_",
          SMOKE: "smog_",
          METHANCE: "CH4_",
          PM1: "pm1_",
          PM25: "pm25_",
          PM10: "pm10_",
          HYDROTHION: "H2S_",
        };
        let ret = [],
          valueList = {};
        const {
          data
        } = await sensor.getModuleFromMachine(machineId);
        if (data.length !== 0) {
          ret = data.map((item) => item.id);
          data.forEach((item) => {
            for (const [k, v] of Object.entries(sensorEnum)) {
              if (item.type === k) {
                valueList[`${v}min`] = item.minValue;
                valueList[`${v}max`] = item.maxValue
              }
            }
          });
        }
        commit(types.CUR_MACHINE_SENSOR_VALUE, valueList)
        commit(types.CUR_MACHINE_SENSORIDS, ret)
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async [types.SET_SENSORS_FOR_MACHINE]({
      commit
    }, payload) {
      try {
        await sensor.setModulesForMachine(payload);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async [types.SET_SENSOR_VALUE]({
      commit
    }, payload) {
      try {
        await sensor.setValue(payload);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
}
