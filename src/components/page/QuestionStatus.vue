<template>
    <div>
        <el-row >
            <el-col :span="8">
                <el-card>
                    <div>
                        答题总人数 :{{this.play_game_user_num}}
                    </div>
                </el-card>
                <el-card>
                    <div>
                        总答题数 :{{this.play_num}}
                    </div>
                </el-card>
                <el-card>
                    <div>
                        答题正确率 :{{this.accuracy}}
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-row :gutter="10">
                    <div class="grid-content bg-purple" id="chart1" ></div>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row :gutter="10">
                    <div class="grid-content bg-purple" id="chart2" ></div>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';

import bus from '../common/bus';
import axios from "axios";
import * as echarts from "echarts";
export default {
    name: 'dashboard',
    // created() {
    //     this.getdata();
    // },
    data() {
        return {

            // chart1
            chartDom1: "",
            mychart1: "",
            option1: "",

            // // chart2
            chartDom2: "",
            mychart2: "",
            option2: "",

            name: localStorage.getItem('ms_username'),

            accuracy: "0%",
            answer_num: {},
            game_error: {},
            play_game_user_num: 0,
            play_num: 0,

            user_rank_by_playnum: [],
            user_rank_by_score: [],

            date:{
                date1:'2023-03-20',
                date2:'2023-03-29',
            },
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },

    mounted() {
        this.chartDom1 = document.getElementById('chart1');
        this.mychart1 = echarts.init((this.chartDom1));

        this.chartDom2 = document.getElementById('chart2');
        this.mychart2 = echarts.init((this.chartDom2));
        //
        this.getdata();

    },

    methods: {

        async getdata() {
            axios.get('/admin/playinfo').then(
                res => {
                    console.log('接收数据', res.data.data);
                    let data = res.data.data;
                    this.accuracy = data.accuracy;
                    this.answer_num = data.answer_num;
                    this.game_error = data.game_error;
                    this.play_game_user_num = data.play_game_user_num;
                    this.play_num = data.play_num;
                    this.user_rank_by_playnum = data.user_rank.user_rank_by_playnum;
                    this.user_rank_by_score = data.user_rank.user_rank_by_score;
                    this.initChart1();
                    this.initChart2();
                }
            ).catch(err => {
                this.$message.error(err.message);
            })
        },

        initChart1() {
            console.log('图表1初始化成功');
            this.option1 = {
                title:{
                    text: '今日答题情况',
                    left: 'center',
                },
                legend:{
                    left: "center",
                    top: "bottom",
                    data: ['今日答题人数'],
                },
                xAxis: {
                    // type: 'value',
                    data: Object.keys(this.answer_num),

                },
                yAxis: {},
                series: [
                    {
                        label:{
                            normal:{
                                show: true,
                                position: 'bottom',
                            }
                        },
                        name: '答题人数',
                        type: 'line',
                        data: Object.values(this.answer_num),
                    },
                ]
            };
            this.option1 && this.mychart1.setOption(this.option1);
        },

        initChart2() {
            console.log('图表2初始化成功');
            console.log(this.game_error);
            this.option2 = {
                title:{
                    text: '题目错误率Top10',
                    left: 'center',
                },
                xAxis: {
                    // type: 'value',
                    data: Object.keys(this.game_error),
                },
                yAxis: {},
                series: [
                    {
                        label:{
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: `{c}%`,
                                color: "#ffffff", //颜色
                            },

                        },
                        type: 'bar',
                        data: Object.values(this.game_error),
                    },
                ]
            };
            this.option2 && this.mychart2.setOption(this.option2);
        },

    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}
.box-card {
    display: flex;
    align-content: center;
    height: 270px;
    /*display-inside: ;*/
}

.box-card1{
    display: flex;
    align-content: center;
    height: 270px;
    /*display-inside: ;*/
}

.hot-words-title {
    display: flex;
    align-content: center;
    padding: 8px;
    font-size: 16px;
    /*padding-left: 50px;*/
    /*align-items: center;*/
    /*padding-bottom: 10px;*/
    border-bottom: 2px solid #ccc;
    margin-bottom: 10px;

}

.text-item {
    display: flex;
    align-content: center;
    padding: 10px;
    /*border-bottom: 2px solid #ccc;*/
}

.grid-content {
    display: flex;
    align-items: center;
    height: 500px;
    width: 500px;
}




.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    padding-left: 50px;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 90px;
    height: 90px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 60px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    padding-left: 50px;
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 45px;
}

.mgb20 {
    margin-bottom: 10px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
