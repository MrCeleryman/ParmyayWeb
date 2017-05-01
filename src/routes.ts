import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./main";
import FrontPage from "components/frontPage";
import TestPage from "components/testPage";
import VenuePage from "components/venuePage";

Vue.use(VueRouter);

const routes = [{
	path: "/",
	component: Main,
	children: [{
		path: "",
		name: "main",
		component: FrontPage
	}, {
		path: "/venue/:id",
		component: VenuePage
	}, {
		path: "test",
		name: "test",
		component: TestPage
	}]
}];

export default new VueRouter({
	mode: "history",
	routes
});
