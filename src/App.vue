<template>
  <div id="app" class="app">
    <Header
      v-if="showHeader"
      :notIndexPage="showCategory"
      :categorys="this.$store.state.categorys"
      @category-select="handleSelect"
    ></Header>
    <div :class="[showHeader ? 'app-content' : 'app-content2']">
      <div class="app-content-main">
        <router-view></router-view>
      </div>
      <Footer v-if="showHeader" />
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import store from './store'

export default {
  name: 'app',
  components: { Header, Footer },
  data() {
    return {
      showHeader: true,
      showCategory: false,
    }
  },
  mounted() {
    // 获取直播分类
    store.dispatch('getCategorys').then(() => {})
  },
  watch: {
    $route(r) {
      this.showHeader =
        !r.path.startsWith('/admin') && !r.path.startsWith('/register')
      this.showCategory = r.path !== '/'
    },
  },
  methods: {
    handleSelect(c) {
      this.$store.commit('setCurrentSelectCategory', c)
    },
  },
}
</script>
<style lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.app-content {
  overflow: auto;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
}
.app-content2 {
  overflow: auto;
  // height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
}
.app-content-main {
  flex: 1;
}
</style>
