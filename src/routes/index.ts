import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../main";
import FrontPage from "@/components/pages/frontPage";
import VenuePage from "@/components/pages/venuePage";
import ErrorPage from "@/components/pages/errorPage";

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
	}]
}];

export default new VueRouter({
	mode: "history",
	routes
});
