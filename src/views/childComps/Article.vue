<template>
   <div class="article">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
        <!-- 表单 -->
        <el-form :model="articleForm"  ref="articleRef" label-width="100px">
            <!-- 单选 -->
             <el-form-item label="状态:">
                <el-radio-group v-model="query.status">
                <el-radio :label="null">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
                <el-radio :label="4">已删除</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 下拉框 -->
            <el-form-item label="频道:">
                <el-select v-model="articleForm.channel" placeholder="请选择">
                    <el-option label="全部" :value='null'></el-option>
                <el-option v-for="(item,index) in articleChannel" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- 时间 -->
             <el-form-item label="日期:">
                 <el-date-picker v-model="timerange" type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00','12:00:00']"
                value-format="yyyy-MM-dd">
                </el-date-picker>
             </el-form-item>
            <!-- 按钮  -->
            <el-form-item>
                <el-button type="primary" @click="getArticle" :disabled="loadingStatus">筛选</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card>
        <div slot="header">
            <span>查询到{{total}}条符合条件的内容</span>
        </div>
         <el-table :data="articleList" style="width: 100%" stripe border v-loading="loadingStatus" >
           <el-table-column label="#" type="index"> </el-table-column>
           <el-table-column label="封面" width="180">
               <template slot-scope="scope">
                    <el-image lazy style="width: 100px; height: 100px" :src="scope.row.cover.images[0]" fit="cover">
                        <div slot="placeholder">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                  
                   <!-- <img v-if="scope.row.cover.images[0]" class="article-img" :src="scope.row.cover.images[0]" alt="">
                   <img v-else class="article-img" src="~assets/img/no-cover.gif" alt=""> -->
               </template>
           </el-table-column>
           <el-table-column prop="title"  label="标题" width="180"> </el-table-column>
           <el-table-column prop="status"  label="状态" width="180">
               <template slot-scope="scope">
                   <el-tag :type="articleStatus[parseInt(scope.row.status)].type">{{articleStatus[parseInt(scope.row.status)].text}}</el-tag>
                   <!-- <el-tag v-if="scope.row.status === '0'" type="danger">草稿</el-tag>
                   <el-tag v-else-if="scope.row.status === '1'">待审核</el-tag>
                   <el-tag v-else-if="scope.row.status === '2'" type="success">审核通过</el-tag>
                   <el-tag v-else-if="scope.row.status === '3'">审核失败</el-tag>
                   <el-tag v-else-if="scope.row.status === '4'">已删除</el-tag> -->
               </template>
           </el-table-column>
           <el-table-column prop="pubdate"  label="发布日期" width="180"></el-table-column>
           <el-table-column label="操作" width="180">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="articleEditDialog(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="articleDeleteDialog(scope.row.id)"></el-button>
            </template>
           </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="query.pagenum"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="query.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="loadingStatus">
        </el-pagination>

    </el-card>

   </div>
</template>

<script>
import {getArticle, getArticleChannel, deleteArticle} from 'network/article.js'
export default {
    name: 'Article',
    data() {
        return {
            query: {
                 status: null,
                 pagenum: 1,
                 pagesize: 15,
                 begin_pubdate: null,
                 end_pubdate: null
            },
            loadingStatus: true,
            timerange: null,
            articleForm: {
                channel: null,
                date2: ''
            },
            articleStatus: [
                {text: '草稿', type: 'info'},
                {text: '待审核'},
                {text: '审核通过', type: 'success'},
                {text: '审核失败', type: 'warning'},
                {text: '已删除', type: 'danger'},
            ],
            articleList: [],
            articleChannel: [],
            total: 0
        }
    },
    methods: {
        getArticle() {
            //  this.loadingStatus =true
             getArticle(this.query.status,this.query.pagenum,this.query.pagesize,this.articleForm.channel,
                        this.timerange ? this.timerange[0] : null,this.timerange ? this.timerange[1] : null).then(res => {
            // if(res.status !== 200) return this.$message.error('获取文章列表数据失败')
            // 获取数据成功
            console.log(res)
            this.articleList = res.data.data.results
            this.query.pagenum = res.data.data.page
            this.query.pagesize = res.data.data.per_page
            this.total =res.data.data.total_count
            
            this.loadingStatus = false
            })
        },
        // 编辑
        articleEditDialog(id) {
            console.log(id.toString())
            this.$router.push('/publish?id='+ id)
        },
        //删除
        articleDeleteDialog(id) {
            console.log(id.toString())
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                     // 发送删除请求
                    deleteArticle(id.toString()).then(res => {
                        console.log(res)
                        // if(res.status !== 204) return
                        //删除成功
                        this.loadingStatus = false
                        this.getArticle()
                        this.$message.success('删除成功')
                        this.getArticle()
                    
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                });
        },
        handleSizeChange(newSize) {
            console.log(newSize);
            this.query.pagesize = newSize
            this.getArticle()
        },
        handleCurrentChange(newPage) {
            console.log(newPage)
            this.query.pagenum = newPage
            this.getArticle()
        },
        // 获取文章渠道
        getChannel() {
            getArticleChannel().then(res => {
                // console.log(res)
               this.articleChannel = res.data.data.channels
            })
        }

    },
    created() {
        // 获取文章列表数据
       this.getArticle()
       this.getChannel()

    
    }
}
</script>

<style scoped>
 .article-img {
     width:100px;
     height:100px;
     background-size: cover;
 }
</style>