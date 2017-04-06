<template>
	<svg :width="dimensions.width" :height="dimensions.height/2" 
		@click="changeOption">
		<g :transform="'translate(' 
			+ dimensions.width/2 + ', ' + dimensions.height/4 + ')'">
			<g class="indicator" 
				v-for="noun in localisations" 
				v-bind:style="{
					transform: 'rotate(' + noun.rotation + 'deg)', 
					visibility: noun.visibility
				}">
				<text :text="noun.text">{{ noun.text }}</text>
				<line :x1="noun.x1" :x2="noun.x2" 
					:y1="noun.y1" :y2="noun.y2"></line>
			</g>
		</g>
	</svg>
</template>
<style scoped>
	svg {
		cursor: pointer;
		user-select: none;
	}
	g.indicator {
		transform-origin: center bottom 0;
		transition: transform 500ms ease;
	}
	svg line {
		stroke: #fff;
		stroke-width: 2px;
	}
	svg text {
		text-anchor: middle;
		fill: #fff;
	}

</style>
<script lang="ts">
	import { Vue, Component, Lifecycle } from "av-ts";
	import {
		AllowedLocalisations,
		LocalisedStrings
	} from "../util/localisedStrings";
	import * as d3 from "d3";

	@Component
	export default class TriSwitch extends Vue {
		changeIndex = 0;
		localisations = [];

		dimensions = {
			width: 0,
			height: 0
		};

		private afterInitialise(noun) {
			noun.y1 = 0;
			noun.y2 = this.dimensions.height/2 - this.dimensions.height/4;
			noun.visibility = "visible";
		}

		private calculateRotation() {
			let rotateOut = this.localisations[this.changeIndex];
			this.afterInitialise(rotateOut);
			rotateOut.rotation -= 180;

			this.changeIndex = ((++this.changeIndex)
				% this.localisations.length);

			let newLocalisation = (this.localisations[this.changeIndex]
				.text as AllowedLocalisations);

			let rotateIn = this.localisations[this.changeIndex];
			this.afterInitialise(rotateIn);
			rotateIn.rotation -= 180;
			
			LocalisedStrings.setLocalisation(newLocalisation);
			this.$emit("changeOption", newLocalisation);
		}

		@Lifecycle
		created() {
			this.localisations = LocalisedStrings.getLocalisations()
				.map(x => {
					return {
						"x1": 0,
						"x2": 0,
						"y1": 0,
						"y2": 0,
						"rotation": 0,
						"visibility": "hidden",
						"text": x
					};
				});
			this.localisations[0].rotation = 0;
			this.localisations[0].visibility = "visible";
		}

		@Lifecycle
		mounted() {
			let dimensions = (this.$el.parentNode as HTMLElement)
				.getBoundingClientRect();
			this.dimensions.height = dimensions.height;
			this.dimensions.width = dimensions.height;
			this.localisations.forEach((x, i) => {
				i != 0 ? x.rotation = 180 : "";
				x.y2 = (dimensions.height/2 - (dimensions.height/4));
			});
		}
		changeOption(): void {
			this.calculateRotation();
		}
	}
</script>
