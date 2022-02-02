<script>
import { reactive } from 'vue';
import routeName from '@/enums/routeName';

export default {
	setup () {
		const navigationList = reactive([
			{
				label: 'Home',
				to: { name: routeName.HOME },
			},
			{
				label: 'Me',
				to: { name: routeName.ME },
			},
		]);

		return {
			navigationList,
		};
	},
};
</script>

<template>
	<div>
		<ul class="navigation-list">
			<li
				v-for="(item, index) in navigationList"
				:key="index"
			>
				<router-link :to="item.to">{{ item.label }}</router-link>
			</li>
		</ul>
		<hr>
		<router-view />
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

.navigation-list {
	display: flex;
	justify-content: center;
	gap: 8px;
	list-style-type: none;
	padding: 0;
	margin: 0;
}
</style>
