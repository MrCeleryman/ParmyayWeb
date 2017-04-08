<template>
    <span>{{ notes | truncate }}</span>
</template>
<script lang="ts">
	import { Vue, Component, Prop, Watch, Lifecycle } from "av-ts";
	import { LocalisedStrings } from "../util/localisedStrings";

	@Component
	export default class ReviewText extends Vue {
		@Prop review;
		notes = "";

		@Watch(this.review)
		handler(old, a) {
			console.log(old, a);
		}

		@Lifecycle
		mounted() {
			this.notes = this.review || LocalisedStrings.getCurrentLocalisation();

			LocalisedStrings.subscribe(this.langChanged);
			this.langChanged(LocalisedStrings.getCurrentLocalisation());
		}

		langChanged(newLang) {
			LocalisedStrings.getLocalisations().forEach(x => {
				this.notes = this.notes.replace(new RegExp(x, "gi"), newLang);
			});
		}
	}
</script>
