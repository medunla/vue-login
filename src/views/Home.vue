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
			handleLogout: () => store.dispatch('auth/logout'),
		};
	},
};
</script>

<template>
	<div>
		<h1>Home.vue</h1>
		<template v-if="isLoggedIn">
			<h3>You are logged in</h3>
			<button
				type="button"
				@click="handleLogout"
			>
				Logout
			</button>
		</template>
		<login-form v-else />
	</div>
</template>
