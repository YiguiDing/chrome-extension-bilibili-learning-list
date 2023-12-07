<script setup lang="ts">
import { LaySwitch, LayForm, LayFormItem, LayInput } from '@layui/layui-vue'
import { showPanel, favlist_id_todo, favlist_id_done, removeAd } from '@/state'
</script>

<template>
  <header>
    <h3>哔哩哔哩学习清单</h3>
  </header>
  <main>
    <LayForm :pane="true" size="xs">
      <LayFormItem label="显示清单">
        <LaySwitch v-model="showPanel" />
      </LayFormItem>
      <LayFormItem label="待学清单">
        <LayInput v-model="favlist_id_todo" />
      </LayFormItem>
      <LayFormItem label="已学清单">
        <LayInput v-model="favlist_id_done" />
      </LayFormItem>
      <LayFormItem label="移除推荐">
        <LaySwitch v-model="removeAd" />
      </LayFormItem>
    </LayForm>
  </main>
  <footer>
    <p>
      <a target="_blank" href="https://github.com/YiguiDing/chrome-extension-bilibili-learning-list"
        >https://github.com/YiguiDing/chrome-extension-bilibili-learning-list</a
      >
    </p>
    <p>
      <a target="_blank" href="https://dingdingdang.online">https://dingdingdang.online</a>
    </p>
  </footer>
</template>

<style scoped lang="less">
header {
  padding: 20px;
  padding-bottom: 0;
  text-align: center;
  font-weight: 400;
}

main {
  width: 250px;
  min-height: 200px;
  height: fit-content;
  padding: 20px;
}

footer {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 0;

  a {
    font-size: 0.5rem;
    color: #666;
    text-decoration: none;
  }
}
</style>
