<template>
  <RouterView class="app" />
</template>
<script lang="ts" setup>
</script>
<style>
.app {
  background-color: #000;
  min-height: 100vh;
}


.el-input__count {
  background-color: #0000 !important;
}

.el-select {
  width: 80%;
  margin-bottom: 8px;
  height: 42px;
  line-height: 42px;
  font-size: 18px;
}

.el-textarea__inner {
  margin-bottom: 8px;
  line-height: 42px;
  background-color: #0000;
  font-size: 18px;
}

.el-select__wrapper {
  line-height: 42px;
  height: 42px;
  background-color: #0000;
  color: #aaa;
  font-size: 18px;
}

.el-input__wrapper {
  width: 80%;
  height: 42px;
  font-size: 18px;
  color: #aaa;
  background-color: #0000;
}

.el-button {
  margin: 8px;
  margin-top: 32px;
  height: 42px;
  font-size: 18px;
  width: 80%;
  background-color: #0000;
  border: 1px solid #fff;
  border-radius: 21px;
}

.el-button:hover {
  color: #fff;
  border-color: #aaa;
  background-color: #aaa;
  outline: 0;
}
</style>