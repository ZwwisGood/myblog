<template>
  <div class="delete animate__animated animate__fadeIn">
    <el-table
      class="table center animate__animated animate__fadeInRight"
      :data="blogs"
      max-height="512"
      highlight-current-row
      border
      stripe
    >
      <template slot="empty">
        <el-empty
          :image-size="250"
          description=""
          v-show="blogs.length"
        ></el-empty>
      </template>
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column prop="title" label="博客标题" width="300">
      </el-table-column>
      <el-table-column prop="type" label="博客类型" width="120">
      </el-table-column>
      <el-table-column prop="description" label="博客描述" width="300">
      </el-table-column>
      <el-table-column prop="time" label="发表时间" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="170">
        <template slot-scope="scope">
          <el-button @click="editBlog(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click.native.prevent="deleteBlog(scope.row)"
            type="danger"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="blogs.length"
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
      blogs: [], //对应页数的博客
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
          url: '/api/getBlogsByPage',
          method: 'get',
          params: {
            page: this.page,
            pageSize: this.pageSize,
          },
        })
        this.blogs = res.data.results
        this.total = res.data.total
        this.$nextTick(() => {
          this.loading = false //加载完成后关闭加载动画
        })
      } catch (err) {
        console.log(err)
        this.$msg('不好意思，出错了')
      }
    },
    //编辑
    editBlog(blog) {
      this.$router.push({
        path: '/center/editBlog',
        query: {
          id: blog.id,
        },
      })
    },
    //删除博客
    deleteBlog(blog) {
      MessageBox.confirm('确定删除这篇博客吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.confirmDelete(blog)
        })
        .catch(() => {})
    },
    //是否确认删除博客
    async confirmDelete(blog) {
      try {
        let res = await this.$api({
          url: '/api/deleteBlog',
          method: 'get',
          params: {
            id: blog.id,
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
        this.$msg('不好意思，出错了')
      }
    },
  },
  //获得首页数据
  async created() {
    try {
      let res = await this.$api({
        url: '/api/getBlogsByPage',
        method: 'get',
        params: {
          page: this.page,
          pageSize: this.pageSize,
        },
      })
      this.blogs = res.data.results
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
//修正表格底部多出一条横线
::v-deep .el-table__fixed-right {
  height: 100% !important;
}
.delete {
  margin: 10px auto;
  border: 3px solid #eee;
  width: 1200px;
  height: 511px;
  box-shadow: 0 0 10px #eee;
  overflow-x: hidden;
  .pagination {
    position: absolute;
    left: 52%;
    bottom: 10%;
    margin-top: 30px;
  }
}
//elementUI的table文字居中
::v-deep .center td, ::v-deep .center th {
  text-align: center;
}
</style>