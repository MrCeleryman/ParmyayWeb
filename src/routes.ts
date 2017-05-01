import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./main";
import FrontPage from "components/frontPage";
import TestPage from "components/testPage";
import VenuePage from "components/venuePage";

import ErrorPage from "components/errorPage";

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
		name: "venue",
		component: VenuePage
	}, {
		path: "/error/:errorCode",
		name: "error",
		component: ErrorPage
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
