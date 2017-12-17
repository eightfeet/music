import { h, Component } from 'preact';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { setRuntimeVariable } from '~/actions/user';
import history from '~/core/history';
import s from './scss';


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			searchval: ''
		};
	}


	componentWillMount() {
		const {data} = this.props;
		const temp = [];
		data.forEach(element => {
			temp.push({
				title: element.title,
				name: element.name
			});
		});
		this.setState({
			list: temp
		}, () => {
			console.log(1, this.state.list);
		});
		console.log(2, temp);
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
		const {data} = this.props;
		const temp = [];
		data.forEach(item => {
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
						<div className="w9-5 center pdt3"  style={{height: 3000}}>
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
