// eslint-disable-next-line no-unused-vars
import { module, test, only, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | fui-dropdown', function(hooks) {
  setupRenderingTest(hooks);

  test('Selection', async function(assert) {
    await render(hbs`
      <FuiDropdown class="selection" @onChange={{fn (mut this.gender)}}>
        <input type="hidden" name="gender">
        <i class="dropdown icon"></i>
        <div data-test-text class="default text">Gender</div>
        <div class="menu">
          <div class="item" data-test-male data-value="1">Male</div>
          <div class="item" data-test-female data-value="0">Female</div>
        </div>
      </FuiDropdown>

      <div data-test-gender>this.gender: {{this.gender}}</div>
    `);

    await click('[data-test-male]');
    assert.dom('[data-test-text]').hasText('Male');
    assert.dom('[data-test-gender]').hasText('this.gender: 1');

    await click('[data-test-female]');
    assert.dom('[data-test-text]').hasText('Female');
    assert.dom('[data-test-gender]').hasText('this.gender: 0');
  });
});
