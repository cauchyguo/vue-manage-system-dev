<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:213px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2023-03-16</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>苏州</span>
                    </div>
                </el-card>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}" class="box-card">
                            <div>
                                <div class="hot-words-title" slot="header">
                                    <span> 热门文本(Top5)</span>
                                </div>
                                <div v-for="(item,i) in top_words_list_today" class="text-item" >
                                    {{i + 1}}  {{item}}
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}"  class="box-card">
                            <div>
                                <div class="hot-words-title" slot="header">
                                    <span>热门图片(Top5)</span>
                                </div>
                                <div v-for="(item,i) in top_picture_list_today" class="text-item" >
                                    {{i + 1}}  {{item}}
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}"  class="box-card">
                            <div>
                                <div class="hot-words-title" slot="header">
                                    <span>热门语音(Top5)</span>
                                </div>
                                <div v-for="(item,i) in top_vocal_list_today" class="text-item" >
                                    {{i + 1}}  {{item}}
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

<!--                第三行-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}" class="box-card1">
                            <div>
                                <div class="hot-words-title" slot="header" align="center">
                                    <span>答题数量排行(Top5)</span>
                                </div>
                                <div v-for="(item,i) in user_rank_by_playnum" class="text-item" >
                                    {{i + 1}}  {{item}}
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}"  class="box-card1">
                            <div>
                                <div class="hot-words-title" slot="header">
                                    <span>积分排行(Top5)</span>
                                </div>
                                <div v-for="(item,i) in user_rank_by_score" class="text-item" >
                                    {{i + 1}}  {{item}}
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                </el-row>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>今日总用户</div>
                                    <div class="grid-num">{{ user_today }}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-friendadd grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>今日新用户</div>
                                    <div class="grid-num">{{ new_user_today }}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-peoplefill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>今日老用户</div>
                                    <div class="grid-num">{{ old_user_today }}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>今日答题人数</div>
                                    <div class="grid-num">{{ user_today }}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-emojifill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>今日答题次数</div>
                                    <div class="grid-num">{{ gb_classify_today }}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-emojifill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>分类次数</div>
                                    <div class="grid-num">{{ gb_classify_today }}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mgb20">
                    <el-card shadow="hover" style="height:562px;align-content: center">
                        <div class="grid-content-chart1 bg-purple" id="chart1" ></div>
                    </el-card>
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
    created() {
        this.getdata();
    },
    data() {
        return {

            // chart1
            chartDom1: "",
            mychart1: "",
            option1: "",

            // // chart2
            // chartDom2: "",
            // mychart2: "",
            // option2: "",
            //
            // // chart3
            // chartDom3: "",
            // mychart3: "",
            // option3: "",

            name: localStorage.getItem('ms_username'),
            user_today: 0,
            new_user_today: 0,
            old_user_today: 0,
            gb_classify_today: 0,
            game_play_today: 0,
            top_words_list_today: [],
            top_picture_list_today: [],
            top_vocal_list_today: [],
            user_rank_by_playnum: [],
            user_rank_by_score: [],

            options2: {
                type: 'line',
                title: {
                    text: '上周用户登录人数'
                },
                yEqual: 6,
                labels: ['周一', '周二', '周三', '周四', '周五','周六','周日'],
                datasets: [
                    {
                        label: '在线人数',
                        data: [234, 278, 270, 190, 230,400,599]
                    },
                    {
                        label: '新用户人数',
                        data: [164, 178, 150, 135, 160, 300, 259],

                    },
                    {
                        label: '老用户人数',
                        data: [70, 100, 120, 55, 70, 100, 340],

                    }
                ]
            }
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

        // this.chartDom2 = document.getElementById('chart2');
        // this.mychart2 = echarts.init((this.chartDom2));
        //
        // this.chartDom3 = document.getElementById('chart3');
        // this.mychart3 = echarts.init((this.chartDom3));

        this.getdata();

    },

    methods: {

        async getdata() {
            axios.get('/admin/index').then(
                res => {
                    console.log(res.data.data);
                    this.obj = res.data.data;

                    this.user_today = this.obj.user_today;
                    this.new_user_today = this.obj.new_user_today;
                    this.old_user_today = this.obj.old_user_today
                    this.gb_classify_today = this.obj.gb_classify_today;
                    this.game_play_today = this.obj.game_play_today;
                    this.top_words_list_today= this.obj.top_info_today.top_words_list_today;
                    this.top_picture_list_today= this.obj.top_info_today.top_picture_list_today;
                    this.top_vocal_list_today= this.obj.top_info_today.top_vocal_list_today;
                    this.user_rank_by_playnum = this.obj.user_rank.user_rank_by_playnum;
                    this.user_rank_by_score = this.obj.user_rank.user_rank_by_score;

                    //

                    this.initChart1(this.obj.user_login_by_week,this.obj.user_game_by_week);


                    // this.options2.datasets

                }
            ).catch(err =>{
                this.$message.error('网络失败');

            })
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        initChart1(user_login_by_week,user_game_by_week) {
            this.option1 = {
                title:{
                    text: '用户上周使用情况',
                    left: 'center',
                },
                legend:{
                    left: "center",
                    top: "bottom",
                    data: ['用户使用人数', '答题人数'],
                },
                xAxis: {
                    // type: 'value',
                    data: ['周一', '周二', '周三', '周四', '周五','周六','周日'],
                },
                yAxis: {},
                series: [
                    {
                        label:{
                            normal:{
                                show: true,
                                position: 'top',
                            }
                        },
                        name: '用户使用人数',
                        type: 'line',
                        data: user_login_by_week,
                    },
                    {
                        label:{
                            normal:{
                                show: true,
                                position: 'bottom',
                            }
                        },
                        name: '答题人数',
                        type: 'line',
                        data: user_game_by_week,
                    },
                ]
            };
            this.option1 && this.mychart1.setOption(this.option1);
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
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num1 {
    font-size: 18px;
    /*font-weight: bold;*/
    align-content: flex-end;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-content-chart1 {
    align-content: center;
    height: 450px;
    width: 600px;
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
