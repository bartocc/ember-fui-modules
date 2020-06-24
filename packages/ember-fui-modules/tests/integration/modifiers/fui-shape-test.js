/* eslint-disable ember/no-jquery */
import $ from "jquery";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-shape", function (hooks) {
  setupRenderingTest(hooks);

  test("shape", async function (assert) {
    this.set("flipLeft", () => {
      $(".shape").shape("flip left");
    });

    await render(hbs`
      {{!-- template-lint-disable require-valid-alt-text  --}}
      {{!-- template-lint-disable link-href-attributes  --}}

      <div class="ui ignored icon direction buttons">
        <div class="ui button" role="button" {{on "click" this.flipLeft}} title="Flip Left"><i class="left long arrow icon"></i></div>
      </div>

      <div class="ui people shape" {{fui-shape}}>
        <div class="sides">
          <div class="side active">
            <div class="ui card">
              <div class="image">
                <img src="https://fomantic-ui.com/images/avatar/large/steve.jpg">
              </div>
              <div class="content">
                <div class="header">Steve Jobes</div>
                <div class="meta">
                  <a>Acquaintances</a>
                </div>
                <div class="description">
                  Steve Jobes is a fictional character designed to resemble someone familiar to readers.
                </div>
              </div>
              <div class="extra content">
                <span class="right floated">
                  Joined in 2014
                </span>
                <span>
                  <i class="user icon"></i>
                  151 Friends
                </span>
              </div>
            </div>
          </div>
          <div class="side">
            <div class="ui card">
              <div class="image">
                <img src="https://fomantic-ui.com/images/avatar/large/stevie.jpg">
              </div>
              <div class="content">
                <a class="header">Stevie Feliciano</a>
                <div class="meta">
                  <span class="date">Joined in 2014</span>
                </div>
                <div class="description">
                  Stevie Feliciano is a library scientist living in New York City. She likes to spend her time reading, running, and writing.
                </div>
              </div>
              <div class="extra content">
                <a>
                  <i class="user icon"></i>
                  22 Friends
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);

    assert.ok($(".ui.shape").data("module-shape"));
  });
});
