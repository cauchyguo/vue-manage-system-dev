<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 用户数据统计
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple" id="chart1" ></div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple" id="chart3" ></div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple" id="chart2" ></div>
                </el-col>
            </el-row>
        </div>
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="9">
                    <div class="grid-content-bottom bg-purple" id="chart4" ></div>
                </el-col>
                <el-col :span="3">
                    <el-row>
                        <div><span>起始时间</span></div>
                        <el-date-picker
                            name="开始时间"
                            type="date"
                            placeholder="选择日期"
                            v-model="date.date1"
                            value-format="yyyy-MM-dd"
                            style="width: 150px;"
                        ></el-date-picker>
                    </el-row>
                    <br>
                    <el-row>
                        <div><span>结束时间</span></div>
                        <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="date.date2"
                            value-format="yyyy-MM-dd"
                            style="width: 150px;"
                        ></el-date-picker>
                    </el-row>
                    <br>
                    <el-button type="primary" icon="el-icon-time" @click="getData">确认</el-button>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content-bottom bg-purple" id="chart5" ></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import axios from "axios";
import * as echarts from 'echarts';

export default {
    name: 'basecharts',

    created() {
        console.log("用户vue页面创建中");
        // this.getData();
    },
    data() {
        return {
            date: {
                date1:'2023-03-20',
                date2:'2023-03-29',
            },

            // chart1
            chartDom1: "",
            mychart1: "",
            option1: "",

            // chart2
            chartDom2: "",
            mychart2: "",
            option2: "",

            // chart3
            chartDom3: "",
            mychart3: "",
            option3: "",

            // chart4
            chartDom4: "",
            mychart4: "",
            option4: "",

            // chart5
            chartDom5: "",
            mychart5: "",
            option5: "",

        };
    },
    mounted() {
        console.log("开始挂载");

        this.chartDom1 = document.getElementById('chart1');
        this.mychart1 = echarts.init((this.chartDom1));

        this.chartDom2 = document.getElementById('chart2');
        this.mychart2 = echarts.init((this.chartDom2));

        this.chartDom3 = document.getElementById('chart3');
        this.mychart3 = echarts.init((this.chartDom3));

        this.chartDom4 = document.getElementById('chart4');
        this.mychart4 = echarts.init((this.chartDom4));

        this.chartDom5 = document.getElementById('chart5');
        this.mychart5 = echarts.init((this.chartDom5));
        
        this.getData();
        // this.mychart1.


    },
    methods:{
        initChart1(male=80,female=500) {
            console.log('图表1初始化成功');

            this.option1 = {
                title:{
                    text: '用户性别比例',
                    left: 'center',
                },
                legend:{
                    left: "center",
                    top: "bottom",
                    data: ['男性', '女性'],
                },
                toolbox:{
                    show: true,
                },
                series:[
                    {

                        name: "Area Mode",
                        type: "pie",
                        data: [
                            {
                                value: male,
                                name: '男性',
                            },
                            {
                                value: female,
                                name: '女性',
                            },
                        ],
                        label:{

                            normal:{
                                formatter: `{d}%`,
                                color: "#ffffff", //颜色
                                fontSize: 12, //字体大小
                                show: true,
                                position: "inside", //outside 外部显示  inside 内部显示

                            },
                            labelLine :{show:true}
                        },
                    },
                ]
            };
            this.option1 && this.mychart1.setOption(this.option1);
            // this.mychart1.resize();
        },
        initChart2(values) {
            console.log('图表3初始化成功');

            this.option2 = {
                title:{
                    text: '用户学历分布',
                    left: 'center',
                },
                // top: top + '%',
                // height: '33.33%',
                legend:{
                    left: "center",
                    top: "bottom",
                    data: ['无','小学', '中学','大专','本科','研究生'],
                },
                toolbox:{
                    show: true,
                },
                series:[
                    {

                        name: "Area Mode",
                        type: "pie",
                        radius: ['30%', '70%'],
                        avoidLabelOverlap: true,
                        data: [
                            {
                                value: values[0],
                                name: '无',
                            },
                            {
                                value: values[1],
                                name: '小学',
                            },
                            {
                                value: values[2],
                                name: '中学',
                            },
                            {
                                value: values[3],
                                name: '大专',
                            },
                            {
                                value: values[4],
                                name: '本科',
                            },
                            {
                                value: values[5],
                                name: '研究生',
                            },
                        ],
                        label:{
                            alignTo: 'edge',
                            minMargin: 5,
                            edgeDistance: 10,
                            lineHeight: 15,
                            rich: {
                                time: {
                                    fontSize: 10,
                                    color: '#999'
                                }
                            },
                            normal:{
                                show: true,
                                formatter: `{d}%`,
                                // color: "#ffffff", //颜色
                                fontSize: 12, //字体大小
                                position: "inside", //outside 外部显示  inside 内部显示
                            },
                            labelLine :{show:true},
                        },
                    },
                ]
            };
            this.option2 && this.mychart2.setOption(this.option2);
        },
        // },
        initChart3(male_list,female_list) {
            console.log('图表2初始化成功');

            this.option3 = {
                title:{
                    text: '用户年龄分布',
                    left: 'center',
                },

                legend:{
                    left: "center",
                    top: "bottom",
                    data: ['男性', '女性'],
                },
                xAxis: {
                    data: ['0-20', '20-30', '30-40', '40-60', '>60']
                },
                yAxis: {
                    name: '人数',
                },
                series: [
                    {
                        name: '男性',
                        type: 'bar',
                        data: male_list,
                        stack: 'x',
                        label:{

                            normal:{
                                show: true,
                                position: 'top',
                            }
                        },
                    },

                    {
                        name: '女性',
                        type: 'bar',
                        data: female_list,
                        stack: 'x',
                        label:{
                            normal:{
                                show: true,
                                position: 'top',
                            }
                        },
                    },
                ]
            };
            this.option3 && this.mychart3.setOption(this.option3);

        },
        initChart4(online_data) {
            console.log('图表5初始化成功');
            this.option4 = {
                title:{
                    text: '用户在线数据',
                    left: 'center',
                },
                legend:{
                    left: "center",
                    top: "bottom",
                    data: ['在线人数', '新用户人数','老用户人数'],
                },
                xAxis: {
                    // type: 'value',
                    data: Object.keys(online_data.users_online_list),
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
                        name: '在线人数',
                        type: 'line',
                        data: Object.values(online_data.users_online_list),
                    },
                    {
                        label:{
                            normal:{
                                show: true,
                                position: 'top',
                            }
                        },
                        name: '新用户人数',
                        type: 'line',
                        data: Object.values(online_data.new_users_online_list),
                    },
                    {
                        label:{
                            normal:{
                                show: true,
                                position: 'top',
                            }
                        },
                        name: '老用户人数',
                        type: 'line',
                        data: Object.values(online_data.old_users_online_list),
                    },
                ]
            };
            this.option4 && this.mychart4.setOption(this.option4);
        },
        initChart5(top_city_dict) {
            console.log('图表5初始化成功');
            this.option5 = {
                title:{
                    text: '用户地区分布',
                    left: 'center',
                },
                xAxis: {
                    // type: 'value',
                    data: Object.keys(top_city_dict),
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
                        type: 'bar',
                        data: Object.values(top_city_dict),
                    },
                ]
            };
            this.option5 && this.mychart5.setOption(this.option5);
        },
        // handleClick(tab, event) {
        //     console.log(tab, event);
        //     this.activeName = tab;
        // },

        async getData() {
            console.log("开始调用getData()");

            if (this.date.date1 <= this.date.date2) {
                console.log('时间准确');
                axios.get('/admin/users',{
                    params:{
                        date1: this.date.date1,
                        date2: this.date.date2,
                    }
                }).then(
                    res => {
                        console.log("开始请求用户数据");
                        console.log(res.data.data);
                        console.log("请求数据成功");
                        this.obj = res.data.data;
                        let user_online_list = this.obj.user_online_list
                        console.log(this.obj);
                        this.initChart1(this.obj.population.male_number, this.obj.population.female_number);
                        this.initChart2(this.obj.background);
                        this.initChart3(this.obj.age_dist.male_age_dist, this.obj.age_dist.female_age_dist);
                        this.initChart4(user_online_list);
                        this.initChart5(this.obj.top_user_dist);

                    }
                ).catch(err => {
                    this.$message.error('网络失败');

                });

            } else {
                this.$message.error('时间错误');
                console.log('时间不对');
            }

        },
    }
};
</script>

<style scoped>

.container {
    height: 100%;
    width: 100%;
}


.grid-content {
    height: 300px;
    width: 400px;
}
.grid-content-bottom {
    height: 400px;
    width: 580px;
}

</style>