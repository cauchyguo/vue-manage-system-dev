<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar">基本信息</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="form-box">
                        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                            <el-form-item label="用户名" prop="admin_name">
                                <el-input v-model="form.admin_name" ></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password1">
                                <el-input
                                    v-model="form.password1"
                                    type="password"
                                    @keyup.enter.native="onSubmit()"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="password2">
                                <el-input
                                    v-model="form.password2"
                                    type="password"
                                    @keyup.enter.native="onSubmit()"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="form.email"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit()">修改信息</el-button>
                                <el-button >取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="8">
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import VueCropper  from 'vue-cropperjs';
// import {validate} from "@vue/cli-service/lib/options";
// import request from "@/utils/request";
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                admin_name:localStorage.getItem('ms_username'),
                password1:'',
                password2:'',
                email:'example@qq.com',
                options: []
            },
            rules: {
                admin_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password1: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                password2: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    // computed: {
    //   username() {
    //     let username = localStorage.getItem('ms_username');
    //     return username ? username : this.name;
    //   }
    // },
    methods: {
        onSubmit() {

        }
    }
};
</script>

