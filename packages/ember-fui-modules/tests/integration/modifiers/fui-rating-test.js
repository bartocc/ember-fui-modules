/* eslint-disable ember/no-jquery */
import $ from "jquery";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-rating", function (hooks) {
  setupRenderingTest(hooks);

  test("rating", async function (assert) {
    await render(hbs`
      <div class="ui rating" data-max-rating="1" {{fui-rating}}></div>
    `);

    assert.ok($(".ui.rating").data("module-rating"));
  });
});
