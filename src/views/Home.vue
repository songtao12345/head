<template>
        <el-container class="container">
            <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '150px' : '200px'">
            <div class="aside-top">
                <img src="~assets/img/doge.jpg" alt="">
                <span>未来头条</span>
                <div class="collapse" @click="collapse">|||</div>    
            </div>
               <!-- 侧边导航 -->
                 <div class="aside-bottom">
                    <el-menu router background-color="#002033" text-color="#fff" active-text-color="#ffd04b" unique-opened>
                    <el-menu-item  :index="'/' +menusPath[index]" v-for="(item,index) in menusList" :key="index">
                        <template slot="title">
                        <i :class="iconObj[index]"></i>
                        <span>{{item}}</span>
                        </template>
                    </el-menu-item >
                    </el-menu>
                 </div>
        </el-aside>
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div>后台管理系统</div>
                    <el-dropdown trigger="click">
                        <img :src="userInfo.photo" alt="">
                        <span class="el-dropdown-link">
                            {{userInfo.name}}
                            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-setting">
                                <el-button type="primary" size="mini" round>设置</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item icon="el-icon-error">
                                <el-button type="danger" size="mini" round @click="logout">退出</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
            </el-header>
            <!-- 内容区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
</template>

<script>
import {getUserInfo} from 'network/home.js'
export default {
    name: 'Home',
    data() {
        return {
            menusList: ['首页','内容管理','素材管理','发布文章','评论管理','粉丝管理','个人设置'],
            menusPath: ['home','article','material','publish','comment','fans','settings'],
            iconObj: {
                '0': 'iconfont icon-index',
                '1': 'iconfont icon-CONTENTMANAGEMENT',
                '2': 'iconfont icon-image',
                '3': 'iconfont icon-article',
                '4': 'iconfont icon-sidebar_comment_hov',
                '5': 'iconfont icon-fans',
                '6': 'iconfont icon-setting' 
            },
            isCollapse: false,
            userInfo: {}
        }
    },
    methods: {
     collapse() {
        
         this.isCollapse = !this.isCollapse
     },
     logout() {
         console.log('-')
         this.$router.push('/login')
         // 退出时候清除掉token
         window.sessionStorage.removeItem('token')
     },
        getUserInfo() {
            getUserInfo().then(res => {
            
            this.userInfo = res.data.data
            // console.log(this.userInfo);
            })
        }
    },
    created() {
        this.getUserInfo()
        this.$bus.$on('updateUser',(user) => {
            console.log('updateUser', user)
            this.userInfo = user
        })
    }
}
</script>

<style scoped>
.container {
    height: 100vh;
}
.aside-top img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 10px;
}
.aside-top span {
    font-weight: 12px;
    color: #fff;
}
.aside-top{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
}
.el-aside {
    display: flex;
    flex-direction: column;;
    /* width: 200px !important; */
    background-color: #002033;
}
.aside-bottom {
    flex: 1;
}
.iconfont {
    margin-right: 10px;
}
.collapse {
    color: #eee;
    background-color: #002033;
    letter-spacing: 0.2em;
    margin-left: 20px;
}
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    /* background-color: #b3c0d1; */
    /* color: #fff; */
}
.el-header img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.el-dropdown {
    display: flex;
    align-items: center;
}
.el-dropdown img {
    margin-right: 10px;
}

</style>


