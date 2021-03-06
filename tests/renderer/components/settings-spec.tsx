import { shallow } from 'enzyme';
import * as React from 'react';

import { Settings } from '../../../src/renderer/components/settings';

jest.mock('../../../src/renderer/components/settings-general', () => ({
  GeneralSettings: 'settings-general'
}));

jest.mock('../../../src/renderer/components/settings-electron', () => ({
  ElectronSettings: 'settings-electron'
}));

jest.mock('../../../src/renderer/components/settings-credits', () => ({
  CreditsSettings: 'settings-credits'
}));

describe('CreditsSettings component', () => {
  let store: any;

  beforeEach(() => {
    store = {
      isSettingsShowing: true
    };
  });

  it('renders null if settings not showing', () => {
    store.isSettingsShowing = false;

    const wrapper = shallow(
      <Settings appState={store} />
    );

    expect(wrapper.html()).toBe(null);
  });

  it('renders only the menu if page unknown', () => {
    const wrapper = shallow(
      <Settings appState={store} />
    );

    wrapper.setState({ section: 'blub' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Electron page by default', () => {
    const wrapper = shallow(
      <Settings appState={store} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders the General page after a click', () => {
    const wrapper = shallow(
      <Settings appState={store} />
    );

    wrapper.find('.General').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Electron page after a click', () => {
    const wrapper = shallow(
      <Settings appState={store} />
    );

    wrapper.find('.Electron').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Credits page after a click', () => {
    const wrapper = shallow(
      <Settings appState={store} />
    );

    wrapper.find('.Credits').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
