<template>
  <div
    class="list-wrap list-wrap-content"
    :class="{'list-adding': listAdding}"
    :data-order="data.order"
  >
    <div class="list-placeholder" ref="listPlaceholder"></div>

    <div class="list" ref="list">
      <div class="list-header" ref="listHeader">
        <textarea
          v-model="data.name"
          class="form-field-input"
          ref="newBoardListName"
          @mousemove.prevent
          @blur="editListName"
        ></textarea>
        <div class="extras-menu" @mousemove.prevent>
          <span class="icon icon-more"></span>
        </div>
      </div>
      
      <div class="list-cards">
        <t-card v-for="card of cards" :key="card.id" :card="card"></t-card>

        <div class="list-card-add-form">
          <textarea class="form-field-input" placeholder="为这张卡片添加标题……" ref="newListName"></textarea>
        </div>
      </div>

      <div class="list-footer">
        <div class="list-card-add" @click="showListCardAddForm">
          <span class="icon icon-add"></span>
          <span>添加另一张卡片</span>
        </div>
        <div class="list-add-confirm">
          <button class="btn btn-success" @click="addNewCard">添加卡片</button>
          <span class="icon icon-close" @click="hideListCardAddForm"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TCard from '@/components/TCard'
export default {
  name: "TList",
  components: {
    TCard
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      cacheName: "",
      listAdding: false,
      drag: {
        isDrag: false,
        isDown: false,
        downClientX: 0,
        downClientY: 0,
        downElementX: 0,
        downElementY: 0,
      },
    };
  },
  computed: {
    cards() {
      return this.$store.getters['card/getCards'](this.data.id)
    }
  },
  async created() {
    this.cacheName = this.data.name;
    if (!this.cards.length) {
      await this.$store.dispatch('card/getCards', this.data.id)
    }
  },
  mounted() {
    this.$refs.listHeader.addEventListener("mousedown", this.dragDown);
    document.addEventListener("mousemove", this.dragMove);
    document.addEventListener("mouseup", this.dragUp);
  },
  methods: {
    dragDown(e) {
      // console.log("down");
      this.drag.isDown = true;
      this.drag.downClientX = e.clientX;
      this.drag.downClientY = e.clientY;
      let pos = this.$refs.list.getBoundingClientRect();
      this.drag.downElementX = pos.x;
      this.drag.downElementY = pos.y;
    },
    dragMove(e) {
      if (this.drag.isDown) {
        // 此时鼠标已经按下了
        let listElement = this.$refs.list;
        let x = e.clientX - this.drag.downClientX;
        let y = e.clientY - this.drag.downClientY;
        // 触发拖拽的条件
        if (x > 10 || y > 10) {
          // console.log("drag");
          if (!this.drag.isDrag) {
            this.drag.isDrag = true;
            this.$refs.listPlaceholder.style.height =
              listElement.offsetHeight + "px";
            console.log("move start");
            listElement.style.position = "absolute";
            listElement.style.zIndex = 99999;
            listElement.style.transform = "rotate(10deg)";
            document.body.appendChild(listElement);
            this.$emit("dragStart", {
              component: this,
            });
          }
          listElement.style.left = this.drag.downElementX + x + "px";
          listElement.style.top = this.drag.downElementY + y + "px";
          this.$emit("dragMove", {
            component: this,
            x: e.clientX,
            y: e.clientY,
          });
        }
      }
    },
    dragUp(e) {
      if (this.drag.isDown) {
        if (this.drag.isDrag) {
          this.$refs.listPlaceholder.style.height = 0;
          let listElement = this.$refs.list;
          listElement.style.position = "relative";
          listElement.style.zIndex = 0;
          listElement.style.left = 0;
          listElement.style.top = 0;
          listElement.style.transform = "rotate(0deg)";
          this.$el.appendChild(listElement);

          this.$emit("dragEnd", {
            component: this,
          });
        } else {
          if (e.path.includes(this.$refs.newBoardListName)) {
            this.$refs.newBoardListName.select();
          }
        }
        this.drag.isDown = this.drag.isDrag = false;
      }
    },
    async editListName(e) {
      if (this.cacheName !== this.data.name) {
        // 优化：值不变就不调用接口向数据库更新数据
        console.log('submit');
        await this.$store.dispatch("list/editList", {
          id: this.data.id,
          boardId: this.data.boardId,
          name: this.data.name,
        });
        this.cacheName = this.data.name
      }
    },
    showListCardAddForm() {
      this.listAdding = true
      this.$nextTick(() => {
        this.$refs.newListName.focus()
      })
    },
    hideListCardAddForm() {
      this.listAdding = false
      this.$refs.newListName.value = ''
    },
    addNewCard() {
      let {value} = this.$refs.newListName

      if (value.trim() !== '') {
        try {
          this.$store.dispatch('card/postCard', {
            name: value,
            boardListId: this.data.id
          })
          this.hideListCardAddForm()
          this.$message.success('提交成功')
        } catch(e) {}
      } else {
        this.$refs.newListName.focus()
      }
    }
  },
};
</script>