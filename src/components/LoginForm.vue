<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
	setup () {
		const store = useStore();

		const username = ref('');
		const password = ref('');
		const isLoading = computed(() => store.state.auth.isLoading);
		const errorMessage = computed(() => store.state.auth.errorMessage);
		const submitButtonLabel = computed(() => isLoading.value ? 'Submitting' : 'Submit');

		const handleSubmit = async () => {
			await store.dispatch('auth/postLogin', {
				username: username.value,
				password: password.value,
			});
		};

		return {
			errorMessage,
			username,
			password,
			submitButtonLabel,
			handleSubmit,
		};
	},
};
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<div>
			<label>
				Username<br/>
				<input
					v-model="username"
					type="text"
				>
			</label>
		</div>
		<div>
			<label>
				Password<br/>
				<input
					v-model="password"
					type="password"
				>
			</label>
		</div>
		<input
			:value="submitButtonLabel"
			type="submit"
		>
		<p
			v-if="errorMessage"
			class="error-text"
		>
			{{ errorMessage }}
		</p>
	</form>
</template>

<style>
.error-text {
	color: red;
}
</style>