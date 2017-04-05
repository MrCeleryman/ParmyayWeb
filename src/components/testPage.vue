<template>
<main class="mdl-layout__content">
	<div class="page-content">
		<div class="main-text">
			<h1>Test Page</h1>
			<h2>This page is to test the routing</h2>
		</div>
	</div>
</main>
</template>
<style scoped>
    h1, h2 {
        color: green;
		text-align: center;
    }

	.main-text {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -40%);
	}
</style>
<script lang="ts">
	import { Vue, Component, Prop } from "av-ts";

	@Component
	export default class TestPage extends Vue {
		@Prop
		LANG;

		construct() {};
	}
</script>
