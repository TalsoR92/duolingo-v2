<template>
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-white p-6 rounded shadow-lg">
			<h2 class="text-xl font-bold mb-4">Enter Password</h2>

			<!-- Affiche "No password needed" si noPassword est vrai -->
			<p v-if="noPassword" class="text-green-500 text-center mb-4">No password needed</p>

			<!-- Champ de mot de passe masqué si pas de mot de passe nécessaire -->
			<input
				v-if="!noPassword"
				v-model="password"
				type="password"
				placeholder="Enter your password"
				class="w-full mb-4 p-2 border rounded"
			/>

			<div class="flex justify-end space-x-2">
				<button @click="$emit('close')" class="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
					Cancel
				</button>
				<button @click="submitPassword" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
					Submit
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "PasswordModal",
	props: {
		noPassword: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const password = ref("");

		const submitPassword = () => {
			emit("submit", password.value);
		};

		return {
			password,
			submitPassword,
		};
	},
});
</script>
