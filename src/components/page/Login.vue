<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">慧眼识垃圾后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 请输入正确的账户和密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request';
import service from '@/utils/request';
import md5 from "js-md5";
import axios from "axios";

export default {
    name: "Login",
    data: function() {
        return {
            param: {
                username: 'admin',
                password: '123123',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    console.log("初始验证成功");
                    // const url = "http://127.0.0.1:5000/admin/login";
                    let admin_user_data = new FormData();
                    console.log(this.param.password);
                    let tmp = md5(this.param.password);
                    // console.log(tmp);
                    admin_user_data.append('admin_name', this.param.username);
                    admin_user_data.append('password',tmp)
                    console.log('发送数据',admin_user_data);

                    axios.post('/admin/login',admin_user_data).then(
                        res => {
                            console.log(res)
                            if (res.data.code===200){
                                this.$message.success('登录成功');
                                console.log("成功")
                                localStorage.setItem('ms_username', this.param.username);
                                this.$router.push('/');
                            }else {
                                this.$message.warning(res.data.message);
                                console.log("失败")
                            }
                        }
                    ).catch(err => {
                        console.log(err);
                        this.$message.error('网络请求失败');
                    })
                    // this.$message.success('登录成功');
                    // localStorage.setItem('ms_username', this.param.username);
                    // this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>