<script lang="tsx">
import { defineComponent } from 'vue'
import FullScreenContainer from '../components/fullScreenContainer.vue'
import ScreenContainer from '../components/ScreenContainer.vue'
import Drag from './drag.vue'
import Drag2 from './drag2.vue'
export default defineComponent({
  setup() {
    return () => [
      <FullScreenContainer width="1920" height="906">
        <Drag2 />
      </FullScreenContainer>
      // <Drag />
    ]
  }
})
</script>

<style lang="scss"></style>
