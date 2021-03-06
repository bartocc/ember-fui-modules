/* eslint-disable ember/no-jquery */
// eslint-disable-next-line no-unused-vars
import { module, test, skip, only } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import jQuery from "jquery";

module("Integration | Modifier | fui-module", function (hooks) {
  setupRenderingTest(hooks);

  test("dropdown", async function (assert) {
    this.gender = "";

    this.setGender = (value, text) => {
      this.set("gender", text);
    };

    await render(hbs`
      <select {{fui-module "dropdown" onChange=this.setGender}} class="ui dropdown">
        <option value="">Gender</option>
        <option value="1">Male</option>
        <option value="0">Female</option>
      </select>

      <span>{{this.gender}}</span>
    `);

    await click("select");

    // This element is generated by FUI
    await click('[data-text="Female"]');

    assert.dom("span").hasText("Female");
  });

  test("modal", async function (assert) {
    this.showModal = (event) => {
      const buttonElement = event.target;
      const modalElement = buttonElement.parentElement.getElementsByClassName(
        "modal"
      )[0];
      jQuery(modalElement).modal("show");
    };

    await render(hbs`
      <div class="ui modal" {{fui-module "modal" detachable=false context=".ember-application"}}>
        <div class="header">Modal header</div>
        <div class="content">Modal content</div>
        <div class="actions">
          <div class="ui deny button">Deny button</div>
          <div class="ui approve button">Approve button</div>
        </div>
      </div>

      <button type="button" {{on "click" this.showModal}}>click me to show modal</button>
    `);

    await click("button");

    assert.dom(".ui.modal").isVisible();
  });

  test("popup", async function (assert) {
    await render(hbs`
      <button {{fui-module "popup" on="click" position="bottom left"}} type="button" class="ui button">click me to see the popup</button>
      <div class="ui popup">I am the popup content</div>
    `);

    await click("button");

    assert.dom(".ui.popup").isVisible();
  });

  test("slider", async function (assert) {
    await render(hbs`<div {{fui-module "slider"}} class="ui slider" ></div>`);
    assert.dom(".ui.slider .inner").exists();
  });
});
