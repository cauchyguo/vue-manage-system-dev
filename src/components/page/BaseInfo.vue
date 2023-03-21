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
            <el-row :gutter="40" style="flex-wrap:wrap" type="flex">
                <el-col :span="10">
                    <div class="form-box">
                        <el-form ref="form" :model="form" :rules="rules" label-width="auto" size="medium">
                            <el-form-item label="用户名" prop="admin_name">
                                <el-input v-model="form.admin_name"></el-input>
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
                                <el-input v-model="form.email" type="email"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm()">修改信息</el-button>
                                <el-button @click="resetForm('form')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="upload-avatar">
                        <el-upload
                            ref="upload"
                            file-list="fileList"
                            action="http://10.6.12.11:5000/admin/avatar/upload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            class="upload-demo"
                            auto-upload="false"
                            drag
                            multiple>
                            <i class="el-icon-upload"></i>
<!--                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
<!--                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
<!--                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                        </el-upload>
                        <div class="crop-demo">
                            <img :src="cropImg" class="pre-img" >
                            <div class="crop-demo-btn">选择图片
                                <input accept="image/*" class="crop-input" name="image" type="file" @change="setImage"/>
                            </div>
                            <el-button style="margin-left: 10px;" size="medium" type="success" @click="submitUpload()" >上传到服务器</el-button>

                        </div>
                        <el-dialog :visible.sync="dialogVisible" title="裁剪图片" width="30%">
                            <vue-cropper ref='cropper' :cropmove="cropImage" :ready="cropImage" :src="imgSrc"
                                         :zoom="cropImage" style="width:100%;height:300px;"></vue-cropper>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="cancelCrop">取 消</el-button>
                                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>

                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import VueCropper  from 'vue-cropperjs';

export default {
    name: 'baseform',
    data() {
        return {
            form: {
                admin_name: localStorage.getItem('ms_username'),
                password1: '123123',
                password2: '123123',
                email: 'example@qq.com',
                options: []
            },
            rules: {
                admin_name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password1: [{required: true, message: '请输入密码', trigger: 'blur'}],
                password2: [{required: true, message: '请输入密码', trigger: 'blur'}],
            },
            defaultSrc: require('../../assets/img/img.jpg'),
            fileList: [],
            imgSrc: '',
            cropImg: '',
            dialogVisible: false,
        };
    },
    components: {
        VueCropper
    },
    // computed: {
    //   username() {
    //     let username = localStorage.getItem('ms_username');
    //     return username ? username : this.name;
    //   }
    // },
    methods: {

        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        submitForm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.form.password1 === this.form.password2) {
                        console.log("修改信息初始验证成功");
                        let newinfo_data = new FormData();
                        newinfo_data.append('admin_name', this.form.admin_name);
                        newinfo_data.append('password', this.form.password1);
                        newinfo_data.append('repeat_password', this.form.password2);
                        newinfo_data.append('email', this.form.email);
                        // console.log(newinfo_data);
                        // console.log(this.form.admin_name);
                        // console.log(this.form.password1);
                        // console.log(this.form.email);
                        axios.post('/admin/setting', newinfo_data).then(
                            res => {
                                console.log(res);
                                if (res.data.code === 200) {
                                    this.$message.success('修改成功');
                                    console.log('修改信息成功');
                                    localStorage.setItem('ms_username', this.form.admin_name);
                                    this.$router.push('/');
                                }
                            }
                        ).catch(err => {
                            this.$message.error('网络请求失败');
                        })
                    } else {
                        console.log("密码不一致！")
                        this.$message.warning('密码不一致！');
                    }
                } else {
                    this.$message.warning("请输入正确的数据");
                    console.log('修改失败');
                    return false;
                }


            })

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            // this.$refs[formName]
        },
        submitUpload(){
            this.$ref.upload.submit();
        },

        setImage(e){
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                this.dialogVisible = true;
                this.imgSrc = event.target.result;
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
        },
        cropImage () {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        cancelCrop(){
            this.dialogVisible = false;
            this.cropImg = this.defaultSrc;
        },
        imageuploaded(res) {
            console.log(res)
        },
        handleError(){
            this.$notify.error({
                title: '上传失败',
                message: '图片上传接口上传失败，可更改为自己的服务器接口'
            });
        }
    },
    created(){
        this.cropImg = this.defaultSrc;
    }
};
</script>

<style scoped>
.content-title{
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
.pre-img{
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
}
.crop-demo{
    display: flex;
    align-items: flex-end;
}
.crop-demo-btn{
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input{
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
</style>