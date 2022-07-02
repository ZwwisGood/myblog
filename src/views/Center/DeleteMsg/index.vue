<template>
  <div class="deleteMsg animate__animated animate__fadeIn">
    <el-table
      class="table center animate__animated animate__fadeInRight"
      :data="messages"
      max-height="512"
      highlight-current-row
      border
      stripe
    >
      <template slot="empty">
        <el-empty
          :image-size="250"
          description=""
          v-show="messages.length"
        ></el-empty>
      </template>
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column prop="name" label="留言人" width="190">
      </el-table-column>
      <el-table-column prop="content" label="留言内容" width="500">
      </el-table-column>
      <el-table-column prop="time" label="留言时间" width="300">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteMsg(scope.row)"
            type="danger"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="messages.length"
      class="pagination"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  data() {
    return {
      messages: [], //对应页数的留言
      page: 1, //当前页数
      total: 0, //总数量
      pageSize: 8, //每页显示的数据量
    }
  },
  methods: {
    //切换页数
    async handleCurrentChange(newPage) {
      this.page = newPage
      try {
        let res = await this.$api({
          url: '/api/getMessagesByPage',
          method: 'get',
          params: {
            page: this.page,
            pageSize: this.pageSize,
          },
        })
        this.messages = res.data.results
        this.total = res.data.total
        this.$nextTick(() => {
          this.loading = false //加载完成后关闭加载动画
        })
      } catch (err) {
        console.log(err)
        this.$msg('不好意思，出错了')
      }
    },
    //是否删除留言
    deleteMsg(msg) {
      MessageBox.confirm('确定删除该留言?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.confirmDelete(msg)
        })
        .catch(() => {})
    },
    //确认删除留言
    async confirmDelete(msg) {
      try {
        let res = await this.$api({
          url: '/api/deleteMsg',
          method: 'get',
          params: {
            id: msg.id,
          },
        })
        this.$msg({
          message: '删除成功',
          type: 'success',
        })
        //重新获取该页数据
        this.handleCurrentChange(this.page)
      } catch (e) {
        console.log(e)
      }
    },
  },
  //获得首页数据
  async created() {
    try {
      let res = await this.$api({
        url: '/api/getMessagesByPage',
        method: 'get',
        params: {
          page: this.page,
          pageSize: this.pageSize,
        },
      })
      this.messages = res.data.results
      this.total = res.data.total
      this.$nextTick(() => {
        this.loading = false
      })
    } catch (err) {
      console.log(err)
      this.$msg('不好意思，出错了')
    }
  },
}
</script>

<style lang="less" scoped>
.animate__animated{
  animation-duration: 0.7s!important
}
::v-deep .el-table__fixed-right {
  height: 100% !important;
}
.deleteMsg {
  margin: 10px auto;
  border: 3px solid #eee;
  width: 1200px;
  height: 511px;
  box-shadow: 0 0 10px #eee;
  .pagination {
    position: absolute;
    left: 52%;
    bottom: 10%;
    margin-top: 30px;
  }
}
//elementUI的table文字居中
::v-deep .center td,
::v-deep .center th {
  text-align: center;
}
</style>