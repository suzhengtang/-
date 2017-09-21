import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import air from '@/components/air'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
	  {
		  path: '/air',
		  name: 'air',
		  component: air
	  }
  ]
})
