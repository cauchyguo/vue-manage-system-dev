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
        this.getData();
        // this.mychart1.


    },
    methods:{
        initChart1(male=80,female=500) {
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
                        label:{
                            show: true,

                        },
                        data:[
                            {
                                value:male,
                                name: '男性',
                            },
                            {
                                value: female,
                                name: '女性',
                            },
                        ]
                    },
                ]
            };
            this.option1 && this.mychart1.setOption(this.option1);
            // this.mychart1.resize();
        },
        initChart2(top_city_dict) {
            this.option2 = {
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
                        type: 'bar',
                        data: Object.values(top_city_dict),
                    },
                ]
            };
            this.option2 && this.mychart2.setOption(this.option2);
        },
        // },
        initChart3(male_list,female_list) {
            this.option3 = {
                title:{
                    text: '用户年龄分布',
                    left: 'center',
                },
                xAxis: {
                    data: ['0-20', '20-30', '30-40', '40-60', '>60']
                },
                yAxis: {},
                series: [
                    {
                        type: 'bar',
                        data: male_list,
                    },

                    {
                        type: 'bar',
                        data: female_list,
                    }
                ]
            };
            this.option3 && this.mychart3.setOption(this.option3);

        },
        handleClick(tab, event) {
            console.log(tab, event);
            this.activeName = tab;
        },

        async getData() {
            console.log("开始调用getData()");
            axios.get('/admin/users').then(
                res => {
                    console.log("开始请求用户数据");
                    console.log(res.data.data);
                    console.log("请求数据成功");
                    this.obj = res.data.data;
                    // console.log(this.population.datasets);
                    console.log(this.obj.population.male_number)
                    console.log(this.obj.population.female_number)

                    console.log(this.obj);
                    console.log(this.obj.age_dist.male_age_dist);
                    console.log(this.obj.age_dist.female_age_dist);
                    this.initChart1(this.obj.population.male_number,this.obj.population.female_number);
                    this.initChart2(this.obj.top_user_dist);
                    this.initChart3(this.obj.age_dist.male_age_dist,this.obj.age_dist.female_age_dist);

                }
            ).catch(err =>{
                this.$message.error('网络失败');

            })
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
</style>