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
		const testdata = `4/4  =========   6_.6__6_5_3_2_3_5_ |  6_.6__6_5_66d_5d_ |  6d_ ========= 3_{(,0.60}{DunYin2}3_2__3__)(17d_6d_) |  0_1_({(0:0,0.60,1}7d__.{(0:0,0.60,1}1___){(0:0,0.60,1}7d__)6d__))(2_.3__)2 |  03_{DunYin2}3_(6_.7__5_6__7__ |  {(0:0,0.60,1}63__.)4___3__2__2-) |  0_{(0:0,0.00,1}3_(5_){(0:0,0.00,1}6d_)(1)7d_6d_) |
   0_{(0:0,0.00,1}1_(7d__.)1___7d__6d__)(2__3__{(0:0,0.00,1}6d_)1) |  0(5d__6d__){(0:0,0.00,1}7d__2__)(6d-   |       {7d17d}6d---) |  7d_.2__(7d_6d_)6d_(7d__6d__5d) |  0_(1__6d__)(1_2_)5({(0:0,0.60,1}{DunYin2}5_{(0:0,-0.38,1}3__)5__) |  63__.4___3__2__1_)1_7d_6d_ |  (2_.3__)20_5d_(5_2__3__) |  (1.2__3__1_7d__6d__5d) |
   0_3_{(,0.60}{DunYin2}3_2__3__)(17d_6d_) |  0_1_ ({(0:0,0.60,1}7d__.{(0:0,0.60,1}1___){(0:0,0.60,1}7d__)6d__)) (2_.3__)2 |  03_{DunYin2}3_(6_.7__5_6__7__ |  {(0:0,0.60,1}63__.)4___3__2__2-) |    0_{(0:0,0.00,1}3_(5_){(0:0,0.00,1}6d_)(1)7d_6d_) |    0_{(0:0,0.00,1}1_(7d__.)1___7d__6d__)(2__3__{(0:0,0.00,1}6d_)1) |    0(5d__6d__){(0:0,0.00,1}2__7d__)({2}6d- |  {7d17d}6d--)6d_1_ |
   2.{DunYin2}2_(3_.4__3_2_ |  {DunYin2}2_{(,0.60}1_1-))6d_1_ |  2.3_(2_.7d__2_3_) |  5.{DunYin2}5_0_5_3_5_ |  6_.1g__7_6_1g_({DunYin2}1g7_) |  6_({7}6_5)3_.1g__6_5_ |  6_13_2- |  5_5d7d_6d-
   | 3_(23_)(5_.3__5_6_) |
   ({YanYin}6--- |  6---) :|`;

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
