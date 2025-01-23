import Input from '@/components/ui/PsInput.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('PsInput.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Input);
    expect(wrapper.classes()).toContain('min-w-20');
    expect(wrapper.classes()).toContain('w-full');
    expect(wrapper.classes()).toContain('rounded-md');
    expect(wrapper.classes()).toContain('bg-white');
    expect(wrapper.classes()).toContain('text-black');
    expect(wrapper.classes()).toContain('border');
    expect(wrapper.classes()).toContain('border-grayscale-500');
  });

  it('applies size variant classes correctly', async () => {
    const wrapper = mount(Input, {
      props: { size: 'lg' },
    });
    expect(wrapper.classes()).toContain('px-5');
    expect(wrapper.classes()).toContain('py-4');
    expect(wrapper.classes()).toContain('text-lg');
  });

  it('applies invalid variant classes correctly', async () => {
    const wrapper = mount(Input, {
      props: { invalid: true },
    });
    expect(wrapper.classes()).toContain('border-error');
  });

  it('applies disabled variant classes correctly', async () => {
    const wrapper = mount(Input, {
      props: { disabled: true },
    });
    expect(wrapper.classes()).toContain('cursor-not-allowed');
    expect(wrapper.classes()).toContain('opacity-50');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('applies readonly variant classes correctly', async () => {
    const wrapper = mount(Input, {
      props: { readonly: true },
    });
    expect(wrapper.classes()).toContain('cursor-default');
    expect(wrapper.attributes('readonly')).toBeDefined();
  });

  it('binds placeholder attribute correctly', async () => {
    const placeholderText = 'Enter text';
    const wrapper = mount(Input, {
      props: { placeholder: placeholderText },
    });
    expect(wrapper.attributes('placeholder')).toBe(placeholderText);
  });

  it('binds v-model correctly', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: 'test' },
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('test');
    await input.setValue('new value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
    expect(emitted![0]).toEqual(['new value']);
  });

  it('emits focus event', async () => {
    const wrapper = mount(Input);
    const input = wrapper.find('input');
    await input.trigger('focus');
    expect(wrapper.emitted('focus')).toBeTruthy();
  });

  it('emits blur event', async () => {
    const wrapper = mount(Input);
    const input = wrapper.find('input');
    await input.trigger('blur');
    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('emits input event', async () => {
    const wrapper = mount(Input);
    const input = wrapper.find('input');
    await input.setValue('new value');
    expect(wrapper.emitted('input')).toBeTruthy();
  });

  it('renders with custom id', () => {
    const wrapper = mount(Input, {
      props: { id: 'custom-id' },
    });
    expect(wrapper.attributes('id')).toBe('custom-id');
  });

  it('renders with custom type', () => {
    const wrapper = mount(Input, {
      props: { type: 'password' },
    });
    expect(wrapper.attributes('type')).toBe('password');
  });
});
