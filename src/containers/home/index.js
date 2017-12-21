import { h, Component } from 'preact';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { setRuntimeVariable } from '~/actions/user';
import history from '~/core/history';
import Request from '~/core/request';
import s from './scss';
import Loading from '~/components/Loading';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			oldList: [],
			searchval: ''
		};
	}


	componentWillMount() {
		this.getCatalog();
	}

	getCatalog = () => {
		Loading.show();
		Request.get('/assets/servicer/catalog.json').then(res => {
			this.setState({
				list: JSON.parse(JSON.stringify(res)),
				oldList: JSON.parse(JSON.stringify(res))
			}, ()=> Loading.hide());
		}).catch(()=>Loading.hide());
	}

	handleItem = (item) => () => {
		history.push(`/profile/${item}`);
	}

	search = (e) => {
		this.handleSearch(e.target.value);
		this.setState({
			searchval: e.target.value
		});
	}

	handleSearch = (value) => {
		const {oldList} = this.state;
		const temp = [];
		oldList.forEach(item => {
			if (item.title.indexOf(value) !== -1 ) {
				temp.push(item);
			}
		});
		this.setState({
			list: temp
		});
	}

	render() {
		const { list } = this.state;
		return (
			<div>
				<div className={`clearfix formBox ${s.searchbar}`}>
					<div>
						<div className="ww">
							<input placeholder="搜索" className="w9" value={this.state.searchval} onInput={this.search} type="text"/>
						</div>
					</div>
				</div>
				<div className={s.root} ref={(ref)=>{this.root = ref;}}>
					<div className={s.main}>
						<div className="w9-5 center pdt4 clearfix" >
							{
								list.map(item => <div onClick={this.handleItem(item.name)} className={s.list}>
									{item.title}
								</div>)
							}
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
