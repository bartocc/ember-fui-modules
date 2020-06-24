/* eslint-disable ember/no-jquery */
import $ from "jquery";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-search", function (hooks) {
  setupRenderingTest(hooks);

  test("search", async function (assert) {
    this.set("content", [
      { title: "Andorra" },
      { title: "United Arab Emirates" },
      { title: "Afghanistan" },
      { title: "Antigua" },
      { title: "Anguilla" },
      { title: "Albania" },
      { title: "Armenia" },
      { title: "Netherlands Antilles" },
      { title: "Angola" },
      { title: "Argentina" },
      { title: "American Samoa" },
      { title: "Austria" },
      { title: "Australia" },
      { title: "Aruba" },
      { title: "Aland Islands" },
      { title: "Azerbaijan" },
      { title: "Bosnia" },
      { title: "Barbados" },
      { title: "Bangladesh" },
      { title: "Belgium" },
      { title: "Burkina Faso" },
      { title: "Bulgaria" },
      { title: "Bahrain" },
      { title: "Burundi" },
      // etc
    ]);

    await render(hbs`
      <div class="ui search" {{fui-search source=this.content}}>
        <input class="prompt" type="text" placeholder="Common passwords...">
        <div class="results"></div>
      </div>
    `);

    /*
      TODO: find out why the instance is behing the key `searchModule`
      and not `module-search` like the other modules
    */
    assert.ok($(".ui.search").data("searchModule"));
  });
});
