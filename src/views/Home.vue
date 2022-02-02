<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import LoginForm from '@/components/LoginForm.vue';

export default {
	components: { LoginForm },

	setup () {
		const store = useStore();
		const isLoggedIn = computed(() => store.state.auth.isLoggedIn);

		return {
			isLoggedIn,
		};
	},
};
</script>

<template>
	<div>
		<h1>Home.vue</h1>
		<p v-if="isLoggedIn">You are logged in</p>
		<login-form v-else />
	</div>
</template>
