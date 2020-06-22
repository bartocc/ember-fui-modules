import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-calendar", function (hooks) {
  setupRenderingTest(hooks);

  test("calendar", async function (assert) {
    await render(hbs`<div class="ui calendar" id="standard_calendar" {{fui-calendar}}>
    <div class="ui input left icon">
      <i class="calendar icon"></i>
      <input type="text" placeholder="Date/Time">
    </div>
  </div>`);

    assert.dom(".ui.popup.calendar").exists();
  });
});
