<template>
  <div class="popup-container">
    <div @click="toggle">
      <slot></slot>
    </div>
    <div class="popup" v-show="isShow" ref="popup">
      <div class="popup-header">
        <span class="popup-title">{{title}}</span>
        <a class="popup-header-close" @click="toggle">
          <i class="icon icon-close"></i>
        </a>
      </div>

      <div class="popup-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TPopup',
  props: {
    title: {
      type: String,
      default: '菜单'
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    toggle() {
      // 这里设置后，视图不是立即渲染的，所以在 DOM 更新后操作，就用 $nextTick()
      this.isShow = !this.isShow
      // DOM 还没有更新
      let $popup = this.$refs.popup;
      this.$nextTick(() => {
        // DOM 更新了
        let $popupRect = $popup.getBoundingClientRect()
        let left = 0
        if ($popupRect.right > window.innerWidth) {
          left = -$popupRect.width + this.$el.offsetWidth;
        }
        $popup.style.left = left + 'px'
      })
    }
  }
}
</script>