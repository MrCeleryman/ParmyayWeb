import Vue from "vue";
import router from "./routes";
import VueMaterial from "vue-material";

import "material-design-icons/iconfont/material-icons.css";
import "vue-material/dist/vue-material.css";
import "babel-polyfill";

let appContainer = document.createElement("div");
appContainer.id = "main";
appContainer.innerHTML = "<router-view></router-view>";

document.body.appendChild(appContainer);
/* eslint-disable no-new */
Vue.use(VueMaterial);
Vue.filter("truncate", function (value) {
	let length = 40;

	if (value.length <= length) {
		return value;
	} else {
		return value.substring(0, length) + "...";
	}
});

new Vue({
	router,
	el: "#main"
});
