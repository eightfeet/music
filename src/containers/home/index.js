import { h, Component } from 'preact';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import Modal from '~/components/Modal';
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
			searchval: '',
			isOpen: false,
			selected: null,
			audio: null,
			customReady: null,
			fontSize: '1'
		};
	}


	componentWillMount() {
		this.getCatalog();
		this.initConfig();
	}

	initConfig = () => {
		const {selected, audio, customReady} = this.props;
		this.setState({selected, audio, customReady});
	}

	componentDidMount() {
		const testdata = `(  2'_2'3'_1'_.2'__6_1'_ | 5'_6'_3'__5'__3'__2'__1'- )  |  (2'_1'_)2'_.3'__{5g3g}2'.3'_ | (6_1'_)(2'_3'_){1g6}5- | 2'_.3'__(5'_3'_)(2'_3'_)(1'__2'__6_) | (3_5_)(6_1'_){6}5- |  1'_1'3_2'_2'6_ | (3'_5'_)(1'_2'_){5g}3'- | 2'_2'3'_(1'_.2'__)(6_1'_) | (5'_.6'__)(3'__5'__3'__2'__)1'- |]`;

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

	// Model
	handleOpenModal = () => {
		this.setState({isOpen: true});
	}

	handleHideModal = () => {
		this.setState({isOpen: false});
	}

	selectFontSize = (e) => {
		this.props.setStore({name:'selected', value:e.target.value});
		switch (e.target.value) {
			case '5':
				this.setState({fontSize: 1, selected: '5'});
				break;
			case '4':
				this.setState({fontSize: 1.2, selected: '4'});
				break;
			case '3':
				this.setState({fontSize: 1.4, selected: '3'});
				break;
			case '2':
				this.setState({fontSize: 1.6, selected: '2'});
				break;
			case '1':
				this.setState({fontSize: 1.8, selected: '1'});
				break;
			default:
				break;
		}
	}

	selectAudio = (e) => {
		this.setState({audio: e.target.value});
		this.props.setStore({name:'audio', value:e.target.value});
	}

	selectCustomReady = (e) => {
		this.props.setStore({name:'customReady', value:parseInt(e.target.value, 0)});
		this.setState({customReady: parseInt(e.target.value, 0)});
	}

	render() {
		const { list } = this.state;
		return (
			<div>
				<div className={`clearfix formBox ${s.searchbar}`}>
					<div className="clearfix">
						<div className="w7 fl">
							<input placeholder="搜索" className="w9 font" value={this.state.searchval} onInput={this.search} type="text"/>
						</div>
						<div className="w3 fl">
							<button
								className={`${s.button} font`}
								onClick={this.handleOpenModal}
							>全局设置</button>
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

				<Modal
					isOpen={this.state.isOpen}
					contentLabel="Modal"
					onRequestClose={this.handleHideModal}
				>
					<div className="pd1 al-c">
						<div className="formBox clearfix pdt1">
							<div className="fl w3-5 al-r pdt-5">字体大小:&nbsp;</div>
							<div className="fl w5 mgb1">
								<select style={{fontSize: `${this.state.fontSize}rem`, width: '100%'}} onChange={this.selectFontSize} className=" font" value={this.state.selected} >
									<option value="5" selected>5号简谱字体</option>
									<option value="4">4号简谱字体</option>
									<option value="3">3号简谱字体</option>
									<option value="2">2号简谱字体</option>
									<option value="1">1号简谱字体</option>
								</select>
							</div>
							<div className="fl w3-5 al-r pdt-5">开启音符声:&nbsp;</div>
							<div className="fl w5 mgb1">
								<select className="font" onChange={this.selectAudio} value={this.state.audio} style={{width: '100%'}}>
									<option value="1" selected>否</option>
									<option value="2">是</option>
								</select>
							</div>
							<div className="fl w3-5 al-r pdt-5">准备时间:&nbsp;</div>
							<div className="fl w5 mgb1">
								<select onChange={this.selectCustomReady} value={this.state.customReady} className=" font" style={{width: '100%'}}>
									<option value="6" selected>6秒</option>
									<option value="5">5秒</option>
									<option value="4">4秒</option>
									<option value="3">3秒</option>
									<option value="2">2秒</option>
									<option value="1">1秒</option>
									<option value="0">0秒</option>
								</select>
							</div>

							<div className="al-c fl ww mgt2">
								<button className="bg-green font white pd-5" style={{width: '80%'}} onClick={this.handleHideModal}>确定</button>
							</div>
						</div>
						<br />
					</div>
				</Modal>
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
