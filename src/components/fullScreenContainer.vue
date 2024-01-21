<script lang="tsx">
/*
  基于全屏的等比适应
  height  正常比率高
  widht   正常比率宽
*/

import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  props: {
    height: {
      type: Number
    },
    width: {
      type: Number
    }
  },
  setup(props, ctx) {
    // 正常宽高 做计算用
    const W = computed(() => {
      return props.width || window.innerWidth
    })
    const H = computed(() => {
      return props.height || window.innerHeight
    })

    const clientW = ref()
    const clientH = ref()

    const initClientWH = () => {
      clientW.value = window.innerWidth
      clientH.value = window.innerHeight
    }

    const cpStyle = computed(() => {
      const scale_x = clientW.value / W.value
      const scale_y = clientH.value / H.value

      // 容器可视高度
      const cW = W.value * scale_x
      const cH = H.value * scale_y

      return {
        screen: {
          transform: `scale(${scale_x}, ${scale_y})`,
          width: `${W.value}px`,
          height: `${H.value}px`
        },
        cScreen: {
          width: `${cW}px`,
          height: `${cH}px`
        }
      }
    })

    onMounted(() => {
      initClientWH()
      window.addEventListener('resize', initClientWH)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', initClientWH)
    })
    return () => (
      <div style={cpStyle.value.cScreen}>
        <div class="screen-container" style={cpStyle.value.screen}>
          {ctx.slots.default && ctx.slots.default()}
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.screen-container {
  background-color: pink;
  transform-origin: left top;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
