<template>
	<div>
		{{ errorName }}
	</div>
</template>
<script lang="ts">
	import { Vue, Component, Lifecycle } from "av-ts";
	
	@Component()
	export default class ErrorPage extends Vue {
		errorName = "asdf";

		@Lifecycle
		created() {
			this.errorName = this.$route.params.errorCode;
		}
		beforeRouteUpdate(newID, oldID, next) {
			if (newID != oldID) {
				this.errorName = newID;
			}
			next();
		}
	}
</script>
