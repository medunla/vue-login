import { createRouter, createWebHistory } from 'vue-router';
import routeName from '@/enums/routeName';

import Home from '@/views/Home.vue';
import Me from '@/views/Me.vue';

const routes = [
	{
		path: '/',
		name: routeName.HOME,
		component: Home,
	},
	{
		path: '/me',
		name: routeName.ME,
		component: Me
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
