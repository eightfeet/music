import { h, Component } from 'preact';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { setRuntimeVariable } from '~/actions/user';
import Modal from '~/components/Modal';

import data from './gsy';

// import Loading from '~/components/Loading';
import c1 from './scss.1';
import c2 from './scss.2';
import c3 from './scss.3';
import c4 from './scss.4';
import c5 from './scss.5';



class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: JSON.parse(JSON.stringify(data.content)),
			currentindex: 0,
			times: data.rhythm,
			isOpen: false,
			scss: c5
		};
		this.timer = null;
	}

	componentWillMount() {

	}


	componentDidMount() {
		// data.content.forEach((item, index) => {
		// 	item.id = (index + 1).toString();
		// });

		// console.log(JSON.stringify(data.content));
	}

	init = () => {
		this.setState({
			items: JSON.parse(JSON.stringify(data.content)),
			currentindex: 0,
			times: 1000
		});
	}

	// Model
	handleOpenModal = () => {
		clearInterval(this.timer);
		this.setState({isOpen: true});
	}

	handleHideModal = () => {
		this.setState({isOpen: false});
	}

	rendNot = (not) => {
		if (not === 32) {
			return (<div className={this.state.scss.not}><div /><div /><div /></div>);
		}
		if (not === 16) {
			return (<div className={this.state.scss.not}><div /><div /></div>);
		}
		if (not === 8) {
			return (<div className={this.state.scss.not}><div /></div>);
		}
	}

	renderDivide = (divide) => {
		if (divide) {
			return (<div className={this.state.scss.divide} />);
		}
	}

	renderDegree = (degree) => {
		if (degree === 1) {
			return (<div className={this.state.scss.degreehight} />);
		}
		if (degree === -1) {
			return (<div className={this.state.scss.degreelow} />);
		}
	}

	renderBy = (by) => {
		if (by) {
			return (<div className={this.state.scss.by}>
				<div className={this.state.scss.bytag} >
					<div className={this.state.scss.subscript} />
				</div>
				{by}
			</div>);
		}
	}

	renderAcross = (across) => {
		if (across === -1 ) {
			return (<div className={this.state.scss.leftacross} />);
		}
		if (across === 0 ) {
			return (<div className={this.state.scss.across} />);
		}
		if (across === 1 ) {
			return (<div className={this.state.scss.rightacross} />);
		}
	}

	renderDelay = (delay) => {
		if (delay) {
			return (<div className={this.state.scss.delay} />);
		}
	}

	renderRest = (rest) => {
		if (rest) {
			return (<div className={this.state.scss.rest} >&or;</div>);
		}
	}

	renderShake = (shake) => {
		if (shake) {
			return (<div className={this.state.scss.shake} >&sim;</div>);
		}
	}

	resetTimer = () => {
		clearInterval(this.timer);
		let oprationTimes = this.state.times;
		const {currentindex, items} = this.state;
		if (currentindex === items.length - 1) {
			this.init();
			return;
		}
		let oprationInd = currentindex;
		items[oprationInd].selected = true;
		if (this.state.items[oprationInd].not === 8) {
			oprationTimes = oprationTimes / 2;
		}
		if (this.state.items[oprationInd].not === 16) {
			oprationTimes = oprationTimes / 4;
		}
		if (this.state.items[oprationInd].not === 32) {
			oprationTimes = oprationTimes / 8;
		}
		this.timer = setInterval(() => {
			this.root.scrollTop = this.item.childNodes[oprationInd].offsetTop - 70;
			this.setState(
				{items, currentindex: oprationInd +=1},
				() => {
					clearInterval(this.timer);
					this.resetTimer();
				}
			);
		}, oprationTimes );
	}

	handleStart = () => {
		this.resetTimer();
	}

	selectFontSize = (e) => {
		switch (e.target.value) {
			case '5':
				this.setState({scss: c5});
				break;
			case '4':
				this.setState({scss: c4});
				break;
			case '3':
				this.setState({scss: c3});
				break;
			case '2':
				this.setState({scss: c2});
				break;
			case '1':
				this.setState({scss: c1});
				break;
			default:
				break;
		}
	}

	setTime = (e) => {
		this.setState({times: parseInt(e.target.value, 0) });
	}

	render() {
		return (
			<div className={this.state.scss.root} ref={(ref)=>{this.root = ref;}}>
				<div className={this.state.scss.main}>
					<h1 className="al-c">{data.title}</h1>
					<button className="bg-green white pd-5 mgr1" onClick={this.handleStart}>开始</button>
					<button className="bg-green white pd-5" onClick={this.handleOpenModal}>设置</button>
					<div className="al-r">{data.authora}<br />{data.authorb}</div>
					<div ref={(ref)=>{this.item = ref;}}>
						{
							this.state.items.map((item, index) => (
								<div id={index} data-index={item.id} className={`${this.state.scss.itemwrap} ${item.gap ? this.state.scss.gap : ''}`}>
									<div className={this.state.scss.item}>
										<div className={`${this.state.scss.gamut} ${item.selected ? this.state.scss.selected : ''}`}>
											{item.gamut}
											{
												this.renderDivide(item.divide)
											}
											{
												this.renderDelay(item.delay)
											}
										</div>
										{this.renderRest(item.rest)}
										{this.rendNot(item.not)}
										{this.renderDegree(item.degree)}
										{this.renderBy(item.by)}
										{this.renderAcross(item.across)}
										{this.renderShake(item.shake)}
									</div>
								</div>
							))
						}
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
								<select onChange={this.selectFontSize} style={{width: '100%'}}>
									<option value="5" selected>5号</option>
									<option value="4">4号</option>
									<option value="3">3号</option>
									<option value="2">2号</option>
									<option value="1">1号</option>
								</select>
							</div>
							<div className="fl w3-5 al-r pdt-5">节拍(毫秒):&nbsp;</div>
							<div className="fl w5"><input type="number" onChange={this.setTime} value={this.state.times} preload="毫秒" maxLength="4"/></div>
							<div className="al-c fl ww mgt2">
								<button className="bg-green white pd-5" style={{width: '80%'}} onClick={this.handleHideModal}>确定</button>
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
