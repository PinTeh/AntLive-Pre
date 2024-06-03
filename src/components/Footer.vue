<template>
  <div class="footer">
    <span @click="handleClick()">桂ICP备18010581号-1</span>
  </div>
</template>

<script>
export default {
  name: 'footer',
  methods: {
    handleClick() {
      window.open('https://beian.miit.gov.cn/', '_blank')
    },
  },
}
</script>

<style lang="less">
.footer {
  height: 30px;
  text-align: center;
  span {
    line-height: 30px;
    font-size: 10px;
    color: grey;
  }
  span:hover {
    cursor: pointer;
  }
}
</style>
