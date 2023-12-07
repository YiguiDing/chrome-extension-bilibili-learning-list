import { watch, Ref, ref } from 'vue'

export async function createRefSyncWithStorage<T>(valName: string, initVal: T) {
  return await new Promise<Ref<T>>((resolve) => {
    let valRef = ref()

    // init
    chrome.storage.sync.get(valName, (result) => {
      if (result[valName] != undefined) {
        valRef.value = result[valName]
      } else {
        valRef.value = initVal
      }
      // 初始化完毕后直接返回
      resolve(valRef)
    })

    chrome.storage.onChanged.addListener((changes) => {
      if (changes[valName] != undefined) {
        let newVal = changes[valName].newValue
        let oldVal = changes[valName].oldValue
        valRef.value = newVal
      }
    })

    watch(valRef, (newVal) => {
      let obj = {} as any
      obj[valName] = newVal
      chrome.storage.sync.set(obj)
    })
  })
}

export function getCookieValByKey(t: string) {
  var e = new RegExp('(^| )' + t + '=([^;]*)(;|$)').exec(document.cookie)
  if (e) return decodeURIComponent(e[2])
}
