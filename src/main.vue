<template>
	<div>
		<nav-bar></nav-bar>
		<router-view></router-view>
  </div>
</template>
<style>
</style>
<script lang="ts">
	import { Vue, Component } from "av-ts";
	import NavBar from "components/common/navBar";
	import FrontPage from "components/main/frontPage";

	@Component({
		components: {
			NavBar,
			FrontPage
		}
	})
	export default class Main extends Vue {
	}
</script>
