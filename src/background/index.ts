import { watch } from 'vue'

console.log('background is running!!!')

main()
async function main() {
  let { count } = await import('@/state')
  watch(count, (newVal, oldVal) => {
    console.log('background: count is changed  ' + newVal)
  })
  chrome.runtime.onMessage.addListener((request) => {
    if (request.type === 'COUNT') {
      console.log('background has received a message from popup, and count is ', request?.count)
    }
    return undefined
  })
}
