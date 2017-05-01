<template>
<main>
<md-layout v-if="venue">
	<md-layout md-row md-flex="100">
		<h1>{{ venue.venueName }}</h1>
		<h2>This is a venue page</h2>
	</md-layout>
	<md-layout md-row md-flex="25" md-column>
		<form @submit.stop.prevent="submitReview">
			<h3>Review {{ venue.venueName }}</h3>
			<md-input-container>
				<label>Notes</label>
				<md-input placeholder="My nice placeholder" v-model="reviewModel.notes"></md-input>
			</md-input-container>
			<md-input-container>
				<label>Photo Of Parmy</label>
				<md-file v-model="reviewModel.image"></md-file>
			</md-input-container>
			<div>
				<label>Rating: </label>
				<rating max="5" v-model="reviewModel.rating" />
			</div>
			<md-button class="md-raised md-primary" type="submit">Submit</md-button>
		</form>
	</md-layout>
	<md-layout md-column md-flex="25" md-flex-offset="50">
		<h2>Recent Reviews</h2>
		<md-layout v-for="review in venue.reviews" :key="review.id" md-row md-flex="25" class="reviewColumnItem">
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

<md-snackbar :md-position="'bottom center'" ref="snackbar" :md-duration="200000">
	<span>Review Submitted</span>
	<md-button class="md-accent" @click.native="$refs.snackbar.close()">Close</md-button>
</md-snackbar>
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
	import { mdSnackbar } from "vue-material";
	import ReviewText from "components/reviewText";
	import Rating from "components/rating";
	import { LocalisedStrings } from "../util/localisedStrings";
	import { TempReviews } from "../util/tempReviews";
	import { Review, Venue } from "API";
	import { Request } from "../util/parmyayRequest";

	@Component({
		components: {
			"review-text": ReviewText,
			"rating": Rating
		}
	})
	export default class VenuePage extends Vue {
		venue: Venue = null;
		reviewModel = {
			image: null,
			notes: "",
			rating: -1
		};

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

		// Submit review to server
		submitReview(e: Event) {
			const review: Review = {
				id: null,
				userId: 1,
				user: null,
				venueId: this.venue.id,
				venue: this.venue,
				rating: this.reviewModel.rating,
				notes: this.reviewModel.notes,
				image: this.reviewModel.image,
				created: null,
				updated: null,
				deleted: null
			};
			Request.makeReview(review)
				.then(success => {
					(this.$refs["snackbar"] as any).open();
				})
				.catch(err => {
					// Handle error appropriately
					(this.$refs["snackbar"] as any).open();
				});
		}
	}
</script>
