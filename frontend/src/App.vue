<script lang="ts" setup>
import { NMessageProvider } from 'naive-ui'
import { ConfigProvider } from 'vant'

import GlobalMessageContent from './components/GlobalMessageContent.vue'
import { loginUser } from './components/Login/loginUser'
import NotLoginEmpty from './components/Login/NotLoginEmpty.vue'
import PageHeader from './components/PageHeader/Header.vue'
import {themeVars} from './pages/Mobile/theme'

</script>

<template>
  <n-message-provider>
    <PageHeader />
    <ConfigProvider :theme-vars="themeVars">
      <div class="target-content">
        <router-view
          v-if="loginUser.用户名"
        />
        <NotLoginEmpty v-else />
      </div>
    </ConfigProvider>
    <GlobalMessageContent />
  </n-message-provider>
</template>

<style>
.target-content {
  position: fixed;
  top: 65px;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
}

@media (max-width: 800px){
  .target-content {
    bottom: 60px;
  }
}

</style>