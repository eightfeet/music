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
		const getData = `4/4  (   3561g |  3g--- )  | 5d_6d_(6d_5d_)(1_.7d__6d__7d__5d_) |  3d_5d_(6d_6d_{3d}5d.)(6d_ |  5d.)(6d_3d_.5d__6d_6d_ | {3d}5d---) |  6d_1_(1_6d_)(32_1_) |  6d_1_(2_2_{6d}1.)(2_ |
			1.)(2_6d_.1__2_2_ |  {6d}1---) |  ({(0:0,0.60,1}3_.{(0:0,0.60,1}5__)7d_)6d_)(6d_5d.) |  ({7d}6d_.1__5d_6d_)1- |  7d_(7d2_6d_.7d__5d) |  (6d_.{(0:0,0.60,1}1__7d_)6d_3d-) |  {(0:0,0.00,1}5d__3d__)(5d_6d_)({(0:0,0.60,1}3_.5__){(0:0,0.60,1}3_7d_))(6d_ |   6d--1) |  ({5d3d}3d_.5d__)(6d_6d_)({3d}5d.6d_ |
			5d.)(7d_6d_.7d__2_2_ |  {6d}1---) :|  $(True) `.split("");

		let counter = 0;
		getData.forEach(item => {
			if(true){
				counter++;
			}
		});

		console.log('2222', counter);

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
