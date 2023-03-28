<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 垃圾类别管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="search_gb_name" placeholder="请输入要搜索的垃圾名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="garbage_id" label="垃圾ID" width="80" align="center"></el-table-column>
                <el-table-column prop="garbage_name" label="垃圾名称"></el-table-column>
                <el-table-column prop="garbage_class" label="垃圾类别"></el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="this.query.page"
                    :page-size="this.query.pageSize"
                    :total="this.pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">

                <el-form-item label="垃圾ID" >
                    <el-input v-model="form.garbage_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="垃圾名称">
                    <el-input v-model="form.garbage_name"></el-input>
                </el-form-item>
                <el-form-item label="垃圾类别">
<!--                    <el-input v-model="form.garbage_class"></el-input>-->
                    <el-select v-model="form.garbage_class" placeholder="请选择" class="handle-select mr10">
                        <el-option key="1" label="其他垃圾" value="其他垃圾"></el-option>
                        <el-option key="2" label="有害垃圾" value="有害垃圾"></el-option>
                        <el-option key="3" label="可回收物" value="可回收物"></el-option>
                        <el-option key="4" label="厨余垃圾" value="厨余垃圾"></el-option>
                    </el-select>
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
                page: 1,
                pageSize: 10,

            },
            changeindex: null,
            name: null,
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            search_gb_name: null,
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData(val=1) {
            axios.get('/admin/garbage/list',{
                params:{
                    page: val,
                }
            }).then(
                res => {
                    console.log("接受到的数据为：");
                    console.log(res.data.data);
                    this.tableData = res.data.data.garbage_list;
                    this.pageTotal = res.data.data.pages;
                    this.query.page = val;

                }
            ).catch(err => {
                this.$message.error('网络请求失败');
            });
            console.log(this.tableData);
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
            let tmp = new FormData();
            tmp.append('garbage_id', this.form.garbage_id);
            tmp.append('garbage_name', this.form.garbage_name);
            tmp.append('garbage_class', this.form.garbage_class);
            console.log(tmp);
            axios.post('/admin/garbage/update', tmp).then(
                res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.$set(this.tableData, this.idx, this.form);
                        this.$message.success('修改成功');
                        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        console.log('修改该用户信息成功');
                    } else {
                        this.getData();
                        // this.$message.error(res.data.message);
                        // this.$router.push('/usermanage');
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
            this.$set(this.query, 'page', val);
            this.getData(val);
        },
        handleSearch() {
            let tmp = new FormData();
            tmp.append('game_info_id', this.searchid);
            axios.post('/admin/gameinfo/get',tmp).then(
                res => {
                    if (res.data.code===200){
                        console.log("接受到的数据为：");
                        console.log(res);
                        console.log(res.data.data);
                        this.tableData = [
                            res.data.data.result,
                        ];
                    }else {
                        this.$message.warning(res.data.message);
                        console.log("失败")
                    }
                }
            ).catch(err => {
                this.$message.error('网络请求失败');
            });
            console.log(this.tableData);
        },
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
