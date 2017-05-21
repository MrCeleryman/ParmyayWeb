<template>
<main>
<h1>Recent <review-text></review-text> reviews</h1>
<md-layout>
	<md-layout v-for="parmy in recentParmies" :key="parmy" md-flex="25">
		<md-card class="card" md-with-hover>
		<md-card-header>
			<div class="md-title"> {{ parmy.venue.venueName }} </div>
			<div class="md-subhead"><review-text :review="parmy.notes"></review-text></div>
		</md-card-header>
			<md-card-media>
				<img :src="parmy.image" :alt="parmy.venue.venueName">
				<md-ink-ripple></md-ink-ripple>
			</md-card-media>
			
			<md-card-actions>
				<md-button class="md-icon-button">
					<md-icon>favorite</md-icon>
				</md-button>
				<md-button class="md-icon-button">
					<md-icon>bookmark</md-icon>
				</md-button>
				<md-button class="md-icon-button">
					<md-icon>share</md-icon>
				</md-button>
			</md-card-actions>
		</md-card>
	</md-layout>
</md-layout>
</main>
</template>
<style scoped>
	.card {
		margin: 8px;
	}
</style>
	<script lang="ts">
	import { Vue, Component, Watch } from "av-ts";
	import ReviewText from "../common/reviewText";
	import { LocalisedStrings } from "../../util/localisedStrings";
	import { TempReviews } from "../../util/tempReviews";
	import { Review } from "API";

	@Component({
		components: {
			"review-text": ReviewText
		}
	})
	export default class FrontPage extends Vue {
		localisations = LocalisedStrings.currentLocalisation;
		recentParmies: Review[] = TempReviews.getTempReviews();
	}
</script>
