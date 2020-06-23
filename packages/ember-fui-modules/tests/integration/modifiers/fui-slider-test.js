/* eslint-disable ember/no-jquery */
import $ from "jquery";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-slider", function (hooks) {
  setupRenderingTest(hooks);

  test("slider", async function (assert) {
    await render(hbs`
      <div class="ui slider" id="slider-1" {{fui-slider}}></div>
      <div class="ui input">
        <input type="text" id="slider-input-1" disabled="">
      </div>
    `);

    assert.ok($(".ui.slider").data("module-slider"));
  });
});
