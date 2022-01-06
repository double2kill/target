<script lang="ts" setup>
import { NMenu, NLayout, NLayoutSider, MenuOption } from 'naive-ui'
import { watch, h, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

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
    label: '目标列表',
    key: '目标列表',
  },
  {
    label: '用户',
    key: '用户',
  },
]

const route = useRoute()
const activeKey = ref(String(route.name))

</script>

<template>
  <n-layout
    has-sider
    style="height: 100%;"
  >
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="140"
      show-trigger
    >
      <n-menu
        v-model:value="activeKey"
        :render-label="renderRouterLinkLabel"
        :options="menuOptions"
      />
    </n-layout-sider>
    <n-layout>
      <router-view />
    </n-layout>
  </n-layout>
</template>