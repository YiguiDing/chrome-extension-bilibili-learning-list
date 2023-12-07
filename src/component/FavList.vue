<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { getFavList } from '@/api'
import type { GetFavList_VO } from '@/api/types'
import { LayCard, LayScroll, LayTooltip } from '@layui/layui-vue'
import { ElEmpty, ElPagination } from 'element-plus'
let { favlistId } = defineProps(['favlistId'])
let emits = defineEmits<{
  (event: 'load', data: GetFavList_VO['data']): void
}>()
let currentPage = ref(1)
let pageSize = ref(10)
const favlist = ref<GetFavList_VO['data'] | undefined>()
async function loadData() {
  favlist.value = await getFavList({
    media_id: favlistId,
    page_number: currentPage.value,
    page_size: pageSize.value,
  })
  emits('load', favlist.value)
}
async function reload() {
  await loadData()
}
onMounted(loadData)
watchEffect(loadData)
</script>
<template>
  <template v-if="favlist && favlist?.medias?.length > 0">
    <LayScroll class="scroll" height="600px" style="background-color: whitesmoke" thumbColor="gray">
      <LayTooltip position="left" v-for="(item, idx) in favlist.medias">
        <template v-slot:content>
          <slot
            :pprev="favlist.medias[idx - 2] || { id: 0, type: 0 }"
            :item="item"
            :reload="reload"
          />
        </template>
        <template v-slot:default>
          <LayCard class="card" shadow="hover">
            <img class="cover" :src="item.cover" />
            <p class="title">
              <a :href="`https://www.bilibili.com/video/${item.bv_id}`">{{ item.title }}</a>
            </p>
          </LayCard>
        </template>
      </LayTooltip>
    </LayScroll>
    <div class="pagination" v-if="favlist.info.media_count > pageSize">
      <ElPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="favlist.info.media_count"
        :pager-count="3"
        small
        background
        hide-on-single-page
        layout="prev, pager, next"
      />
    </div>
  </template>
  <ElEmpty v-else description="和你的小脑瓜一样空空的" />
</template>
<style scoped lang="less">
.scroll {
  width: 100%;

  .card {
    width: 100%;
  }
}

.card {
  width: 100%;
  max-width: 100%;
  display: flex;

  .cover {
    width: 100%;
    max-width: 100%;
    border-radius: 5px;
    box-shadow: 0 0 1px 0 gray;
    overflow: hidden;
  }

  .title {
    width: 100%;
    max-width: 100%;
    padding-top: 10px;
  }
}

.pagination {
  width: 100%;
  padding: 10px 0;

  & > * {
    width: fit-content; // 居中
    margin: 0 auto; // 居中
  }
}
</style>

<style lang="less">
.layui-scroll {
  .layui-scroll-track {
    opacity: 0;
  }

  &:hover {
    .layui-scroll-track {
      opacity: 1;
    }
  }
}
</style>
