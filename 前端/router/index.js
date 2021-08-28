import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login'
import newhouse from '../views/newhouse'
import oldhouse from '../views/oldhouse'
import rent from '../views/rent'
import managehome from '../views/managehome'
import usermanage from '../views/userManage'
import newhousemanage from '../views/newHouseManage'
import oldhousemanage from '../views/oldHouseManage'
import rentmanage from '../views/rentManage.vue'
import post from '../views/post'
import post1 from '../views/post1'
import house from '../views/House.vue'
import housedetails from '../views/housedetails.vue'

Vue.use(VueRouter)

//解决ElementUI导航栏中的vue-router在3.0版本以上重复点击菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/',
        name:'newhouse',
        component:newhouse
      },
      {
        path:'/oldhouse',
        name:'oldhouse',
        component:oldhouse
      },
      {
        path:'/rent',
        name:'rent',
        component:rent
      },
		{
			path: '/post',
			name: 'post',
			component: () => import('../views/post.vue')
		},
		{
			path: '/personal',
			name: 'personal',
			component: () => import('../views/personal.vue'),
			children: [
				{
					path: '/userinfo',
					name: 'userinfo',
					component: () => import('../views/userinfo.vue')
				},
				{
					path: '/postinfo',
					name: 'postinfo',
					component: () => import('../views/postinfo.vue')
				},
				{
					path: '/starinfo',
					name: 'starinfo',
					component: () => import('../views/starinfo.vue')
				},
				{
					path: '/helpinfo',
					name: 'helpinfo',
					component: () => import('../views/helpinfo.vue')
				}
			]
		}
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/house',
    name: 'house',
    component: house
  },
  {
    path:'/managehome',
    name:'managehome',
    component:managehome,
    children:[
		 {
		   path:'/usermanage',
		   name:'usermanage',
		   component:usermanage
		 },
      {
        path:'/newhousemanage',
        name:'newhousemanage',
        component:newhousemanage
      },
      {
        path:'/oldhousemanage',
        name:'oldhousemanage',
        component:oldhousemanage
      },
       {
      	  path:'/housedetails',
      	  name:'housedetails',
      	  component:housedetails
      },
      {
        path:'/rentmanage',
        name:'rentmanage',
        component:rentmanage
      }
    ]
  },
  {
  		path: '/',
  		redirect: '/register'
  	},
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
