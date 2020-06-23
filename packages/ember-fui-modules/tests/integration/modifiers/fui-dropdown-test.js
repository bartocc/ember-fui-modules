/* eslint-disable ember/no-jquery */
import $ from "jquery";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | fui-dropdown", function (hooks) {
  setupRenderingTest(hooks);

  test("dropdown", async function (assert) {
    await render(hbs`
      <div class="ui dropdown" {{fui-dropdown}}>
        <div class="text">File</div>
        <i class="dropdown icon"></i>
        <div class="menu">
          <div class="item">New</div>
          <div class="item">
            <span class="description">ctrl + o</span>
            Open...
          </div>
          <div class="item">
            <span class="description">ctrl + s</span>
            Save as...
          </div>
          <div class="item">
            <span class="description">ctrl + r</span>
            Rename
          </div>
          <div class="item">Make a copy</div>
          <div class="item">
            <i class="folder icon"></i>
            Move to folder
          </div>
          <div class="item">
            <i class="trash icon"></i>
            Move to trash
          </div>
          <div class="divider"></div>
          <div class="item">Download As...</div>
          <div class="item">
            <i class="dropdown icon"></i>
            Publish To Web
            <div class="menu">
              <div class="item">Google Docs</div>
              <div class="item">Google Drive</div>
              <div class="item">Dropbox</div>
              <div class="item">Adobe Creative Cloud</div>
              <div class="item">Private FTP</div>
              <div class="item">Another Service...</div>
            </div>
          </div>
          <div class="item">E-mail Collaborators</div>
        </div>
      </div>
    `);

    assert.ok($(".ui.dropdown").data("module-dropdown"));
  });
});
