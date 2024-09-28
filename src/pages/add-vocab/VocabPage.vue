<template>
	<div class="flex flex-col items-center justify-start h-screen p-6 bg-gray-100">
		<div class="flex flex-col items-center space-y-2 mb-10">
			<h2 class="text-2xl font-bold text-center">Total Words: {{ words.length }}</h2>
			<button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 shadow-lg transition" @click="saveWords">Save Words</button>
		</div>

		<!-- Ajout de margin pour espacer les composants -->
		<AddWordBox :newWord="newWord" :addWord="addWord" class="mb-6" />

		<div class="w-full max-w-md mb-6">
			<!-- Ajout de margin pour la liste des mots -->
			<ul>
				<li v-for="(word, index) in words" :key="index" class="flex justify-between items-center p-2 mb-2 bg-white border border-gray-200 rounded shadow-md">
					<span>{{ word.word }} - {{ word.translation }}</span>
					<button class="text-red-500 hover:text-red-600" @click="removeWord(index)">&#10005;</button>
				</li>
			</ul>
		</div>

		<button class="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg transition" @click="removeAllWords">Remove All Words</button>
	</div>
</template>

<script lang="ts">
// VocabLists.vue
import { defineComponent, reactive } from "vue";
import AddWordBox from "./AddWordBox.vue";
import { addWordToDatabase } from "../../services/apiService"; // Assurez-vous que le chemin est correct

export default defineComponent({
  name: "VocabLists",
  components: {
    AddWordBox,
  },
  setup() {
    const newWord = reactive({
      word: "",
      translation: "",
    });

    const words = reactive([] as { word: string; translation: string }[]);

    const addWord = (word: string, translation: string) => {
      words.push({ word, translation });
    };

    const removeWord = (index: number) => {
      words.splice(index, 1);
    };

    const removeAllWords = () => {
      words.splice(0, words.length);
    };

    const saveWords = async () => {
      try {
        for (const word of words) {
          await addWordToDatabase(word); // Appeler la fonction pour ajouter chaque mot
        }
        alert("Words saved!");
      } catch (error) {
        console.error("Error saving words:", error);
      }
    };

    return {
      newWord,
      words,
      addWord,
      removeWord,
      removeAllWords,
      saveWords,
    };
  },
});
</script>
