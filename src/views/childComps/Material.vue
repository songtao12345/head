<template>
   <div>
       <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >素材管理</el-breadcrumb-item>
      </el-breadcrumb>
      <material-image></material-image>

   </div>
</template>

<script>
import MaterialImage from 'components/content/MaterialImage'
export default {
    name: 'Material',
    components: {
       MaterialImage
    },
    data() {
      return {

      }
    },
      methods: {

      }
}
</script>

<style scoped>
 

</style>