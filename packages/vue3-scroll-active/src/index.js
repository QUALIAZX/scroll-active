// src/index.js

import VScrollActive from '@/components/VScrollActive.vue'

export { VScrollActive } //实现按需引入

const components = [VScrollActive]

const install = function (app) {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default { install } // 实现批量引入
