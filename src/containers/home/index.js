import { h, Component } from 'preact';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { setRuntimeVariable } from '~/actions/user';

import Loading from '~/components/Loading';
import { apiTest } from '~/servicer/index.js';
import less from './less';
import scss from './scss';
import css from './css';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			provinces: [],
			runtimeVariable: 'this is a runtimeVariable'
		};
	}

	componentWillMount() {
		Loading.show();
		apiTest().then((res) => {
			Loading.hide();
			this.setState({
				provinces: res || []
			});
		}).catch((error) => {
			Loading.hide();
			console.log(error);
		});
		this.props.setStore({
			name: 'setRuntimeVariable',
			value: this.state.runtimeVariable
		});
	}


	render() {
		console.log('test redux', this.props);
		return (
			<div class={less.home}>
				<h1 className={scss.title}>Home</h1>
				<p className={css.paragraph}>This is the Home component.
					<br /> Copyright &copy; By-Health Co Ltd. All rights reserved.
					<br /><br /> <a className={scss.link} href="/profile">profile</a>
				</p>
				<p className="pdt2">
					Redux-test setRuntimeVariable is<br />
					{this.props.setRuntimeVariable}
				</p>
				<div className="mgt2 formBox">
					<div> Development environment agent API to local </div>
					<div className="clearfix pdt2">
						{/* Development environment agent API to local */}
						<div className="fl pdt-5">
							API-test：
						</div>
						<div className="fl">
							<select>
								{
									this.state.provinces.map((item) => {
										return <option className="bg-green">{item.provinceName}</option>;
									})
								}
							</select>
						</div>
					</div>

				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
