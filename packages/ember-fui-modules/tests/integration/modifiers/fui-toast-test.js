import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-toast", function (hooks) {
  setupRenderingTest(hooks);

  test("using the modifier on a div.ui.slider", async function (assert) {
    await render(hbs`<div {{fui-slider}} class="ui slider" ></div>`);
    assert.dom(".ui.slider .inner").exists("initializes the module");
  });
});
