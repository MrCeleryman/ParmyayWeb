import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./main";
import FrontPage from "components/frontPage";
import TestPage from "components/testPage";

Vue.use(VueRouter);

const routes = [{
	path: "/",
	component: Main,
	children: [{
		path: "",
		name: "main",
		component: FrontPage
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
