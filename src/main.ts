import Vue from "vue";
import Router from "./routes";
import VueMaterial from "vue-material";
import VueGoogleMaps from "vue2-google-maps";

import "material-design-icons/iconfont/material-icons.css";
import "vue-material/dist/vue-material.css";
import "babel-polyfill";

Vue.use(VueMaterial);
Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyCbL-9rVtENi8vIr3R2_yo-UpQukOvamas"
	}
});

Vue.filter("truncate", value => {
	const maxLength = 40;
	return value.length <= length ? value : value.substring(0, length) + "...";
});

let appContainer = document.createElement("div");
appContainer.id = "main";
appContainer.innerHTML = "<router-view></router-view>";
document.body.appendChild(appContainer);
new Vue({
	router: Router,
	el: "#main"
});
