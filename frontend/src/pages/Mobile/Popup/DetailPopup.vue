
<script setup lang ="ts">
import {Popup, ConfigProvider} from 'vant'

import {themeVars} from '../theme'

import Detail from './Detail.vue'
import {是否显示详情弹出层} from './logic'
import Menu from './Menu.vue'

</script>

<template>
  <Popup
    v-model:show="是否显示详情弹出层"
    position="right"
    :style="{ width: '100%', 'z-index': 10000, height: '100%' }"
    teleport="body"
  >
    <ConfigProvider :theme-vars="themeVars">
      <Menu />
      <Detail />
    </ConfigProvider>
  </Popup>
</template>