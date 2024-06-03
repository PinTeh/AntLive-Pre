<template>
  <el-container class="index-container">
    <el-main style="margin:5px auto">
      <div class="item-container">
        <div>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            class="bread-crumb"
          >
            <el-breadcrumb-item>
              <span
                style="cursor:pointer;font-weight:bold;"
                @click="handleAllClick"
                >全部</span
              >
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{ current_category }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="live-room-container">
          <LiveRoom
            v-for="item in rooms"
            :key="item.id"
            :room="item"
          ></LiveRoom>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import LiveRoom from '../components/LiveRoom'
import RoomApi from '@/api/room'
export default {
  components: {
    LiveRoom,
  },
  computed: {
    currentSelectCategory() {
      return this.$store.state.currentSelectCategory
    },
  },
  data() {
    return {
      rooms: [],
      categorys: [],
      current_category: '',
    }
  },
  watch: {
    currentSelectCategory(newVal) {
      if (newVal == null) {
        this.current_category = ''
        this.listLivingRooms()
        return
      }
      this.current_category = newVal.name
      this.listLivingRooms(newVal.id)
    },
  },
  mounted() {
    this.listLivingRooms()
  },
  methods: {
    listLivingRooms(cid) {
      RoomApi.getLivingRooms({ cid: cid }).then((res) => {
        this.rooms = res.data.data
      })
    },
    handleAllClick() {
      this.current_category = ''
      this.listLivingRooms()
    },
  },
}
</script>

<style lang="less">
.item-container {
  width: 1300px;
  margin: 0 auto;
  .index-header {
    padding: 0px;
  }
  .bread-crumb {
    padding-left: 20px;
    margin-bottom: 10px;
  }
}
.live-room-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
