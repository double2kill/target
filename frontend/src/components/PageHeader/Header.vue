<script lang="ts" setup>
import { NPageHeader } from 'naive-ui'

import { 用户已登录 } from '../Login/loginUser'
import UserInfo from '../Login/UserInfo.vue'

import AddNewTarget from './AddNewTarget.vue'
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