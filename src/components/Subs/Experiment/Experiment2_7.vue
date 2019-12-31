<template>
    <div class="layout">
        <NavigateMenu
        :active-name="activeName"
        :open-names="openNames">
        </NavigateMenu>
        <Layout :style="{marginLeft: '200px'}">
            <Content style="background-color:white">
                <div class="pre">
                    改变block-size
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
    name: 'Experiment2_7',
    components:{
        Histogram,
        NavigateMenu
    },
    data(){
        return{
            activeName:"2-7",
            openNames:["2"],
            chartData:{
                columns: ['大小', 'Oracle','TimesTen'],
                rows: [
                    { '大小': '8K', 'Oracle': 3530,'TimesTen':20000},
                    { '大小': '16K', 'Oracle': 3530, 'TimesTen':20000},
                    { '大小': '32K', 'Oracle': 3530, 'TimesTen':20000},                 
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