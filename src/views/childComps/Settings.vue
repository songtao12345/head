<template>
   <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >个人设置</el-breadcrumb-item>
      </el-breadcrumb>

      <el-card>
          <el-row>
         <el-col :span="10">
            <!-- form表单 -->
            <el-form :model="user" :rules="settingRules" ref="settingRef" label-width="100px">
               <el-form-item label="编号" prop="code">
                  <el-input v-model="user.id"></el-input>
               </el-form-item>
               <el-form-item label="手机" prop="mobile">
                  <el-input v-model="user.mobile"></el-input>
               </el-form-item>
               <el-form-item label="媒体名称" prop="name">
                  <el-input v-model="user.name"></el-input>
               </el-form-item>
               <el-form-item label="媒体介绍" prop="intro">
                  <el-input type="textarea" v-model="user.intro"></el-input>
               </el-form-item>
               <el-form-item label="邮箱" prop="email">
                  <el-input v-model="user.email"></el-input>
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" size="mini" @click="save">保存设置</el-button>
               </el-form-item>
            </el-form>
         </el-col>
         <el-col :span="4" :offset="2">
             
             <!-- <p @click="$refs.file.click()">点击修改头像</p> -->
             <label for="file">
                <el-avatar shape="square" :size="150" fit="cover" :src="user.photo"></el-avatar>
                <p>点击修改头像</p>
                </label>
             <input id="file" type="file" hidden ref="file" @change="imageChange">
         </el-col>
      </el-row>
      </el-card>

     <!-- 修改头像对话框 -->
     <el-dialog
      title="修改头像"
      :visible.sync="headDialogVisible"
      width="50%"
      @opened="headDialogOpened">
      <div>
         <el-image id="image" class="img" fit="cover" style="height: 200px" :src="previewSrc" ref="img"></el-image>
      </div>
      
      <span slot="footer" class="dialog-footer">
         <el-button @click="headDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="updatePhoto">确 定</el-button>
      </span>
      </el-dialog>
      


   </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

import {getUserInfo, editUserInfo, editUserPhoto} from 'network/home.js'
export default {
    name: 'Settings',
    data() {
       return {
          previewSrc: '',
          cropper: null,
          headDialogVisible: false,
          user: {
             id: null,
             mobile: '',
             name: '',
             intro: '',
             email: '',
             photo: ''
          },
          settingRules:{
             mobile: [
                 { required: true, message: '请输入手机号', trigger: 'blur'}
             ],
             name: [
                { required: true, message: '请输入媒体名称', trigger: 'blur'}
             ],
             intro: [
                  { required: true, message: '请输入媒体介绍', trigger: 'blur'}
             ],
             email: [
                { required: true, message: '请输入邮箱', trigger: 'blur'}
             ]
          }
       }
    },
    methods:{
       getUser() {
          getUserInfo().then(res => {
            //  console.log(res)
             this.user = res.data.data
          })
       },
       save() {
          this.$refs.settingRef.validate(valid => {
             if(!valid) return
             //表单验证通过
              editUserInfo(this.user).then(res => {
            //   console.log(res)
              this.$message.success('保存成功')
              this.$bus.$emit('updateUser',this.user)
              })
          })
        
       },
       imageChange() {
          console.log(this.$refs.file.files[0])
          const file  = this.$refs.file
          console.log(window.URL.createObjectURL(this.$refs.file.files[0]))
          this.previewSrc = window.URL.createObjectURL(this.$refs.file.files[0])
         this.$bus.$emit('updateUser',this.user)

         this.headDialogVisible = true
          this.$refs.file.value = ''
       },
       headDialogOpened() {
             const image = document.getElementById('image');
             this.cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            dragMode: 'none'
       
            });
       },
      updatePhoto() {
         this.cropper.getCroppedCanvas().toBlob(file => {
            console.log(file)
            const fb = new FormData()
            fb.append('photo',file)
            // 发起裁剪头像请求
            editUserPhoto(fb).then(res => {
               console.log(res)
             this.user.photo = res.data.data.photo
            })


         })

         this.headDialogVisible = false
      }


    },
    created() {
      this.getUser()
    }
}
</script>

<style scoped>
 .img {
    display: block;
    max-width: 100%;
 }
</style>