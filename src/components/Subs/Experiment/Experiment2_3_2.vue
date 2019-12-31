<template>
    <div class="layout">
        <NavigateMenu
        :active-name="activeName"
        :open-names="openNames">
        </NavigateMenu>
        <Layout :style="{marginLeft: '200px'}">
            <Content style="background-color:white">
                <div class="pre">
                    多个索引实验
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
    name: 'Experiment2_3_2',
    components:{
        Histogram,
        NavigateMenu
    },
    data(){
        return{
            activeName:"2-3-2",
            openNames:["2","2-3"],
            chartData:{
                columns: ['索引', '时间'],
                rows: [
                    { '索引': 'id散列&标志位散列', '时间': 1393},
                    { '索引': 'idB树&标志位B树', '时间': 3530},
                    { '索引': 'idB树&标志位位图', '时间': 1393},
                    { '索引': 'id散列&标志位位图', '时间': 1393}
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