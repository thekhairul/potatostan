import { mount } from '@vue/test-utils';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import CountDown from '../CountDown.vue';

describe('CountDown.vue', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders correctly with initial time', () => {
    const wrapper = mount(CountDown, {
      props: {
        minutes: 1,
      },
    });
    expect(wrapper.text()).toContain('01:00');
  });

  it('counts down correctly', async () => {
    const wrapper = mount(CountDown, {
      props: {
        minutes: 1,
      },
    });

    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('00:59');

    vi.advanceTimersByTime(59000);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('00:00');
  });

  it('emits finish event when countdown ends', async () => {
    const wrapper = mount(CountDown, {
      props: {
        minutes: 1,
      },
    });

    vi.advanceTimersByTime(61000);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('finish')).toBeTruthy();
  });

  it('stops countdown on unmount', async () => {
    const wrapper = mount(CountDown, {
      props: {
        minutes: 1,
      },
    });

    wrapper.unmount();
    vi.advanceTimersByTime(1000);
    expect(wrapper.text()).toContain('01:00');
  });
});
