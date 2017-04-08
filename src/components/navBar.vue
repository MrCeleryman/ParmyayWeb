<template>
<md-toolbar class="md-accent">
    <router-link :to="{ name: 'test'}" class="router-link">
        <md-button class="md-icon-button">
            <md-icon>favorite</md-icon>
        </md-button>
    </router-link>
    <h2 class="md-title">
        <router-link :to="{ name: 'main'}" class="router-link">
            <span class="md-title-link">Parmyay</span>
        </router-link>
    </h2>
  <tri-switch></tri-switch>
</md-toolbar>
</template>
<style scoped>
    .md-title {
        flex: 1;
    }
    .md-title a:hover {
        text-decoration: none !important;
    }
    .router-link {
        color: #fff !important;
    }
</style>
<script lang="ts">
    import { Vue, Component } from "av-ts";
    import TriSwitch from "./triSwitch";

    @Component({
        components: {
            "tri-switch": TriSwitch
        }
    })
    export default class NavBar extends Vue {
    }
</script>
