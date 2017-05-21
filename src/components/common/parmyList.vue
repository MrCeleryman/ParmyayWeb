<template>
<md-layout :md-column="useColumn">
	<md-layout v-for="parmy in propData" :key="parmy">
		<md-card class="card" md-with-hover>
			<md-card-header>
				<div class="md-title"> 
					<rating v-if="showRating" propMax="5" :propInit="parmy.rating" propDisabled="true" />
					{{ parmy.venue.venueName }}
				</div>
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
</template>
<style>
	.card {
		margin: 8px;
	}
</style>
<script lang="ts">
import { Vue, Component, Lifecycle, Prop } from "av-ts";
import ReviewText from "@/components/common/reviewText";
import Rating from "@/components/common/rating";
import ErrorPage from "@/components/pages/errorPage";
import { LocalisedStrings } from "@/util/localisedStrings";
import { TempReviews } from "@/util/tempReviews";
import { Review, Venue } from "API";
import { Request } from "@/util/parmyayRequest";

@Component({
	components: {
		"review-text": ReviewText,
		"rating": Rating,
		"error-page": ErrorPage
	}
})
export default class ParmyList extends Vue {
	@Prop propData;
	@Prop useColumn;
	@Prop showRating;
}
</script>
