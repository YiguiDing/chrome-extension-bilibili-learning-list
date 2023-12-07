import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

export default defineManifest({
  name: packageData.name,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo.png',
    32: 'img/logo.png',
    48: 'img/logo.png',
    128: 'img/logo.png',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  options_page: 'options.html',
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo.png',
  },
  content_scripts: [
    {
      matches: ['*://*.bilibili.com/*'],
      js: ['src/contentScript/index.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo.png'],
      matches: [],
    },
  ],
  permissions: ['storage', 'cookies'],
  host_permissions: ['*://*.bilibili.com/*'],
  update_url:
    'https://raw.githubusercontent.com/YiguiDing/chrome-extension-bilibili-learning-list/main/updates.xml',
})
