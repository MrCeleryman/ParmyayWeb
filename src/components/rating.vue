<template>
	<div>
		<md-button v-for="i in +max" :key="i" class="md-icon-button" @click.native="changeRating" ref="icons">
			<md-icon v-bind:class="{'md-primary': (i-1) <= selectedIndex}">star</md-icon>
		</md-button>
	</div>
</template>
<style scoped>
</style>
<script lang="ts">
	import { Vue, Component, Prop } from "av-ts";

	@Component()
	export default class Rating extends Vue {
		// Max number of starts
		@Prop max;
		// Current start selection
		selectedIndex = -1;

		changeRating(e: Event) {
			// Check if the user clicked on child. If so, select the parent button
			let target = e.target as HTMLElement;
			if (target.tagName == "I") {
				target = target.parentElement;
			}
			
			const icons = this.$refs["icons"] as Array<Vue>;
			this.selectedIndex = icons.findIndex((x: Vue) => x.$el == target);
		}
	}
</script>
