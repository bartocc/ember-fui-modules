import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | fui-popup', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <FuiPopup data-test-fui-popup @html="<b>this is html</b>">
        hover me to see the popup
      </FuiPopup>
    `);

    assert.dom('[data-test-fui-popup]').hasText('hover me to see the popup');
  });
});
