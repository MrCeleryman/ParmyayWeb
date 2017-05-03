<template>
	<div>
		{{ errorName }}
	</div>
</template>
<script lang="ts">
	import { Vue, Component, Prop, Lifecycle } from "av-ts";
	
	@Component()
	export default class ErrorPage extends Vue {
		@Prop
		propErrorCode;

		errorName = "";

		@Lifecycle
		created() {
			this.errorName = this.$route.params.errorCode || this.propErrorCode;
		}
		beforeRouteUpdate(newID, oldID, next) {
			if (newID != oldID) {
				this.errorName = newID;
			}
			next();
		}
	}
</script>
