<template>
  <router-link :to="{name: 'Card', params: {listId: card.boardListId, cardId: card.id}}" class="list-card" v-if="card">

    <div class="list-card-cover" v-if="card.coverPath"
      :style="`background-image: url(${server.staticPath + card.coverPath})`"
    ></div>
    <div class="list-card-title">{{card.name}}</div>
    <div class="list-card-badges">
      <div class="badge" v-if="card.description">
        <span class="icon icon-description"></span>
      </div>
      <div class="badge" v-if="card.commentCount > 0">
        <span class="icon icon-comment"></span>
        <span class="text">{{card.commentCount}}</span>
      </div>
      <div class="badge" v-if="Array.isArray(card.attachments) && card.attachments.length > 0">
        <span class="icon icon-attachment"></span>
        <span class="text">{{card.attachments.length}}</span>
      </div>
    </div>

  </router-link>
</template>

<script>
export default {
  name: "TCard",
  computed: {
    server() {
      return this.$store.state.server;
    },
  },
  props: {
    card: {
      type: Object,
    },
  },
};
</script>