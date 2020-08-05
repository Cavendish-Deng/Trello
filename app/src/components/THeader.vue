<template>
  <header>
    <div class="left">

      <router-link :to="{name: 'Home'}" class="btn btn-icon">
        <i class="icon icon-home"></i>
      </router-link>

      <router-link :to="{name: 'Home'}" class="btn btn-icon">
        <i class="icon icon-board"></i>
        <span class="txt">看板</span>
      </router-link>

    </div>

    <router-link :to="{name: 'Home'}" class="logo"></router-link>

    <div class="right">
      <a href class="btn btn-icon">
        <i class="icon icon-add"></i>
      </a>
      
      <t-popup :title="user.name" ref="tPopup">
        <button class="avatar">
          <span>{{user.name[0].toUpperCase()}}</span>
        </button>
      <t-popup-menu slot="content" :items="menuItem" @command="execute"></t-popup-menu>
      </t-popup>
      
    </div>
  </header>
</template>
<script>
import {mapState} from 'vuex'
import TPopup from '@/components/TPopup'
import TPopupMenu from '@/components/TPopupMenu'

export default {
  name: 'THeader',
  data() {
    return {
      menuItem: [
        {name: '退出', command: 'logout'}
      ]
    }
  },
  computed: {
    ...mapState('user', {
      user: state => state.info
    })
  },
  components: {
    TPopup,
    TPopupMenu
  },
  methods: {
    execute(command) {
      console.log(command);
      switch(command) {
        case 'logout':
          this.logout();
          break;
        default: 
          break
      }
    },
    logout() {
      this.$store.dispatch('user/logout')
      this.$refs.tPopup.toggle()
      this.$router.push({name: 'Login'})
    }
  }
}
</script>