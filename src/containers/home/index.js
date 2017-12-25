import { h, Component } from 'preact';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { setRuntimeVariable } from '~/actions/user';
import history from '~/core/history';
import Request from '~/core/request';
import s from './scss';
import Loading from '~/components/Loading';

import { outPutElement, operationItem } from './helper';

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

	componentDidMount() {
		const testdata = `4/4
		5_3_5{5}6__3_.)0 |  (5_3_)5{5}6__3_.)0 |  6_({DunYin2}6__1g__6_)5_6_({DunYin2}6_1g) |  (1_.2__{35}3))2- |  3_({DunYin2}3__5__)3_6d_(17d_6d_) |  3_({DunYin2}3__5__)3_6d_(1_7d_6d) |  2_.{DunYin2}2__{DunYin2}2_3_56d |    (10_5_7d6d) |
		 5_.{DunYin2}5__3_5_(5d_6d_){7d2}7d) |  6d--- |  (1g-76) |  (1g-76) |  (5.6_)(7_.6__7_5_) |     6---    |  (1g-76) |  (1g-76) |  5-(6_.7__6_5_) |
				(6_7_3--) |  5_.{DunYin2}5__{DunYin2}5_6_5(4_3_) |  (4_5_2-)0 |  5_.{DunYin2}5__{DunYin2}5_6_5(4_3_) | (4_5_2-)5 |  1_.{DunYin2}1__{DunYin2}1_3_(2_3_)5d |  (6d_1_6d-)6d_1_ |  (2_1_2-)2_3_ |
		 (5_3_5--) |  6-(6d_1_6d) |  (1--- |  1)000 |]`;

		if (process.env.NODE_ENV === 'development') {
			operationItem(outPutElement(testdata));
		}
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
