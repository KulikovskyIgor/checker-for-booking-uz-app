import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import MainSection from '../components/MainSection';
import { setRoute, fetchRoutesTrains } from '../store/actions/routes';
import { getValidRoutesUIData, getInvalidRoutes } from '../store/selectors/routes';
import style from './App.css';

@connect(
  state => ({
    validRoutes: getValidRoutesUIData(state),
    inalidRoutes: getInvalidRoutes(state),
  }),
  {
    setRoute,
    fetchRoutesTrains,
  }
)
export default class App extends Component {
  static propTypes = {
    validRoutes: PropTypes.array,
    inalidRoutes: PropTypes.array,
    setRoute: PropTypes.func,
    fetchRoutesTrains: PropTypes.func,
  };

  render() {
    const { validRoutes, inalidRoutes, setRoute, fetchRoutesTrains } = this.props;

		console.log("​App -> constructor -> props", this.props.validRoutes)
		console.log("​App -> constructor -> props inalidRoutes", this.props.inalidRoutes)

    return (
      <div className={style.normal}>
        <Header setRoute={(r) => {
          setRoute(r);
          fetchRoutesTrains();
        }} />
        <MainSection validRoutes={validRoutes} inalidRoutes={inalidRoutes} />
      </div>
    );
  }
}
