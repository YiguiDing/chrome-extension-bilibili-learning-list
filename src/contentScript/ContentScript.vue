<script setup lang="ts">
import { ref } from 'vue'
import { fav_resource_move, resource_batch_del, fav_resource_sort } from '@/api'
import { showPanel, favlist_id_todo, favlist_id_done } from '@/state'
import { LayButton } from '@layui/layui-vue'
import { ElBadge } from 'element-plus'
import FavList from '@/component/FavList.vue'
import type { GetFavList_VO } from '@/api/types'

const tabval = ref(true)
const data1 = ref<GetFavList_VO['data']>()
const data2 = ref<GetFavList_VO['data']>()

async function move(
  fromId: number,
  toId: number,
  itemId: number,
  itemType: number,
  callback: Function,
) {
  await fav_resource_move({
    src_media_id: fromId,
    tar_media_id: toId,
    resources_id: itemId,
    resources_type: itemType,
  })
  callback && (await callback())
}
async function dele(
  media_id: number,
  resourcesID: number,
  resourcesType: number,
  callback: Function,
) {
  await resource_batch_del({
    media_id,
    resources_id: resourcesID,
    resources_type: resourcesType,
  })
  callback && (await callback())
}
async function sort(
  prev_id: number,
  prev_type: number,
  cur_id: number,
  cur_type: number,
  media_id: number,
  callback: Function,
) {
  await fav_resource_sort({ prev_id, prev_type, cur_id, cur_type, media_id })
  callback && (await callback())
}
</script>

<template>
  <main v-if="showPanel">
    <div class="tab">
      <div class="tab-header">
        <span :active="tabval" @click="tabval = true">
          <ElBadge
            type="danger"
            ripple
            :value="data1?.info.media_count"
            :hidden="data1?.info.media_count == 0"
          >
            {{ data1?.info.title }}
          </ElBadge>
        </span>
        <span :active="!tabval" @click="tabval = false">
          <ElBadge
            type="success"
            ripple
            :value="data2?.info.media_count"
            :hidden="data2?.info.media_count == 0"
          >
            {{ data2?.info.title }}
          </ElBadge>
        </span>
      </div>
      <div v-show="tabval" class="tab-content">
        <FavList :favlistId="favlist_id_todo" @load="data1 = $event">
          <template v-slot:default="{ item, reload, pprev }">
            <div class="buttons">
              <LayButton
                size="xs"
                @click="sort(0, 0, item.id, item.type, favlist_id_todo, reload)"
                type="primary"
                >移至最前
              </LayButton>
              <LayButton
                size="xs"
                @click="sort(pprev.id, pprev.type, item.id, item.type, favlist_id_todo, reload)"
                type="primary"
                >向上挪动</LayButton
              >
              <LayButton
                size="xs"
                @click="move(favlist_id_todo, favlist_id_done, item.id, item.type, reload)"
                type="primary"
                >移至已学</LayButton
              >
              <LayButton
                size="xs"
                @click="dele(favlist_id_todo, item.id, item.type, reload)"
                type="danger"
                >删除此项
              </LayButton>
            </div>
          </template>
        </FavList>
      </div>
      <div v-show="!tabval" class="tab-content">
        <FavList :favlistId="favlist_id_done" @load="data2 = $event">
          <template v-slot:default="{ item, reload, pprev }">
            <div class="buttons">
              <LayButton
                size="xs"
                @click="sort(0, 0, item.id, item.type, favlist_id_todo, reload)"
                type="primary"
                >移至最前
              </LayButton>
              <LayButton
                size="xs"
                @click="sort(pprev.id, pprev.type, item.id, item.type, favlist_id_done, reload)"
                type="primary"
                >向上挪动</LayButton
              >
              <LayButton
                size="xs"
                @click="move(favlist_id_done, favlist_id_todo, item.id, item.type, reload)"
                type="primary"
                >移至待学</LayButton
              >
              <LayButton
                size="xs"
                @click="dele(favlist_id_done, item.id, item.type, reload)"
                type="danger"
                >删除此项
              </LayButton>
            </div>
          </template>
        </FavList>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
main {
  z-index: 9999;

  position: fixed;
  right: 15px;
  top: calc(56px + 15px);

  width: 200px;
  min-height: 200px;
  max-height: 900px;
  height: fit-content;

  background-color: white;
  box-shadow: 0 0 3px 0px gray;
  border-radius: 5px;
  overflow: hidden;
}

.tab {
  width: 100%;

  .tab-header {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    span {
      flex: 1;
      height: 40px;

      box-sizing: border-box;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      &[active='true'] {
        color: #16b777;
        border-bottom: 2px solid #16b777;
      }
    }
  }

  .tab-content {
    width: 100%;
  }
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;

  & > * {
    flex: 1;
    width: 100%;

    margin: 0 !important;

    &:not(:nth-child(1)) {
      margin-top: 5px !important;
    }
  }
}
</style>
