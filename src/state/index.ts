import { createRefSyncWithStorage } from '@/utils'

const count = await createRefSyncWithStorage('count', 0)

const showPanel = await createRefSyncWithStorage('showPanel', true)
const favlist_id_todo = await createRefSyncWithStorage('favlist_id_todo', 0)
const favlist_id_done = await createRefSyncWithStorage('favlist_id_done', 0)

const removeAd = await createRefSyncWithStorage('removeAd', false)
const cmd_task_id = await createRefSyncWithStorage('cmd_task_id', -1)
const bili_jct = await createRefSyncWithStorage('bili_jct', '')
const bili_cookies = await createRefSyncWithStorage('bili_cookies', '')

export {
  count,
  showPanel,
  favlist_id_todo,
  favlist_id_done,
  removeAd,
  cmd_task_id,
  bili_jct,
  bili_cookies,
}
