/* eslint-disable ember/no-jquery */
import $ from "jquery";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-checkbox", function (hooks) {
  setupRenderingTest(hooks);

  test("checkbox", async function (assert) {
    await render(hbs`
      <div class="ui checkbox" {{fui-checkbox}}>
        <input type="checkbox" name="example">
        <label>Make my profile visible</label>
      </div>
    `);

    assert.ok($(".ui.checkbox").data("module-checkbox"));
  });
});
