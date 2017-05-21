<template>
<main>
<h1>Recent <review-text></review-text> reviews</h1>
<parmy-list :propData="recentParmies" />

<h1><review-text></review-text> that is good for you</h1>
<parmy-list :propData="bestRated" showRating="true" />
<h1><review-text></review-text> that is near you</h1>
<parmy-list :propData="bestRated" />
</md-layout>
</main>
</template>
<style scoped>

</style>
	<script lang="ts">
	import { Vue, Component, Watch } from "av-ts";
	import ReviewText from "../common/reviewText";
	import ParmyList from "@/components/common/parmyList";
	import { LocalisedStrings } from "../../util/localisedStrings";
	import { TempReviews } from "../../util/tempReviews";
	import { Review } from "API";

	@Component({
		components: {
			"review-text": ReviewText,
			"parmy-list": ParmyList
		}
	})
	export default class FrontPage extends Vue {
		localisations = LocalisedStrings.currentLocalisation;
		recentParmies: Review[] = TempReviews.getTempReviews();

		// Pretend bestRated is the best rated
		bestRated: Review[] = TempReviews.getTempReviews().map(x => {
			x.rating = 5;
			return x;
		});
	}
</script>
