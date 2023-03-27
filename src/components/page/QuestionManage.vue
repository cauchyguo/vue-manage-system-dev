<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 题库管理
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
                <el-input v-model="query.name" placeholder="题库id" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-search" @click="handleNew">新增题目</el-button>
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
                <el-table-column prop="game_id" label="题目id" width="80" align="center"></el-table-column>
                <el-table-column prop="game_type" label="题目类型" width="100" align="center"></el-table-column>
                <el-table-column prop="game_question" label="题目问题" width="360" align="left"></el-table-column>
                <el-table-column prop="game_choice1" label="选项A" width="120" align="center"></el-table-column>
                <el-table-column prop="game_choice2" label="选项B" width="120" align="center"></el-table-column>
                <el-table-column prop="game_choice3" label="选项C" width="120" align="center"></el-table-column>
                <el-table-column prop="game_choice4" label="选项D" width="120" align="center"></el-table-column>
                <el-table-column prop="game_answer" label="答案" width="120" align="center"></el-table-column>



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

                <el-form-item label="题目id">
                    <el-input v-model="form.game_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="题目类型">
                    <el-select v-model="form.game_type" placeholder="题目类型" class="handle-select mr10">
                        <el-option key="1" label="多选" value="多选"></el-option>
                        <el-option key="2" label="单选" value="单选"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="题目问题">
                    <el-input v-model="form.game_question"></el-input>
                </el-form-item>
                <el-form-item label="选项A">
                    <el-input v-model="form.game_choice1"></el-input>
                </el-form-item>
                <el-form-item label="选项B">
                    <el-input v-model="form.game_choice2"></el-input>
                </el-form-item>
                <el-form-item label="选项C">
                    <el-input v-model="form.game_choice3"></el-input>
                </el-form-item>
                <el-form-item label="选项D">
                    <el-input v-model="form.game_choice4"></el-input>
                </el-form-item>
                <el-form-item label="答案">
                    <el-input v-model="form.game_answer"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="editVisible1" width="30%">
            <el-form ref="form1" :model="form1" label-width="70px">
                <el-form-item label="题目类型">
                    <el-select v-model="form1.game_type" placeholder="题目类型" class="handle-select mr10">
                        <el-option key="1" label="多选" value="多选"></el-option>
                        <el-option key="2" label="单选" value="单选"></el-option>
                    </el-select>
<!--                    <el-input v-model="form1.game_type"></el-input>-->
                </el-form-item>
                <el-form-item label="题目问题">
                    <el-input v-model="form1.game_question"></el-input>
                </el-form-item>
                <el-form-item label="选项A">
                    <el-input v-model="form1.game_choice1"></el-input>
                </el-form-item>
                <el-form-item label="选项B">
                    <el-input v-model="form1.game_choice2"></el-input>
                </el-form-item>
                <el-form-item label="选项C">
                    <el-input v-model="form1.game_choice3"></el-input>
                </el-form-item>
                <el-form-item label="选项D">
                    <el-input v-model="form1.game_choice4"></el-input>
                </el-form-item>
                <el-form-item label="答案">
                    <el-input v-model="form1.game_answer"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveNew">确 定</el-button>
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
            editVisible1: false,
            pageTotal: 0,
            form: {},
            form1: {},

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
            axios.get('/admin/gameinfo/list').then(
                res => {
                    console.log("接受到的数据为：");

                    console.log(res.data.data);
                    this.tableData = res.data.data.tiku_list;

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

        handleNew() {
            this.editVisible1 = true;
            console.log("handleNew");
            console.log(this.form1);
        },

        // 保存新增
        saveNew() {
            this.editVisible1 = false;
            console.log('--------');
            console.log(this.form1.game_question);
            // this.$set(this.tableData, this.idx, this.form1);
            let tmp = new FormData();
            tmp.append('game_type', this.form1.game_type);
            tmp.append('game_question', this.form1.game_question);
            tmp.append('game_choice1', this.form1.game_choice1);
            tmp.append('game_choice2', this.form1.game_choice2);
            tmp.append('game_choice3', this.form1.game_choice3);
            tmp.append('game_choice4', this.form1.game_choice4);
            tmp.append('game_answer', this.form1.game_answer);
            console.log('--------------');
            console.log(tmp);
            axios.post('/admin/gameinfo/new', tmp).then(
                res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        console.log(res.data.data)
                        this.$message.success('新增成功');
                        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        console.log('新增题库信息成功');
                    } else {
                        this.getData();
                        this.$message.error(res.data.message);
                        this.$router.push('/questionmanage');
                    }
                }
            ).catch(err => {
                this.getData();
                this.$message.error('网络请求失败');
            })
            // this.$set(this.tableData, this.idx, this.form);
            this.getData();
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            // this.$set(this.tableData, this.idx, this.form);
            let tmp = new FormData();
            tmp.append('game_id', this.form.game_id);
            tmp.append('game_type', this.form.game_type);
            tmp.append('game_question', this.form.game_question);
            tmp.append('game_choice1', this.form.game_choice1);
            tmp.append('game_choice2', this.form.game_choice2);
            tmp.append('game_choice3', this.form.game_choice3);
            tmp.append('game_choice4', this.form.game_choice4);
            tmp.append('game_answer', this.form.game_answer);
            // tmp.append('game_id', this.tableData[this.idx].game_id);
            // tmp.append('game_type', this.tableData[this.idx].game_type);
            // tmp.append('game_question', this.tableData[this.idx].game_question);
            // tmp.append('game_choice1', this.tableData[this.idx].game_choice1);
            // tmp.append('game_choice2', this.tableData[this.idx].game_choice2);
            // tmp.append('game_choice3', this.tableData[this.idx].game_choice3);
            // tmp.append('game_choice4', this.tableData[this.idx].game_choice4);
            // tmp.append('game_answer', this.tableData[this.idx].game_answer);
            console.log('发送的修改信息:',tmp);
            console.log(tmp['game_question']);
            axios.post('/admin/gameinfo/update', tmp).then(
                res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.$set(this.tableData, this.idx, this.form);
                        this.$message.success('修改成功');
                        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        console.log('修改该题目信息成功');
                        this.getData();
                    } else {
                        this.getData();
                        this.$message.error(res.data.message);
                        this.$router.push('/questionmanage');
                    }
                }
            ).catch(err => {
                this.getData();
                this.$message.error('网络请求失败');
            });

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
