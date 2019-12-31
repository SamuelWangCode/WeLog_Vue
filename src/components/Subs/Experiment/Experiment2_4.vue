<template>
    <div class="layout">
        <NavigateMenu
        :active-name="activeName"
        :open-names="openNames">
        </NavigateMenu>
        <Layout :style="{marginLeft: '200px'}">
            <Content style="background-color:white">
                <div class="pre">
                    SQL预编译
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
    name: 'Experiment2_4',
    components:{
        Histogram,
        NavigateMenu
    },
    data(){
        return{
            activeName:"2-4",
            openNames:["2"],
            chartData:{
                columns: ['操作', '时间'],
                rows: [
                    { '操作': '不使用预编译', '时间': 1393},
                    { '操作': '使用预编译', '时间': 3530}
                ]
            },
            chartSettings:{
                showLine:['时间']
            }
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