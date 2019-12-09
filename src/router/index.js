import Vue from 'vue'
import router from 'vue-router'
import Home from '@/components/Home'
import Start from '@/components/Start'
import zoom from '@/components/Zoom'
import Explore from '@/components/Explore'
import SearchResult from '@/components/SearchResult'
// import Topic from '@/components/Topic'
Vue.use(router)

export default new router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/index', alias:'/',
      name: 'Start',
      component: Start,
      meta: {
        keepAlive: false
      }
    },
    {
      path:'/zoom',
      name:'zoom',
      component:zoom,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/explore',
      name:'Explore',
      component:Explore,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/searchResult',
      name:'SearchResult',
      component:SearchResult,
      meta:{
        keepAlive:true
      }
    },
  ]
})

