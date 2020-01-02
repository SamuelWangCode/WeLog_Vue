<template>
    <div class="layout">
        <NavigateMenu
        :active-name="activeName"
        :open-names="openNames">
        </NavigateMenu>
        <Layout :style="{marginLeft: '200px'}">
            <Content style="background-color:white">
                <div class="pre">
                    <center><h1>SQL语句优化：调整Where字句顺序</h1></center>
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
    name: 'Experiment2_2_1',
    components:{
        Histogram,
        NavigateMenu,
    },
    data(){
        return{
            activeName:"2-2-1",
            openNames:["2","2-2"],
            chartData:{
                columns: ['操作', '时间'],
                rows: [
                    { '操作': 'SQL语句改进前', '时间': 375},
                    { '操作': 'SQL语句改进后', '时间': 7}
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