import { removeAd } from '@/state'
import { watch } from 'vue'

watch(removeAd, (val) => {
  if (val) {
    action_removeAd_TODO()
  } else {
    action_removeAd_UNDO()
  }
})

let store: string[] = []

function action_removeAd_TODO() {
  let div1 = document.querySelector('main.bili-feed4-layout') as HTMLDivElement
  let div2 = document.querySelector('div.header-channel-fixed') as HTMLDivElement
  let div3 = document.querySelector('div.bili-header__channel') as HTMLDivElement

  // 存储样式
  store.push(div1.style.display)
  store.push(div2.style.display)
  store.push(div3.style.display)

  div1.style.display = 'none'
  div2.style.display = 'none'
  div3.style.display = 'none'
}

function action_removeAd_UNDO() {
  let div1 = document.querySelector('main.bili-feed4-layout') as HTMLDivElement
  let div2 = document.querySelector('div.header-channel-fixed') as HTMLDivElement
  let div3 = document.querySelector('div.bili-header__channel') as HTMLDivElement

  // 恢复样式
  div1.style.display = store.shift() || ''
  div2.style.display = store.shift() || ''
  div3.style.display = store.shift() || ''
}
