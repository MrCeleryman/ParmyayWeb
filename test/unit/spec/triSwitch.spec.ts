import Vue from "vue";
import TriSwitch from "@/components/common/triSwitch";
import "chai";
import { Promise } from "es6-promise";

const assert = chai.assert;

// Based off of 200px by 200px
const core = {
	"x1": 0,
	"x2": 0,
	"y1": 0,
	"y2": 50,
	"rotation": 0
};

function assertRotations(
	localisations: any[],
	rotations: number[],
	visible: String[]): Promise<{}> {
	return new Promise(resolve => {
		["parma", "parmi", "parmy"].forEach((parm, i) => {
			assert.deepEqual(Object.assign({}, core, {
				text: parm,
				visibility: visible[i],
				rotation: rotations[i]
			}), localisations[i]);
		});
		resolve();
	});
}

function click(container) {
	const clickEv = document.createEvent("MouseEvents");
	clickEv.initEvent("click", true, true);
	container.dispatchEvent(clickEv);

	return new Promise(resolve => {
		Vue.nextTick(() => {
			resolve();
		});
	});
}

describe("triSwitch.vue", () => {
	beforeEach(() => {
		let main = document.getElementById("app");
		if (main) {
			main.parentElement.removeChild(main);
		}
		main = document.createElement("div");
		main.id = "app";
		document.body.appendChild(main);

		let mountPoint = document.createElement("div");
		mountPoint.id = "mountPoint";
		main.appendChild(mountPoint);
	});

	it("Correctly renders on load", done => {
		Vue.nextTick(() => {
			const mountPoint = document.getElementById("mountPoint");
			const app = document.getElementById("app");
			app.style.width = "200px";
			app.style.height = "200px";
			let vm = new TriSwitch().$mount(mountPoint);

			assert.equal(vm.changeIndex, 0);
			assertRotations(
				vm.localisations,
				[0, 180, 180],
				["visible", "hidden", "hidden"])
				.then(x => done())
				.catch(x => done(x));
		});
	});

	it("Correctly rotates on click", done => {
		Vue.nextTick(() => {
			const mountPoint = document.getElementById("mountPoint");
			const app = document.getElementById("app");
			app.style.width = "200px";
			app.style.height = "200px";
			let vm = new TriSwitch().$mount(mountPoint);

			click(vm.$el)
				.then(x => assertRotations(vm.localisations,
					[-180, 0, 180],
					["visible", "visible", "hidden"]))
				.then(x => done())
				.catch(x => done(x));
		});
	});

	it("Cycles back to start", done => {
		Vue.nextTick(() => {
			const mountPoint = document.getElementById("mountPoint");
			const app = document.getElementById("app");
			app.style.width = "200px";
			app.style.height = "200px";
			let vm = new TriSwitch().$mount(mountPoint);

			click(vm.$el)
				.then(x => assertRotations(vm.localisations,
					[-180, 0, 180],
					["visible", "visible", "hidden"]))
				.then(x => click(vm.$el))
				.then(x => assertRotations(vm.localisations,
					[-180, -180, 0],
					["visible", "visible", "visible"]))
				.then(x => click(vm.$el))
				.then(x => (
					new Promise(resolve => {
						assert.equal(0, vm.changeIndex);
						resolve();
					})
				))
				.then(x => assertRotations(vm.localisations,
					[-360, -180, -180],
					["visible", "visible", "visible"]))
				.then(x => done())
				.catch(x => done(x));
		});
	});
});
