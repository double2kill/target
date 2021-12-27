<script lang="ts" setup>
import PageHeader from './components/PageHeader/Header.vue'
import GlobalMessageContent from './components/GlobalMessageContent.vue'
import { NMessageProvider } from 'naive-ui'
import { loginUser } from './components/Login/loginUser'
import NotLoginEmpty from './components/Login/NotLoginEmpty.vue'
</script>

<template>
  <PageHeader />
  <div class="target-content">
    <router-view
      v-if="loginUser.用户名"
    />
    <NotLoginEmpty v-else />
  </div>
  <n-message-provider>
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
</style>