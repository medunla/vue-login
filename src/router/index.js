import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Me from '@/views/Me.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/me',
		name: 'Me',
		component: Me
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
