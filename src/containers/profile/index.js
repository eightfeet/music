import { h, Component } from 'preact';

import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classNames';
import { setRuntimeVariable } from '~/actions/user';
import Modal from '~/components/Modal';
import Request from '~/core/request';
import history from '~/core/history';

import Loading from '~/components/Loading';
import s from './cm';
import c1 from './scss.1';
import c2 from './scss.2';
import c3 from './scss.3';
import c4 from './scss.4';
import c5 from './scss.5';


class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			currentindex: 0,
			title: '',
			authora: '',
			authorb: '',
			times: 1000,
			isOpen: false,
			oldContent: null,
			scss: c5,
			selected: '5',
			start: false,
			startReady: 0,
			customReady: 6,
			audio: '1',
			prelude: false,
			hasPrelude: false
		};
		this.timer = null;
	}

	componentWillMount() {
		Loading.show();
		const { name } = this.props;
		Request.get(`/assets/servicer/${name}.json`).then(res => {
			if (process.env.NODE_ENV === 'development') {
				this.namageData(res.content);
			}

			this.setState({
				items: JSON.parse(JSON.stringify(res.content)),
				times: res.rhythm,
				title: res.title,
				authora: res.authora,
				authorb: res.authorb,
				oldContent: JSON.parse(JSON.stringify(res)),
				hasPrelude: res.hasPrelude
			}, () => {
				this.init();
				Loading.hide();
			});
		}).catch(()=>Loading.hide());
	}


	componentDidMount() {
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	namageData = (items) => {
		const data = JSON.parse(JSON.stringify(items));
		data.forEach((item, index) => {
			item.id = (index + 1).toString();
		});
		console.log(JSON.stringify(data));
	}

	init = () => {
		let operationData = JSON.parse(JSON.stringify(this.state.oldContent.content));


		if (this.state.prelude) {
			const tempArr = [];
			operationData.forEach(item => {
				if (item.prelude !== -1 && item.prelude !== 0 && item.prelude !== 1) {
					tempArr.push(item);
				}
			});
			operationData = tempArr;
		}

		this.setState({
			items: operationData,
			times: this.state.oldContent.rhythm,
			currentindex: 0
		});
	}

	handlePrelude = () => {
		this.setState({
			prelude: !this.state.prelude
		}, () => {
			this.init();
		});
	}

	// Model
	handleOpenModal = () => {
		clearInterval(this.timer);
		clearInterval(this.readTimer);
		this.setState({isOpen: true, start: false, startReady: 0});
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

	renderDivideRepeat = (dividerepeat) => {
		if (dividerepeat === -1) {
			return (<div className={this.state.scss.dividerepeatleft} >:<span /><span /></div>);
		}
		if (dividerepeat === 1) {
			return (<div className={this.state.scss.dividerepeatright} >:<span /><span /></div>);
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

	renderAcross = (across, gap) => {
		if (typeof across === 'string') {
			return (<div className={classNames(this.state.scss.across, gap ? this.state.scss.acrossgap : null)} ><span> {across} </span></div>);
		}
		if (across === -1 ) {
			return (<div className={classNames(this.state.scss.leftacross, gap ? this.state.scss.acrossgap : null)} />);
		}
		if (across === 0 ) {
			return (<div className={classNames(this.state.scss.across, gap ? this.state.scss.acrossgap : null)} />);
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

	renderFadeIn = (fadeIn) => {
		if (fadeIn) {
			return (<div className={this.state.scss.fadein} style={{width: `${fadeIn * 2.5}rem`}} ><span>渐强</span></div>);
		}
	}

	renderFadeOut = (fadeOut) => {
		if (fadeOut) {
			return (<div className={this.state.scss.fadeout} style={{width: `${fadeOut * 2.5}rem`}} ><span>渐弱</span></div>);
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

	renderFold = (fold) => {
		if (fold) {
			return (<div className={this.state.scss.fold} >又</div>);
		}
	}

	renderTr = (tr) => {
		if (tr) {
			return (<div className={this.state.scss.tr} >tr</div>);
		}
	}

	renderBeat = (beat) => {
		if (beat) {
			return (<div className={this.state.scss.beat} >扌</div>);
		}
	}

	renderLong = (long) => {
		if (long) {
			return (<div className={this.state.scss.long} >.</div>);
		}
	}

	renderPrelude = (prelude) => {
		if (prelude === -1) {
			return (<div className={this.state.scss.preludeleft} >{'('}</div>);
		}
		if (prelude === 1) {
			return (<div className={this.state.scss.preluderight} >{')'}</div>);
		}
	}

	resetTimer = () => {
		clearInterval(this.timer);
		let oprationTimes = this.state.times;
		const {currentindex, items} = this.state;
		if (currentindex === items.length - 1) {
			this.init();
			this.root.scrollTop = 0;
			this.setState({
				start: false,
				startReady: 0
			});
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
			this.root.scrollTop = this.item.childNodes[oprationInd].offsetTop - 100;

			this.setState(
				{items, currentindex: oprationInd +=1},
				() => {
					clearInterval(this.timer);
					this.resetTimer();
				}
			);
			if (this.state.audio === '2') {
				this.audio.play();
			}
		}, oprationTimes );
	}



	handleStart = () => {
		this.setState({
			start: true,
			startReady: this.state.customReady
		}, () => {

			this.readTimer = setInterval(() => {
				this.setState({startReady: this.state.startReady - 1});
				if (this.state.startReady < 0) {
					clearInterval(this.readTimer);
					this.resetTimer();
				}
			}, 1000);
		});
	}
	handleStop = () => {
		clearInterval(this.timer);
		clearInterval(this.readTimer);
		this.setState({
			start: false,
			startReady: 0
		});
	}

	handleReset = () => {
		this.root.scrollTop = 0;
		this.setState({
			start: false,
			startReady: 0,
			customReady: 6
		});
		this.init();
		clearInterval(this.readTimer);
		clearInterval(this.timer);
	}

	selectFontSize = (e) => {
		switch (e.target.value) {
			case '5':
				this.setState({scss: c5, selected: '5'});
				break;
			case '4':
				this.setState({scss: c4, selected: '4'});
				break;
			case '3':
				this.setState({scss: c3, selected: '3'});
				break;
			case '2':
				this.setState({scss: c2, selected: '2'});
				break;
			case '1':
				this.setState({scss: c1, selected: '1'});
				break;
			default:
				break;
		}
	}

	selectCustomReady = (e) => {
		switch (e.target.value) {
			case '6':
				this.setState({customReady: 6});
				break;
			case '5':
				this.setState({customReady: 5});
				break;
			case '4':
				this.setState({customReady: 4});
				break;
			case '3':
				this.setState({customReady: 3});
				break;
			case '2':
				this.setState({customReady: 2});
				break;
			case '1':
				this.setState({customReady: 1});
				break;
			case '0':
				this.setState({customReady: 0});
				break;
			default:
				break;
		}
	}

	setTime = (e) => {
		this.setState({times: parseInt(e.target.value, 0) });
	}

	selectAudio = (e) => {
		this.setState({audio: e.target.value});
	}

	goHome = () => {
		history.push('/');
	}

	render() {
		const { authora, authorb, title, start, startReady, hasPrelude, prelude } = this.state;
		return (
			<div className={this.state.scss.root} ref={(ref)=>{this.root = ref;}}>
				<div>
					<audio ref={(ref)=>{this.audio = ref;}} src="./assets/data/6596.mp3">您的浏览器不支持 audio 标签。</audio>
				</div>
				<div className={s.btn}>
					{
						!start ?
							<div className={s.menu} onClick={this.goHome}>
								<div /><div /><div />
							</div> :
							null
					}
					{
						start ?
							(
								<span>
									<button className="bg-orange white pd-5 mgr1" onClick={this.handleStop}>暂停</button>
									<button className="bg-green white pd-5 mgr1" onClick={this.handleReset}>重置</button>
								</span>
							) :
							<span>
								<button className="bg-green white pd-5 mgr1" onClick={this.handleStart}>开始</button>
								{
									hasPrelude ? <button className={`${prelude ? 'bg-green' : 'bg-orange'} white pd-5 mgr1`} onClick={this.handlePrelude}>
										{prelude ? '显示伴奏' : '隐藏伴奏'}
									</button> : null
								}
							</span>

					}
					<button className="bg-green white pd-5" onClick={this.handleOpenModal}>设置</button>
					{
						startReady > 0 ? <span className="blue font-biggest pdl2">{ startReady }</span> : ''
					}
				</div>
				<div className={this.state.scss.main}>
					<h1 className="al-c">{title}</h1>
					<div className="al-r">{authora}<br />{authorb}</div>
					<div ref={(ref)=>{this.item = ref;}}>
						{
							this.state.items.map((item, index) => (
								<div id={index} data-index={item.id} className={`${!item.partTitle ? this.state.scss.itemwrap : s.parttitle} ${item.gap ? this.state.scss.gap : ''}`}>
									{
										item.partTitle ?
											<div className={s.con} dangerouslySetInnerHTML={{__html:item.gamut}} /> :
											<div className={this.state.scss.item}>
												<div className={`${this.state.scss.gamut} ${item.selected ? s.selected : ''}`}>
													{item.gamut}
													{
														this.renderDivide(item.divide)
													}
													{
														this.renderDivideRepeat(item.dividerepeat)
													}
													{
														this.renderDelay(item.delay)
													}
												</div>
												{this.renderRest(item.rest)}
												{this.rendNot(item.not)}
												{this.renderDegree(item.degree)}
												{this.renderBy(item.by)}
												{this.renderAcross(item.across, item.gap)}
												{this.renderShake(item.shake)}
												{this.renderLong(item.long)}
												{this.renderPrelude(item.prelude)}
												{this.renderTr(item.tr)}
												{this.renderFold(item.fold)}
												{this.renderBeat(item.beat)}
												{this.renderFadeIn(item.fadeIn)}
												{this.renderFadeIn(item.fadeOut)}
											</div>
									}
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
								<select onChange={this.selectFontSize} value={this.state.selected} style={{width: '100%'}}>
									<option value="5" selected>5号</option>
									<option value="4">4号</option>
									<option value="3">3号</option>
									<option value="2">2号</option>
									<option value="1">1号</option>
								</select>
							</div>
							<div className="fl w3-5 al-r pdt-5">开启音符声:&nbsp;</div>
							<div className="fl w5 mgb1">
								<select onChange={this.selectAudio} value={this.state.audio} style={{width: '100%'}}>
									<option value="1" selected>否</option>
									<option value="2">是</option>
								</select>
							</div>
							<div className="fl w3-5 al-r pdt-5 mgb1">节拍(毫秒):&nbsp;</div>
							<div className="fl w5 mgb1"><input type="number" onChange={this.setTime} value={this.state.times} preload="毫秒" maxLength="4"/></div>

							<div className="fl w3-5 al-r pdt-5">准备时间:&nbsp;</div>
							<div className="fl w5 mgb1">
								<select onChange={this.selectCustomReady} value={this.state.customReady} style={{width: '100%'}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
