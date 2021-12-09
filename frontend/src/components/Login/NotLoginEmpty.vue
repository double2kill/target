<script lang="ts" setup>
import { IosLogIn } from '@vicons/ionicons4'
import { NEmpty, NIcon, NButton } from 'naive-ui'
import { showLoginPopup } from './index'
</script>

<template>
  <n-empty
    description="未登录"
    class="not-login-empty"
  >
    <template #icon>
      <n-icon>
        <IosLogIn />
      </n-icon>
    </template>
    <template #extra>
      <n-button
        size="small"
        data-test-id="登录"
        @click="showLoginPopup"
      >
        登录
      </n-button>
    </template>
  </n-empty>
</template>

<style>
.not-login-empty {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
