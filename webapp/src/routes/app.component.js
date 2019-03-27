import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider, FormattedMessage } from 'react-intl';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import { translationMessages, DEFAULT_LOCALE } from '../i18n';
import { GlobalStyle } from '../theme/global';
import { PWA_EVENT } from '../theme/media';
import messages from './app.messages';


export class App extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    children: PropTypes.node,
    match: PropTypes.object.isRequired,
    setLanguage: PropTypes.func.isRequired,
    startup: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.startup();
    this.props.setLanguage(this.getLanguage(this.props));
    runtime.register();
    window.addEventListener(PWA_EVENT, this.handlePwaEvent);
  }

  componentDidUpdate(prevProps) {
    if (this.getLanguage(prevProps) !== this.getLanguage(this.props)) {
      this.props.setLanguage(this.getLanguage(this.props));
    }
  }

  componentWillUnmount() {
    window.removeEventListener(PWA_EVENT, this.handlePwaEvent);
  }

  getLanguage = (props) => props.match.params.lang || DEFAULT_LOCALE;

  handlePwaEvent = (event) => {
    event.preventDefault();
    // Stash the event so it can be triggered later.
    callback(event);
  };

  render() {
    if (!this.props.language) {
      return null;
    }

    return (
      <IntlProvider
        locale={this.props.language}
        messages={translationMessages[this.props.language]}
      >
        <Fragment>

          <FormattedMessage {...messages.pageTitle}>
            {pageTitle => (
              <Helmet
                titleTemplate={`%s - ${pageTitle}`}
                defaultTitle={pageTitle}
              />
            )}
          </FormattedMessage>

          <GlobalStyle />
          {React.Children.only(this.props.children)}
        </Fragment>
      </IntlProvider>
    );
  }
}
