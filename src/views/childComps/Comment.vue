<template>
   <div>
       <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >评论管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
         <!-- 表格 -->
      <el-table stripe border :data="commentList" style="width: 100%">
         <el-table-column prop="title" label="标题" width="180"></el-table-column>
         <el-table-column prop="total_comment_count" label="总评论数" width="180"></el-table-column>
         <el-table-column prop="fans_comment_count" label="粉丝评论数" width="180"></el-table-column>
         <el-table-column prop="comment_status" label="评论状态" width="180">
            <template slot-scope="scope">
               <div v-if="scope.row.comment_status">正常</div>
               <div v-else>关闭</div>
            </template>
         </el-table-column>
         <el-table-column label="操作" width="180">
            <template slot-scope="scope">
               <el-button v-if="scope.row.comment_status" type="danger" size="mini" @click="commentClick(scope.row)">关闭评论</el-button>
               <el-button v-else type="success" size="mini" @click="commentClick(scope.row)">打开评论</el-button>
            </template>
         </el-table-column>
      </el-table>

      <!-- 分页 -->
        <el-pagination
            @size-change="commentSizeChange"
            @current-change="commentPageChange"
            :current-page="query.pagenum"
            :page-sizes="[10, 15, 20, 30]"
            :page-size="query.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
         </el-pagination>

      </el-card>


   </div>
</template>

<script>
import {getCommentList, changeCommentStatus} from 'network/comment.js'
export default {
    name: 'Comment',
    data() {
       return {
          commentList: [],
          total: 0,
          query: {
               //   status: null,
                 pagenum: 1,
                 pagesize: 10,
               //   begin_pubdate: null,
               //   end_pubdate: null,
                 response_type: 'comment' 
            }
       }
    },
    methods: {
       getComment() {
          getCommentList(this.query.pagenum,this.query.pagesize,this.query.response_type).then(res => {
          console.log(res)
          this.commentList = res.data.data.results
          this.total = res.data.data.total_count
          })
       },
       commentSizeChange(newSize) {
          console.log(newSize)
          this.query.pagesize = newSize
          this.getComment()
          
       },
       commentPageChange(newPage) {
          console.log(newPage)
          this.query.pagenum = newPage
          this.getComment()
       },
       commentClick(itemComment) {
          console.log(itemComment.id.toString(),itemComment.comment_status)
          itemComment.comment_status = !itemComment.comment_status

          //发起修改评论请求接口
          changeCommentStatus(itemComment.id.toString(),itemComment.comment_status).then(res => {
             console.log(res)
             this.$message.success(itemComment.comment_status ? '开启成功' : '关闭成功')
          })
       }
    },
    created() {
       this.getComment()
    }
}
</script>

<style scoped>
 .el-pagination {
    margin-top: 10px;
 }
</style>