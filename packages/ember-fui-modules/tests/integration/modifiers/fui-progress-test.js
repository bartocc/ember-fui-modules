/* eslint-disable ember/no-jquery */
import $ from "jquery";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-progress", function (hooks) {
  setupRenderingTest(hooks);

  test("progress", async function (assert) {
    await render(hbs`
      <div class="ui progress" {{fui-progress}}>
        <div class="bar">
          <div class="progress"></div>
        </div>
        <div class="label">Uploading Files</div>
      </div>
    `);

    assert.ok($(".ui.progress").data("module-progress"));
  });
});
