import { css } from 'aphrodite/no-important';
import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalSpinner } from 'components/globalSpinner';
import { Warning } from 'components/warning';
import { requestUpdateLoginStatus } from 'store/features/auth/actions';
import { toggleWarning } from 'store/features/ui/actions';
import { StoreState } from 'store/types';
import pick from 'lodash/pick';
import { styles } from './app.styles';
import { Header } from './header';

interface Props {
  loginStatus: facebookSdk.LoginStatus;
  displayWarning: boolean;
}

function mapStateToProps(state: StoreState): Props {
  return pick(state, ['loginStatus', 'displayWarning']);
}

const actionCreators = {
  requestUpdateLoginStatus,
  toggleWarning,
};

type ActionCreators = typeof actionCreators;

class AppClass extends React.PureComponent<ActionCreators & Props, {}> {
  componentDidMount() {
    this.props.requestUpdateLoginStatus(undefined);
    this.props.toggleWarning(true);
  }
  render() {
    return (
      <div className={css(styles.mainApp)}>
        <GlobalSpinner />
        <Header />
        <Warning />
        <div className={css(styles.pageContent)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const App = connect(mapStateToProps, actionCreators)(AppClass);
