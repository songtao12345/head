<template>
   <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
      <!-- 表单 -->
      <el-form :model="publishForm" :rules="publishRules" ref="publishRef" label-width="100px">
      <el-form-item label="标题:" prop="title">
         <el-input v-model="publishForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容:">
         <!-- 富文本编辑器 -->
         <quill-editor v-model="publishForm.content"></quill-editor>
      </el-form-item>

      <!-- 单选 -->
      <el-form-item label="封面:">
         <el-radio-group v-model="publishForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
         </el-radio-group>
          <upload-image :cover-image="publishForm.cover.images[index]"  @imageSubmit="imageSubmit(index,$event)" v-for="(item,index) in publishForm.cover.type" :key="index"></upload-image>
      </el-form-item>
     
       <!-- 下拉框 -->
            <el-form-item label="频道:" prop="channel_id">
                <el-select v-model="publishForm.channel_id" placeholder="请选择">
                    <!-- <el-option label="全部" :value='null'></el-option> -->
                <el-option v-for="(item,index) in articleChannel" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="publishClick"> 发表</el-button>
               <!-- <el-button>存入草稿</el-button> -->
            </el-form-item>
            
      </el-form>

      </el-card>

   </div>
</template>

<script>
import {getArticleChannel, publishArticle, getArticleById, editArticle} from 'network/article.js'
import UploadImage from './UploadImage'
export default {
    name: 'Publish',
    components: {
       UploadImage
    },   
    data() {
       return {
         articleChannel: [],
         draft: true,
         publishForm: {
            title: '',
            content: '',
            cover: {
               type: 0, //封面类型 -1:自动，0-无图，1-1张，3-3张
               images: []
            },
            channel_id: null
         },
         publishRules:{
            title: [
                  { required: true, message: '请输入标题', trigger: 'blur' },
                  { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
                ],
            channel_id: [
                   { required: true, message: '请输入频道', trigger: 'blur' }
                ]
         }
       }
    },
    methods: {
        // 获取文章渠道
        getChannel() {
            getArticleChannel().then(res => {
                console.log(res)
               this.articleChannel = res.data.data.channels
            })
        },
        publishClick() {
         this.$refs.publishRef.validate(valid => {
            if(!valid) return
            // 表单验证通过
            if(this.$route.query.id) {
              // 编辑
            //   editArticle(this.$route.query.id,this.publishForm.title,this.publishForm.content,this.publishForm.cover,this.publishForm.channel_id).then(res => {
            //      console.log(res)
            //      this.$message.success('编辑成功')
            //   })
            editArticle(this.$route.query.id,this.publishForm).then(res => {
                 console.log(res)
                 this.$message.success('编辑成功')
              })
            this.$router.push('/article')

           }else {
               //   console.log(this.publishForm.title,this.publishForm.content,this.publishForm.cover,this.publishForm.channel_id)
             publishArticle(this.publishForm.title,this.publishForm.content,this.publishForm.cover,this.publishForm.channel_id).then(res => {
            //   console.log(res)
            //   if(res.status !== 201) return
              this.$message.success('发布成功')
             })
             this.$router.push('/article')
           }
        
            this.publishForm.content = ''
            this.publishForm.channel_id = null
            this.$refs.publishRef.resetFields()
            this.$router.push('/article')

         })

         
        },
        imageSubmit(index,imageSrc) {
           console.log(index,imageSrc)
           this.publishForm.cover.images[index] = imageSrc
        }
    },
    created() {
       this.getChannel()
       if(this.$route.query.id) {
          //根据id获取文章信息
          getArticleById(this.$route.query.id).then(res => {
             console.log(res)
             this.publishForm= res.data.data
          })
       }
    }
}
</script>

<style scoped>

</style>