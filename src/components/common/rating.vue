<template>
	<div>
		<md-button v-for="i in +propMax" :key="i" class="md-icon-button" v-bind:class="{ 'md-primary': (i-1) <= selectedIndex, showCursor: !propDisabled }" @click.native="changeRating" ref="icons">
			<md-icon v-bind:class="{ 'md-primary': (i-1) <= selectedIndex }">star</md-icon>
		</md-button>
	</div>
</template>
<style scoped>
	.showCursor {
		cursor: default;
	}
</style>
<script lang="ts">
	import { Vue, Component, Prop, Lifecycle } from "av-ts";

	@Component()
	export default class Rating extends Vue {
		// Max number of starts
		@Prop propMax;
		@Prop propDisabled;
		@Prop propInit;

		// Current start selection
		selectedIndex = -1;

		@Lifecycle
		created() {
			if (this.propInit) {
				this.selectedIndex = +this.propInit-1;
			}
		}

		changeRating(e: Event) {
			if (!!this.propDisabled) return;

			// Check if the user clicked on child. If so, select the parent button
			let target = e.target as HTMLElement;
			if (target.tagName == "I") {
				target = target.parentElement;
			}

			const icons = this.$refs["icons"] as Array<Vue>;
			this.selectedIndex = icons.findIndex((x: Vue) => x.$el == target);
			this.$emit("input", this.selectedIndex);
		}
	}
</script>
