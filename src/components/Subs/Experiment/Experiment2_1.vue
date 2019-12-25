<template>
    <div class="layout">
        <NavigateMenu
        :active-name="activeName"
        :open-names="openNames">
        </NavigateMenu>
        <Layout :style="{marginLeft: '200px'}">
            <Content style="background-color:white">
                <div class="pre">

                </div>
                <div class="graph">
                    <Histogram
                    :chartData="chartData"
                    :chartSettings="chartSettings">
                    </Histogram>
                </div>
                <div class="after">

                </div>
            </Content>
        </Layout>
    </div>
</template>

<script>
import Histogram from "../Histogram"
import NavigateMenu from '../NavigateMenu'
export default {
    name: 'Experiment2_1',
    components:{
        Histogram,
        NavigateMenu
    },
    data(){
        return{
            activeName:"2-1",
            openNames:["2"],
            chartData:{
                columns: ['TimesTen修改次数', '不使用物化视图', 'complete refresh', 'fast refresh'],
                rows: [
                    { 'TimesTen修改次数': '10', '不使用物化视图': 1393, 'complete refresh': 1093, 'fast refresh': 0.32},
                    { 'TimesTen修改次数': '100', '不使用物化视图': 3530, 'complete refresh': 3230, 'fast refresh': 0.26},
                    { 'TimesTen修改次数': '1000', '不使用物化视图': 2923, 'complete refresh': 2623, 'fast refresh': 0.76}
                ]
            },
            chartSettings:{}
        }
    }
}
</script>

<style scoped>
.layout{
    /* border: 1px solid #d7dde4; */
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
</style>