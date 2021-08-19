<template>
    <div>
            <!-- 卡片视图 -->
      <el-card>
         <!-- 按钮组 -->
          <el-radio-group v-model="buttonRadio" @change="ButtonChange">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="收藏"></el-radio-button>
         </el-radio-group>
         <el-button v-if="imageStatus" type="success" style="float: right;" size="mini" @click="addImage">添加素材</el-button>
         <!-- 图片栅格布局 -->
         <el-row style="margin-top:20px" :gutter="20">      
            <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="(item,index) in images" :key="index" @click.native="selectImage(index)">
                <div class="img">
                     <el-image style="height: 100px; width: 100px;" :src="item.url" fit="cover"></el-image>
                     <div class="image-bottom" v-if="bottomStatus">
                        <i :class="{
                           'el-icon-star-on' : item.is_collected,
                           'el-icon-star-off': !item.is_collected
                        }" @click="collectClick(item)"></i>
                        <i class="el-icon-delete-solid" @click="deleteImageInfo(item)"></i>
                        <!-- <div @click="collectClick(item)">
                        <i v-if="imageParams.collect" class="el-icon-star-on" ></i>
                        <i v-else class="el-icon-star-off"></i>
                        </div>
                        <i class="el-icon-delete-solid"></i> -->
                     </div>
                     <div class="select" v-if="selectId === index"><img src="~assets/img/selected.png" alt=""></div>
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
import {getImageList, collectImage, deleteImage} from 'network/image.js'
export default {
    name: 'MaterialImage',
    props: {
        imageStatus: {
            type: Boolean,
            default: true
        },
        bottomStatus: {
            type: Boolean,
            default: true
        }
    },
    data() {
         return {
          selectId: null,
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
       deleteImageInfo(item) {
          console.log(item.id)
         deleteImage(item.id).then(res => {
            console.log(res)
            this.getImage()
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
      },
      selectImage(index) {
         this.selectId = index
         console.log(this.selectId)
       
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
    width: 100px;
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
.select img{
    width: 100px;
    height: 100px;
}
.select {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>