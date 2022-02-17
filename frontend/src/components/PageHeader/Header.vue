<script lang="ts" setup>
import { NPageHeader, NMenu, MenuOption } from 'naive-ui'
import { ref, h, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import {是手机设备} from '../../utils/navigator'
import { 用户已登录 } from '../Login/loginUser'
import UserInfo from '../Login/UserInfo.vue'

import AddNewTarget from './AddNewTarget.vue'


const activeKey = ref('首页')

const renderRouterLinkLabel = (option: MenuOption) => {
  const {label, key} = option
  return h(
    RouterLink,
    {
      to: {
        name: String(key)
      }
    },
    { default: () => label }
  )
}

const 第二个菜单 = 是手机设备()
  ? {
    label: '表格',
    key: '表格'
  }
  : {
    label: '手机端',
    key: '手机端',
  }

const menuOptions = [
  {
    label: '首页',
    key: '首页',
  },
  第二个菜单,
  {
    label: '统计',
    key: '统计',
  },
]

const route = useRoute()

watch(route, () => {
  activeKey.value = String(route.name)
})

</script>

<template>
  <div class="target-header">
    <n-page-header>
      <template #title>
        <a
          href="/"
          style="text-decoration: none; color: inherit; margin-right: 25px;"
        >Target</a>
        <AddNewTarget v-if="用户已登录" />
        <n-menu
          v-model:value="activeKey"
          class="target-menu"
          mode="horizontal"
          :render-label="renderRouterLinkLabel"
          :options="menuOptions"
        />
      </template>
      <template #extra>
        <UserInfo />
      </template>
    </n-page-header>
  </div>
</template>

<style>
.target-header {
  padding: 15px;
  border-bottom: 1px solid rgb(239, 239, 245);
}
.target-menu {
  margin-left: 50px;
}
@media (max-width: 800px){
  .target-menu  {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 2px solid rgb(239, 239, 245);
    margin-left: 0;
    text-align: center;
    z-index: 10;
    background-color: white;
  }
  .n-menu.n-menu--horizontal .n-menu-item {
    width: 50%;
    height: 60px;
  }
  .n-menu.n-menu--horizontal .n-menu-item + .n-menu-item {
    border-left: 1px solid rgb(239, 239, 245);
  }
}
</style>