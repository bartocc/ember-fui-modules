/* eslint-disable ember/no-jquery */
import $ from "jquery";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-popup", function (hooks) {
  setupRenderingTest(hooks);

  test("popup", async function (assert) {
    await render(hbs`
      <div class="ui icon button" data-content="Add users to your feed" {{fui-popup}}>
        <i class="add icon"></i>
      </div>
    `);

    assert.ok($(".ui.button").data("module-popup"));
  });
});
