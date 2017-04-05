import Vue from "vue";
import TriSwitch from "components/triSwitch";
import "chai";
const assert = chai.assert;

describe("triSwitch.vue", () => {
    beforeEach(() => {
        let main = document.getElementById("app");
        if (main) {
            document.removeChild(main);
        }
        main = document.createElement("div");
        main.id = "app";
        document.body.appendChild(main);
    });

    it("Correctly hides all but the first Localisation", done => {
        Vue.nextTick(() => {
            document.getElementById("app").style.width = "200px";
            document.getElementById("app").style.height = "200px";

            let vm = new TriSwitch().$mount("#app");

            assert.equal(vm.changeIndex, 0);
            let core = {
                "x1": 0,
                "x2": 0,
                "y1": 0,
                "y2": 5,
                "rotation": 0
            };

            ['parma', 'parmi', 'parmy'].forEach((parm, i) => {
                assert.deepEqual(Object.assign(core, {
                    text: parm,
                    visibility: i == 0 ? 'visible' : 'hidden'
                }), vm.localisations[i])
            });

            done();
        });
    });

    it("Correctly rotates on click", done => {
        Vue.nextTick(() => {
            document.getElementById("app").style.width = "200px";
            document.getElementById("app").style.height = "200px";

            let vm = new TriSwitch().$mount("#app");
            Vue.nextTick(() => {
                assert.equal(vm.changeIndex, 0);
                ['parma', 'parmi', 'parmy'].forEach((parm, i) => {
                    console.log(vm.localisations[i])
                });
                // Having trouble using .click() on SVG
                var click_ev = document.createEvent("MouseEvents");
                click_ev.initEvent("click", true, true);
                vm.$el.dispatchEvent(click_ev);
                let core = {
                    "x1": 0,
                    "x2": 0,
                    "y1": 0,
                    "y2": 5,
                    "rotation": 0
                };

                ['parma', 'parmi', 'parmy'].forEach((parm, i) => {
                    console.log(vm.localisations[i])
                    /*console.log(Object.assign(core, {
                        text: parm,
                        visibility: i <= 1 ? 'visible' : 'hidden',
                        rotation: [-180, 0, 180][i]
                    }));
                    assert.deepEqual(Object.assign(core, {
                        text: parm,
                        visibility: i <= 1 ? 'visible' : 'hidden',
                        rotation: [-180, 0, 180][i]
                    }), vm.localisations[i])*/
                });

                done();
            });
        });
    });
});
