<template>
   <div>
       <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >素材管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
         <!-- 按钮组 -->
          <el-radio-group v-model="buttonRadio" @change="ButtonChange">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="收藏"></el-radio-button>
         </el-radio-group>
         <el-button type="success" style="float: right;" size="mini" @click="addImage">添加素材</el-button>
         <!-- 图片栅格布局 -->
         <el-row style="margin-top:20px" :gutter="20">      
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" v-for="(item,index) in images" :key="index">
                <div class="img">
                     <el-image style="height: 100px" :src="item.url" fit="cover"></el-image>
                     <div class="image-bottom">
                        <i :class="{
                           'el-icon-star-on' : item.is_collected,
                           'el-icon-star-off': !item.is_collected
                        }" @click="collectClick(item)"></i>
                        <i class="el-icon-delete-solid"></i>
                        <!-- <div @click="collectClick(item)">
                        <i v-if="imageParams.collect" class="el-icon-star-on" ></i>
                        <i v-else class="el-icon-star-off"></i>
                        </div>
                        <i class="el-icon-delete-solid"></i> -->
                     </div>
                </div>
            
            </el-col>
         </el-row>

         <!-- 分页 -->
         <el-pagination
            @size-change="imageSizeChange"
            @current-change="imageCurrentChange"
            :current-page="this.imageParams.page"
            :page-size="this.imageParams.per_page"
            :page-sizes="[2, 5, 10, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total">
         </el-pagination>

      </el-card>
         <!-- http://ttapi.research.itcast.cn/mp/v1_0/user/images -->
         <!-- 添加素材 -->
         <el-dialog title="添加素材" :visible.sync="imagedialogVisible">
            <el-upload
            class="upload-demo"
            drag
            action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
            multiple
            :headers="imgHeader"
            name="image"
            :on-success="upLoadSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
         </el-dialog>

   </div>
</template>

<script>
import {getImageList, collectImage} from 'network/image.js'
export default {
    name: 'Material',
    data() {
       return {
          buttonRadio: '全部',
          images: [],
          imagedialogVisible: false,
          imageParams: {
             collect: false,
             page: 1,
             per_page: 10
          },
          total: 0,
          imgHeader: {
             Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
            // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjAzMTQxODYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.6cbN33-IDHDBRLqHPXx3YdVK6na34VmaeWeyKM7q0iQt'
          }
       }
    },
    methods: {
       getImage() {
          getImageList(this.imageParams).then(res => {
             console.log(res)
             this.images = res.data.data.results
             this.total = res.data.data.total_count
          })
       },
      //  getAll() {
      //     this.imageParams.collect = false,
      //     this.getImage()
      //  },
      //  collectImage() {
      //     this.imageParams.collect = true,
      //     this.getImage()
      //  },
       ButtonChange(value) {
          this.imageParams.page = 1
          if(value === '全部'){
             this.imageParams.collect = false,
            this.getImage()
          }else if(value === '收藏'){
              this.imageParams.collect = true,
              this.getImage()
          }
       },
       addImage() {
          this.imagedialogVisible = true
       },
       upLoadSuccess() {
          this.imagedialogVisible = false
          this.getImage()
       },
      imageSizeChange(newSize) {
         console.log(newSize)
         this.imageParams.per_page = newSize
         this.getImage()
      },
      imageCurrentChange(newPage) {
         console.log(newPage)
         this.imageParams.page = newPage
         this.getImage()
      },
      collectClick(itemImage) {
         // this.imageParams.collect = !this.imageParams.collect

         console.log(itemImage.id,itemImage.is_collected)

         collectImage(itemImage.id,!itemImage.is_collected).then(res => {
            console.log(res)
            itemImage.is_collected = !itemImage.is_collected
         })

         // if(itemImage.is_collected) {
         //    //已收藏,取消收藏
         //    collectImage(itemImage.id, false)
         // }else {
         //    //没有收藏,添加收藏
         //    collectImage(itemImage.id, true)
         // }

         // collectImage(itemImage.id,true).then(res => {
         //    console.log(res)
         // })
      }

    },
    created() {
       this.getImage()
    }
}
</script>

<style scoped>
 .el-pagination {
    margin-top: 20px;
 }
 .image-bottom {
    background-color: rgb(204, 204, 204, .5);
    height: 20px;
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
 }
 .img {
    position: relative;
 }
 .el-icon-star-on {
    font-size: 20px;
 }

</style>