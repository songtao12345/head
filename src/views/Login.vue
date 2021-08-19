<template>
    <div class="login">
    <el-form class="loginForm" :model="loginForm" :rules="loginRules" ref="form">
        <h3 class="title">楚门世界</h3>
        <el-form-item prop="mobile">
        <el-input prefix-icon="el-icon-user" v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
        <el-input prefix-icon="el-icon-lock" v-model="loginForm.code" type="code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="code">
            <el-input v-model="loginForm.code" style="width: 60%; margin-right:5px" placeholder="请输入验证码"></el-input>
            <img :src="codeUrl" alt="">
        </el-form-item> -->
        <el-form-item prop="checked">
            <el-checkbox v-model="loginForm.checked" label="记住我" style="text-align:center; margin-bottom: 15px;"></el-checkbox>
        </el-form-item>
        <div class="button">
            <el-button type="primary" :loading="loadingStatus" @click="login" style="width:100%;">登陆</el-button>
        </div>
    </el-form>
    
    </div>
</template>

<script>
import {getLogin} from 'network/login.js'
import Vue from 'vue'
export default {
    name: 'Login',
    created() {
        this.loginForm.mobile = window.localStorage.getItem('mobile')
        this.loginForm.code = window.localStorage.getItem('code')
    },
    data() {
        return {
            // checked: true,
            codeUrl: '',
            loadingStatus: false,
            loginForm: {
                mobile: '13911111111',
                code: '246810',
                // mobile: '',
                // code: '',
                checked: true,
                // code: ''
            },
            loginRules: {
                mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                          ],
                // code: [
                //         { required: true, message: '请输入密码', trigger: 'blur' }
                //          ],
                code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                checked: [
                    { validator : (rule, value, callback) => {
                        console.log(value)
                        if(value) {
                            window.localStorage.setItem('mobile',this.loginForm.mobile)
                            window.localStorage.setItem('code',this.loginForm.code)
                        }
                        callback() //域验证通过
                    } , message: '请输入验证码', trigger: 'blur' }
                ]

            }
        }
    },
    methods: {
        login() {
            this.$refs.form.validate(valid => {
              
                if(!valid) return 
                this.loadingStatus = true
                // 调用登陆接口
                getLogin(this.loginForm.mobile,this.loginForm.code).then(res => {
                    console.log(res)
                    if(res.status !== 201)  return
                    this.$message.success('登陆成功')
                    window.sessionStorage.setItem('token',res.data.data.token)
                    this.$router.push('/home')
                    this.loadingStatus = false
                   
                }).catch(error => {
                    this.$message.error('登陆失败')
                    this.loadingStatus = false
                })
                // axios.post('http://api-toutiao-web.itheima.net/mp/v1_0/authorizations',this.loginForm).then(res => {
                //     console.log(res)
                // })
               
            })
        }


    }
}
</script>

<style scoped>
.login {
    height: 100vh;
    position: relative;
    /* background: url('../assets/img/street.jpg') no-repeat; */
    
     background-image: url('../assets/img/login_bg.jpg');
     background-size: cover;

}
.loginForm {
    background-color: #fff;
    overflow: hidden;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 35%;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    padding: 15px 35px;
    
}

.title {
    text-align: center;
}

</style>