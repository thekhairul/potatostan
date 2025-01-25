import StartSortingBtn from '@/components/StartSortingBtn.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';

interface GlobalConfig {
  global: {
    stubs: {
      teleport: boolean;
    };
  };
}

describe('StartSortingBtn', () => {
  let globalConfig: GlobalConfig;

  beforeEach(() => {
    globalConfig = {
      global: {
        stubs: {
          teleport: true,
        },
      },
    };
  });

  it('should open modal when button is clicked', async () => {
    const wrapper = mount(StartSortingBtn, { ...globalConfig });
    const button = wrapper.find('button');
    await button.trigger('click');
    const modal = wrapper.findComponent({ name: 'ps-modal' });
    expect(modal.exists()).toBe(true);
  });

  it('should validate input and emit event on valid input', async () => {
    const wrapper = mount(StartSortingBtn, { ...globalConfig });
    const button = wrapper.find('button');
    await button.trigger('click');

    const modal = wrapper.findComponent({ name: 'ps-modal' });
    const input = modal.find('input');
    await input.setValue('50');
    await input.trigger('keypress.enter');

    expect(wrapper.emitted().start).toBeTruthy();
    expect(wrapper.emitted().start[0]).toEqual([50]);
  });

  it('should show error message on invalid input', async () => {
    const wrapper = mount(StartSortingBtn, { ...globalConfig });
    const button = wrapper.find('button');
    await button.trigger('click');
    const modal = wrapper.findComponent({ name: 'ps-modal' });
    const input = modal.find('input');
    await input.setValue('10');
    await input.trigger('keypress.enter');

    expect(modal.find('.text-error').exists()).toBe(true);
    expect(wrapper.emitted().start).toBeFalsy();
  });

  it('should close modal on cancel button click', async () => {
    const wrapper = mount(StartSortingBtn, { ...globalConfig });
    const button = wrapper.find('button');
    await button.trigger('click');
    const modal = wrapper.findComponent({ name: 'ps-modal' });

    const cancelButton = modal.find('[data-testid="cancel-btn"]');
    await cancelButton.trigger('click');
    expect(wrapper.find('.ps-modal').exists()).toBe(false);
  });
});
