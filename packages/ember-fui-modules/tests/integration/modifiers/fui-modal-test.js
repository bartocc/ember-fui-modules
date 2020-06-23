/* eslint-disable ember/no-jquery */
import $ from "jquery";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-modal", function (hooks) {
  setupRenderingTest(hooks);

  test("modal", async function (assert) {
    this.set("showModal", () => {
      $(".ui.modal").modal("show");
    });

    await render(hbs`
      {{!-- template-lint-disable require-valid-alt-text  --}}
      {{!-- template-lint-disable link-rel-noopener  --}}
      <button type="button" {{on "click" this.showModal}}>Show modal</button>

      <div class="ui modal" {{fui-modal context=".ember-application"}}>
        <i class="close icon"></i>
        <div class="header">
          Profile Picture
        </div>
        <div class="image content">
          <div class="ui medium image">
            <img src="https://fomantic-ui.com/images/avatar2/large/rachel.png">
          </div>
          <div class="description">
            <div class="ui header">We've auto-chosen a profile image for you.</div>
            <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </div>
        </div>
        <div class="actions">
          <div class="ui black deny button">
            Nope
          </div>
          <div class="ui positive right labeled icon button">
            Yep, that's me
            <i class="checkmark icon"></i>
          </div>
        </div>
      </div>
    `);

    assert.ok($(".ui.modal").data("module-modal"));
  });
});
