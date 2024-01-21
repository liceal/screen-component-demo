<script lang="tsx">
/*
  <研发中>

  基于父级块的等比缩放

*/

import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'

// interface ScreenContainerProps {
//   height: number //正常高度
//   width: number //正常宽度
// }

export default defineComponent({
  props: {
    screenWidth: {
      type: Number,
      default: 1920
    },
    screenHeight: {
      type: Number,
      default: 906
    },
    height: {
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 300
    }
  },
  setup(props, ctx) {
    const { screenWidth, screenHeight, width, height } = props
    const scaleX = ref()
    const scaleY = ref()
    const container = ref<HTMLElement>()
    const parentW = ref()
    const parentH = ref()

    // 获取等比容器的父级容器相对大小
    const getParentWH = () => {
      const parent = container.value.parentElement
      parentW.value = parent.offsetWidth
      parentH.value = parent.offsetHeight
    }

    const cpStype = computed(() => {
      return {
        width: `${parentW.value}px`,
        height: `${parentH.value}px`,
        // widht: '100%',
        // height: '100%',
        transform: `scale(${scaleX.value},${scaleY.value})`
      }
    })

    const initClientWH = () => {
      getParentWH()

      scaleX.value = window.innerWidth / screenWidth
      scaleY.value = window.innerHeight / screenHeight
    }
    onMounted(() => {
      initClientWH()
      window.addEventListener('resize', initClientWH)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', initClientWH)
    })

    return () => (
      <div style="width: 250px;height:250px">
        <div ref={container} class="screen-container" style={cpStype.value}>
          hello
        </div>
      </div>
    )

    // 正常宽高 做计算用
    // const W = computed(() => {
    //   return props.width || window.innerWidth
    // })
    // const H = computed(() => {
    //   return props.height || window.innerHeight
    // })

    // const clientW = ref()
    // const clientH = ref()

    // const initClientWH = () => {
    //   clientW.value = window.innerWidth
    //   clientH.value = window.innerHeight
    // }

    // const cpStyle = computed(() => {
    //   console.log(clientH, clientW)

    //   const scale_x = clientW.value / W.value
    //   const scale_y = clientH.value / H.value

    //   // 容器可视高度
    //   const cW = W.value * scale_x
    //   const cH = H.value * scale_y

    //   return {
    //     screen: {
    //       transform: `scale(${scale_x}, ${scale_y})`,
    //       width: `${W.value}px`,
    //       height: `${H.value}px`
    //     },
    //     cScreen: {
    //       width: `${cW}px`,
    //       height: `${cH}px`
    //     }
    //   }
    // })

    // onMounted(() => {
    //   initClientWH()
    //   window.addEventListener('resize', initClientWH)
    // })
    // onUnmounted(() => {
    //   window.removeEventListener('resize', initClientWH)
    // })
    // return () => (
    //   <div style={cpStyle.value.cScreen}>
    //     <div class="screen-container" style={cpStyle.value.screen}>
    //       {ctx.slots.default && ctx.slots.default()}
    //     </div>
    //   </div>
    // )
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
