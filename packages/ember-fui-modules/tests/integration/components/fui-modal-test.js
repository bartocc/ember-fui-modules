import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import $ from 'jquery';

module('Integration | Component | fui-modal', function(hooks) {
  setupRenderingTest(hooks);

  test('basic modal', async function(assert) {
    this.showModal = function() {
      // eslint-disable-next-line ember/no-jquery
      $('.ui.modal').modal('show');
    }

    await render(hbs`
      <FuiModal data-test-modal class="basic" @context=".ember-application">
        <div class="ui icon header">
          <i class="archive icon"></i>
          Archive Old Messages
        </div>
        <div class="content">
          <p>
            Your inbox is getting full, would you like us to enable automatic
            archiving of old messages?
          </p>
        </div>
        <div class="actions">
          <div class="ui red basic cancel inverted button">
            <i class="remove icon"></i>
            No
          </div>
          <div class="ui green ok inverted button">
            <i class="checkmark icon"></i>
            Yes
          </div>
        </div>
      </FuiModal>

      <button data-test-show-modal type="button" {{on "click" this.showModal}}>
        click me to show modal
      </button>
    `);

    assert.dom('[data-test-modal]').isNotVisible('modal is not visible before "show"');
    await click('[data-test-show-modal]');
    assert.dom('[data-test-modal]').isVisible('modal is visible after "show"');
  });
});
