<template>
	<div class="min-h-screen bg-gray-50">
		<router-view />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "App",
});
</script>
