<template>
	<div class="flex flex-col items-center justify-start h-screen bg-gray-100 pt-16">
		<h1 class="text-4xl font-bold mb-8">English Training</h1>
		<!-- Conteneur pour les boutons -->
		<div class="flex flex-col items-center space-y-4">
			<!-- Bouton Play -->
			<router-link to="/play">
				<button class="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg transition duration-300 transform hover:scale-105">Play</button>
			</router-link>
			<!-- Bouton Vocab Lists -->
			<router-link to="/vocab-lists">
				<button class="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 shadow-lg transition duration-300 transform hover:scale-105">Vocab Lists</button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Home",
});
</script>
