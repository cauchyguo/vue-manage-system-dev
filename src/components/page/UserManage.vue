<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 垃圾数据集
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-input v-model="query.name" placeholder="用户名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="40" align="center"></el-table-column>
<!--                <el-table-column prop="open_id" label="open_id"   align="center" ></el-table-column>-->
                <el-table-column prop="user_name" label="用户名" width="120" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" width="70" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" width="70" align="center"></el-table-column>
                <el-table-column prop="background" label="学历" width="150" align="center"></el-table-column>
                <el-table-column prop="school" label="学校" width="150" align="center"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="200" align="center"></el-table-column>
                <el-table-column prop="address" label="地址" width="80" align="center"></el-table-column>
                <el-table-column prop="gb_classify_nums" label="识别次数" width="80" align="center"></el-table-column>
                <el-table-column prop="game_play_nums" label="答题次数" width="80" align="center"></el-table-column>
                <el-table-column prop="accurate" label="答题正确率" width="100" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">

                <el-form-item label="用户名">
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="学历">
                    <el-input v-model="form.background"></el-input>
                </el-form-item>
                <el-form-item label="学校">
                    <el-input v-model="form.school"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import axios from "axios";
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                // address: '',
                name: '',
                // pageIndex: 1,
                // pageSize: 10
            },
            // changeindex: null,
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},

            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            axios.get('/admin/users/list').then(
                res => {
                    console.log("接受到的数据为：");

                    console.log(res.data.data);
                    this.tableData = res.data.data.users_list;

                }
            ).catch(err => {
                this.$message.error('网络请求失败');
            });
            console.log(this.tableData);
        },
        // 触发搜索按钮
        handleSearch() {
            let tmp = new FormData();
            tmp.append('user_name', query.name);
            axios.get('/admin/users/search',tmp).then(
                res => {
                    console.log("接受到的数据为：");
                    console.log(res.data.data);
                    this.tableData = res.data.data.users_list;

                }
            ).catch(err => {
                this.$message.error('网络请求失败');
            });
            console.log(this.tableData);
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    console.log()
                    let tmp = new FormData();
                    tmp.append('open_id', this.tableData[index].open_id);
                    axios.post('/admin/users/delete',tmp).then(
                        res => {
                            if (res.data.code === 200) {
                                this.$message.success('删除成功');
                                this.getData();
                                // this.tableData.splice(index, 1);
                            } else {
                                this.$message.error(res.data.message);
                            }
                        }
                    );
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            console.log(this.delList);
            // for (let i = 0; i < length; i++) {
            //     str += this.multipleSelection[i].name + ' ';
            // }
            for (let j = 0; j < this.delList.length; j++) {
                let tmp = new FormData();
                tmp.append('open_id', this.delList[j].open_id);
                axios.post('/admin/users/delete',tmp).then(
                    res => {
                        if (res.data.code === 200) {
                            this.$message.success('删除成功');
                            // this.getData();
                            // this.tableData.splice(index, 1);
                        } else {
                            this.$message.error(res.data.message);
                        }
                    }
                );
            }
            // this.$message.error(`删除了${str}`);
            this.getData();
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$set(this.tableData, this.idx, this.form);
            let tmp = new FormData();
            tmp.append('user_name', this.tableData[this.idx].user_name);
            tmp.append('open_id', this.tableData[this.idx].open_id);
            tmp.append('sex', this.tableData[this.idx].sex);
            tmp.append('background', this.tableData[this.idx].background);
            tmp.append('school', this.tableData[this.idx].school);
            tmp.append('email', this.tableData[this.idx].email);
            tmp.append('age', this.tableData[this.idx].age);
            tmp.append('address', this.tableData[this.idx].address);
            console.log(tmp);
            axios.post('/admin/users/update', tmp).then(
                res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.$message.success('修改成功');
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        console.log('修改该用户信息成功');
                    } else {
                        this.getData();
                        this.$message.error(res.data.message);
                        this.$router.push('/usermanage');
                    }
                }
            ).catch(err => {
                this.getData();
                this.$message.error('网络请求失败');
            })
            // this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
