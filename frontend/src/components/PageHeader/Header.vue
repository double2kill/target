<script lang="ts" setup>
import { NPageHeader, NMenu, MenuOption } from 'naive-ui'
import { ref, h, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

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

const menuOptions = [
  {
    label: '首页',
    key: '首页',
  },
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
          style="margin-left: 50px"
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
</style>