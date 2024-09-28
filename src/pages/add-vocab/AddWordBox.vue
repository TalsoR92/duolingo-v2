<template>
	<div class="w-full max-w-md p-4 bg-white rounded shadow-md text-center">
		<h3 class="text-xl font-semibold mb-4">Add a Word</h3>

		<div class="mb-4 text-left">
			<label for="word" class="block text-sm font-medium mb-1">Word</label>
			<input id="word" type="text" v-model="newWord.word" placeholder="Enter a word" class="w-full p-2 border border-gray-300 rounded" />
		</div>

		<div class="mb-4 text-left">
			<label for="translation" class="block text-sm font-medium mb-1">Translation</label>
			<input id="translation" type="text" v-model="newWord.translation" placeholder="Enter a translation" class="w-full p-2 border border-gray-300 rounded" />
		</div>

		<button class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg transition" @click="handleAddWord">Add</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
	name: "AddWordBox",
	props: {
		newWord: {
			type: Object,
			required: true,
		},
		addWord: {
			type: Function,
			required: true,
		},
	},
	setup(props) {
		const handleAddWord = () => {
			if (props.newWord.word.trim() && props.newWord.translation.trim()) {
				props.addWord(props.newWord.word, props.newWord.translation);
				props.newWord.word = "";
				props.newWord.translation = "";
			}
		};

		return {
			handleAddWord,
		};
	},
});
</script>
