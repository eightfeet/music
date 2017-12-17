import { h, Component } from 'preact';
import { Router } from 'preact-router';
import '~/style/global.common';
import history from '~/core/history';
import Home from '~/containers/home';
import Profile from '~/containers/profile';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { setRuntimeVariable } from '~/actions/user';
import data from '~/servicer/data';

class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */


	componentWillMount() {
		this.props.setStore({ name: 'data', value: data });
	}


	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Router onChange={this.handleRoute} history={history}>
					<Home path="/" />
					<Profile path="/profile/:name" />
				</Router>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({ setStore: setRuntimeVariable}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
