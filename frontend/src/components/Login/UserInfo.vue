<script lang="ts" setup>
import {NSpace, NButton} from 'naive-ui'
import LoginPopup from './LoginPopup.vue'
import {showLoginPopup} from './index'
import {loginUser, handleLogout} from './loginUser'
</script>

<template>
  <n-space>
    <span v-if="loginUser.用户名">
      {{ loginUser.用户名 }}
      <n-button
        type="primary"
        data-test-id="登出"
        text
        @click="handleLogout"
      >
        登出
      </n-button>
    </span>
    <!-- <n-button
      v-else
      data-test-id="登录"
      size="small"
      @click="showLoginPopup"
    >
      登录
    </n-button> -->
    <LoginPopup />
  </n-space>
</template>