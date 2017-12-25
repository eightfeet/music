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
		const testdata = `4/4  (   ({5}6--6_){(3}5__3__2__) |  (3--- |  3-)6d_1_5_3_ |  {3}2--3__5__3__2__ |  {6}1--3__5__3__2__ |  7d25d_6d_7d__2__7d_ |  6d- ) 0_6_(5_6_) |
		1g_{(,0.60}{(0:0,0.80,1}{DunYin2}1g7_)6__.7___{(0:0,0.60,1}6__{(0:0,0.60,1}3__)5)) |   0_{(0:0,0.00,1}6_(3__.)5___3__2__)1- |  0_3_(2_3_){(0:0,0.00,1}5_.{(0:0,0.00,1}3__)(5) |  3__.5___3__2__)5d_{(3}{(0:0,0.60,1}7d__{(0:0,0.60,1}2__)7d__))6d- |  0_{(0:0,0.00,1}1_(7d_)6d_)(2_.3__)2 |  0_5_(3__.5___3__2__){2}3_6d_1) |  0_6_({DunYin2}6_3__5__)6_{(0:0,0.00,1}1g7_) |
		6({(0:0,0.60,1}7__.2g___){(0:0,0.15,1}7__6__)){6}5- |  0_{5}3_(2_3_)(5_.3__)5 |  (3__.5___3__2__) 5d_{(3}{(0:0,0.60,1}7d__{(0:0,0.60,1}2__)7d__)) 6d- :|  3-(5_.6__{2g}7_6_) |  ({5}6--- |  6---) |`;

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
