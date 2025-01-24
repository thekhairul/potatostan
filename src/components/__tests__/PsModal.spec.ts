import Modal from '@/components/ui/PsModal.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';

interface GlobalConfig {
  global: {
    stubs: {
      teleport: boolean;
    };
  };
}

describe('PsModal.vue', () => {
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

  it('is visible when show prop is true', async () => {
    const wrapper = mount(Modal, {
      props: { show: true },
      ...globalConfig,
    });
    expect(wrapper.find('.ps-modal').exists()).toBe(true);
  });

  it('is not visible when show prop is false', async () => {
    const wrapper = mount(Modal, {
      props: { show: false },
      ...globalConfig,
    });
    expect(wrapper.find('.ps-modal').exists()).toBe(false);
  });

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(Modal, {
      props: { show: true },
      ...globalConfig,
    });
    await wrapper.find('button[aria-label="Close modal"]').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('emits close event when Escape key is pressed', async () => {
    const wrapper = mount(Modal, {
      props: { show: true },
      attachTo: document.body,
      ...globalConfig,
    });
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(wrapper.emitted()).toHaveProperty('close');
  });

  it('disables body scroll when modal is shown', async () => {
    const wrapper = mount(Modal, {
      props: { show: true },
      ...globalConfig,
    });
    await wrapper.vm.$nextTick(); // Ensure DOM updates
    expect(document.body.style.overflow).toBe('hidden');
    await wrapper.setProps({ show: false });
    await wrapper.vm.$nextTick(); // Ensure DOM updates
    expect(document.body.style.overflow).toBe('');
  });

  it('renders slot content when show is true', () => {
    const wrapper = mount(Modal, {
      props: { show: true },
      slots: {
        default: '<div class="modal-content">Modal Content</div>',
      },
      ...globalConfig,
    });
    expect(wrapper.find('.modal-content').exists()).toBe(true);
  });

  it('does not render slot content when show is false', () => {
    const wrapper = mount(Modal, {
      props: { show: false },
      slots: {
        default: '<div class="modal-content">Modal Content</div>',
      },
      ...globalConfig,
    });
    expect(wrapper.find('.modal-content').exists()).toBe(false);
  });
});
