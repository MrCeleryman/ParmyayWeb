<template>
<main>
<md-layout v-if="venue">
	<md-layout md-row md-flex="100">
		<h1>{{ venue.venueName }}</h1>
		<h2>This is a venue page</h2>
	</md-layout>
	<md-layout md-row md-flex="25" md-column>
		<form @submit.stop.prevent="submit">
			<h3>Review {{ venue.venueName }}</h3>
			<md-input-container>
				<label>Notes</label>
				<md-input placeholder="My nice placeholder"></md-input>
			</md-input-container>
			<md-input-container>
				<label>Single</label>
				<md-file v-model="parmyPhoto"></md-file>
			</md-input-container>
			<rating max="5"/>
		</form>
	</md-layout>
	<md-layout md-column md-flex="25" md-flex-offset="50" md-gutter="8">
		<h2>Recent Reviews</h2>
		<md-layout v-for="review in venue.reviews" :key="review.id" md-row md-flex="25" class="reviewColumnItem" md-gutter>
			<md-card class="card" md-with-hover>
				<md-card-header>
					<div class="md-title">
						<review-text :review="review.notes" />
					</div>
					<div class="md-subhead">{{ review.user.userName }} </div>
				</md-card-header>
				<md-card-media>
					<img :src="review.image" :alt="venue.venueName">
					<md-ink-ripple></md-ink-ripple>
				</md-card-media>
				<md-card-actions>
					<md-button class="md-icon-button">
						<md-icon>bookmark</md-icon>
					</md-button>
				</md-card-actions>
			</md-card>
		</md-layout>
	</md-layout>
</md-layout>
</main>
</template>
<style scoped>
	.card {
		margin: 8px
	}
	.reviewColumnItem {
		flex: 1;
		display: flex;
		overflow: auto;
	}
</style>
	<script lang="ts">
	import { Vue, Component, Lifecycle } from "av-ts";
	import ReviewText from "components/reviewText";
	import Rating from "components/rating";
	import { LocalisedStrings } from "../util/localisedStrings";
	import { TempReviews } from "../util/tempReviews";
	import { Review, Venue } from "API";

	@Component({
		components: {
			"review-text": ReviewText,
			"rating": Rating
		}
	})
	export default class VenuePage extends Vue {
		venue: Venue = null;
		parmyPhoto = null;
		
		@Lifecycle
		created() {
			this.venue = this.updateCurrentVenue(+this.$route.params.id);
		}

		// Builtin for routing. Called whenever the ID changes
		beforeRouteUpdate(newID, oldID, next) {
			this.venue = this.updateCurrentVenue(+this.$route.params.id);
			next();
		}

		// Network request for venue matching ID
		private updateCurrentVenue(newID: number) {
			const foundVenue: Venue = TempReviews.getTempReviews()
				.find(v => v.venue.id == newID).venue;
			return foundVenue;
		}
	}
</script>
