<template>
	<div class="w-full max-w-3xl mb-6">
		<!-- Boutons de tri -->
		<div class="flex justify-center mb-4">
			<button
				class="px-4 py-2 rounded transition mr-2"
				:class="{
					'bg-blue-500 text-white': isSortedByDate,
					'bg-gray-300 text-gray-700': !isSortedByDate,
				}"
				@click="sortByDate"
			>
				Sort by Date
			</button>
			<button
				class="px-4 py-2 rounded transition ml-2"
				:class="{
					'bg-blue-500 text-white': isSortedAlphabetically,
					'bg-gray-300 text-gray-700': !isSortedAlphabetically,
				}"
				@click="sortAlphabetically"
			>
				Sort Alphabetically
			</button>
		</div>

		<ul>
			<li v-for="(word, index) in sortedWords" :key="index" class="flex justify-between items-center p-2 mb-2 bg-white border border-gray-200 rounded shadow-md">
				<span>{{ word.word }} - {{ word.translation }}</span>
				<button class="text-red-500 hover:text-red-600" @click="removeWord(index)">&#10005;</button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
	name: "WordList",
	props: {
		words: {
			type: Array as () => { word: string; translation: string }[],
			required: true,
		},
		removeWord: {
			type: Function,
			required: true,
		},
	},
	setup(props) {
		// Initialiser le tri par date comme sélectionné par défaut
		const isSortedByDate = ref(true); // Changer ici pour true
		const isSortedAlphabetically = ref(false); // Changer ici pour false

		// Computed property pour la liste triée
		const sortedWords = computed(() => {
			if (isSortedByDate.value) {
				// Ici, nous devons avoir une date associée à chaque mot pour le tri
				return [...props.words].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
			} else if (isSortedAlphabetically.value) {
				// Trier alphabétiquement
				return [...props.words].sort((a, b) => a.word.localeCompare(b.word));
			}
			// Retourner les mots non triés par défaut
			return props.words;
		});

		// Méthodes pour trier
		const sortByDate = () => {
			isSortedByDate.value = true;
			isSortedAlphabetically.value = false;
		};

		const sortAlphabetically = () => {
			isSortedByDate.value = false;
			isSortedAlphabetically.value = true;
		};

		return {
			sortedWords,
			removeWord: props.removeWord,
			sortByDate,
			sortAlphabetically,
			isSortedByDate,
			isSortedAlphabetically,
		};
	},
});
</script>
