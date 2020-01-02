<template>
    <div class="layout">
        <NavigateMenu
        :active-name="activeName"
        :open-names="openNames">
        </NavigateMenu>
        <Layout :style="{marginLeft: '200px'}">
            <Content style="background-color:white">
                <div class="pre">
                    <center><h1>系统全局区SGA调整</h1></center>
                </div>
                <div class="graph">
                    <!-- <Histogram
                    :chartData="chartData"
                    :chartSettings="chartSettings">
                    </Histogram> -->
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
    name: 'Experiment2_8',
    components:{
        Histogram,
        NavigateMenu
    },
    data(){
        return{
            activeName:"2-8",
            openNames:["2"]
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