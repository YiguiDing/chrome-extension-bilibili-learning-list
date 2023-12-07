import axios from 'axios'
import { GetFavList_VO } from './types'
import { getCookieValByKey } from '@/utils'
import { bili_jct, bili_cookies } from '@/state'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://api.bilibili.com/x/v3'
bili_jct.value = getCookieValByKey('bili_jct') || bili_jct.value

export async function getFavList(parms: {
  media_id: number
  page_number?: number
  page_size?: number
  keyword?: string
}) {
  let { data } = await axios.get(`/fav/resource/list`, {
    params: {
      media_id: parms.media_id,
      pn: parms.page_number || 1,
      ps: parms.page_size || 20,
      keyword: parms.keyword || '',
      order: 'mtime',
      type: 0,
      tid: 0,
      platform: 'web',
    },
  })
  return (data as GetFavList_VO).data
}

export async function fav_resource_move(parms: {
  src_media_id: number
  tar_media_id: number
  resources_id: number
  resources_type: number
}) {
  let { data } = await axios.post(`/fav/resource/move`, undefined, {
    params: {
      src_media_id: parms.src_media_id,
      tar_media_id: parms.tar_media_id,
      resources: `${parms.resources_id}:${parms.resources_type}`,
      platform: 'web',
      csrf: getCookieValByKey('bili_jct'),
    },
  })
  return data
}

export async function resource_batch_del(parms: {
  media_id: number
  resources_id: number
  resources_type: number
}) {
  let { data } = await axios.post(`/fav/resource/batch-del`, undefined, {
    params: {
      media_id: parms.media_id,
      platform: 'web',
      resources: `${parms.resources_id}:${parms.resources_type}`,
      csrf: getCookieValByKey('bili_jct'),
    },
  })
  return data
}

export async function fav_resource_sort(parms: {
  media_id: number
  prev_id: number
  prev_type: number
  cur_id: number
  cur_type: number
}) {
  let { data } = await axios.post(`/fav/resource/sort`, undefined, {
    params: {
      media_id: parms.media_id,
      sort: `${parms.prev_id}:${parms.prev_type}:${parms.cur_id}:${parms.cur_type}`,
      csrf: getCookieValByKey('bili_jct'),
    },
  })
  return data
}
