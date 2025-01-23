import Button from '@/components/ui/PsButton.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('PsButton.vue', () => {
  it('renders default button', () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain('bg-grayscale-700');
    expect(wrapper.classes()).toContain('text-grayscale-300');
  });

  it('renders primary button', () => {
    const wrapper = mount(Button, {
      props: { variant: 'primary' },
    });
    expect(wrapper.classes()).toContain('bg-primary');
    expect(wrapper.classes()).toContain('text-white');
  });

  it('renders secondary button', () => {
    const wrapper = mount(Button, {
      props: { variant: 'secondary' },
    });
    expect(wrapper.classes()).toContain('bg-secondary');
    expect(wrapper.classes()).toContain('text-white');
  });

  it('renders small button', () => {
    const wrapper = mount(Button, {
      props: { size: 'sm' },
    });
    expect(wrapper.classes()).toContain('px-3');
    expect(wrapper.classes()).toContain('py-2');
  });

  it('renders large button', () => {
    const wrapper = mount(Button, {
      props: { size: 'lg' },
    });
    expect(wrapper.classes()).toContain('px-9');
    expect(wrapper.classes()).toContain('py-4');
  });

  it('renders disabled button', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
    });
    expect(wrapper.classes()).toContain('opacity-50');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('renders loading button', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
    });
    expect(wrapper.classes()).toContain('cursor-wait');
    expect(wrapper.attributes('aria-busy')).toBe('true');
  });

  it('renders button with custom id', () => {
    const wrapper = mount(Button, {
      props: { id: 'custom-id' },
    });
    expect(wrapper.attributes('id')).toBe('custom-id');
  });

  it('renders button with custom type', () => {
    const wrapper = mount(Button, {
      props: { type: 'submit' },
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('emits click event', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
