import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import * as React from 'react';

import { AppState } from '../state';

export interface GitHubSettingsProps {
  appState: AppState;
}

/**
 * Settings content to manage GitHub-related preferences.
 *
 * @class GitHubSettings
 * @extends {React.Component<GitHubSettingsProps, {}>}
 */
@observer
export class GitHubSettings extends React.Component<GitHubSettingsProps, {}> {
  /**
   * Render the "logged out" settings experience.
   *
   * @returns {Array<JSX.Element>}
   */
  public renderNotSignedIn(): Array<JSX.Element> {
    const signIn = () => {
      this.props.appState.isTokenDialogShowing = true;
    };

    return [
      (
        <label key='signed-out-label'>
          We can publish your fiddles to GitHub as a Gist -
          that way you can share your fiddles with the world!
        </label>
      ),
      (
        <button className='button' key='sign-in-button' onClick={signIn}>
          <FontAwesomeIcon icon='sign-in-alt' /> Sign In
        </button>
      )
    ];
  }

  /**
   * Render the "logged in" settings experience.
   *
   * @returns {Array<JSX.Element>}
   */
  public renderSignedIn(): Array<JSX.Element> {
    const { gitHubLogin } = this.props.appState;
    const signOut = this.props.appState.signOutGitHub;

    return [
      (
        <label key='signed-in-label'>
          Using the personal access token you gave us, we
          logged you into GitHub as {gitHubLogin}.
        </label>
      ),
      (
        <button className='button' key='sign-out-button' onClick={signOut}>
          <FontAwesomeIcon icon='sign-out-alt' /> Remove Token & Sign Out
        </button>
      )
    ];
  }

  public render() {
    const { gitHubToken } = this.props.appState;

    const maybeSignedIn = !!gitHubToken
      ? this.renderSignedIn()
      : this.renderNotSignedIn();

    return (
      <div>
        <h4>GitHub</h4>
        {maybeSignedIn}
      </div>
    );
  }
}
