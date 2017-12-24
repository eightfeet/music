export function outPutElement(data) {
	let str = data;
	str = str.replace(/4\/4/g,'=============\n'); // 移除节拍
	str = str.replace(/4\/3/g,'=============\n'); // 移除节拍
	str = str.replace(/4\/2/g,'=============\n'); // 移除节拍

	str = str.replace(/\$\(True\)/g,''); // 移除节拍

	str = str.replace(/{\((.+?);}/g, '\n连'); // 替换连音符为连
	str = str.replace(/{[0-9]}/g, (res) => {
		return `<by: ${res.replace(/{/g,'').replace(/1/g,'一')
			.replace(/2/g,'二').replace(/3/g,'三').replace(/4/g,'四').replace(/5/g,'五').replace(/6/g,'六').replace(/7/g,'七')
			.replace(/}/g,'')}>`;
	});
	str = str.replace(/\s+/g,'\n');
	str = str.replace(/{YanYin}/g,'长'); //长音替换
	str = str.replace(/{.+?}/g,''); //删除其他{}内的东西
	str = str.replace(/\d/g,'\n$&'); //所有数字换行
	str = str.replace(/长\n/g,'长'); //所有数字换行
	str = str.replace(/连\n/g,'连'); //所有数字换行
	str = str.replace(/d/g,'低'); //所有数字换行
	str = str.replace(/g/g,'高'); //所有数字换行
	str = str.replace(/<by:\n/g,'\n<"by":');
	str = str.replace(/>\n/g,'>');
	str = str.replace(/\(\n/g,'\n('); //所有数字换行
	str = str.replace(/\n+/g,'\n'); //删除多行换行

	str = str.replace(/\(\(|\(\(\(/g,'(');
	str = str.replace(/\)\)|\)\)\)/g,')');
	str = str.replace(/\(/g,'连开'); //开始
	str = str.replace(/\)/g,'连束'); //结束
	str = str.replace(/\n/g,'¥'); //删除多行换行
	// str = str.split('¥');
	return str;
}


export function operationItem(data) {
	let str = data;

	str = str.replace(/---/g,'大');
	str = str.replace(/--/g,'中');
	str = str.replace(/-/g,'小');
	str = str.replace(/[0-9]/g,'{"gamut": $&},');
	str = str.replace(/低|高/g, (res) => {
		return `{"degree": ${res === '低' ? -1 : 1}},`;
	});
	str = str.replace(/</g,'{');
	str = str.replace(/>/g,'},');
	str = str.replace(/___\./g,'{"not": 32},{"delay": true},');
	str = str.replace(/__\./g,'{"not": 16},{"delay": true},');
	str = str.replace(/_\./g,'{"not": 8},{"delay": true},');
	str = str.replace(/\\./g,'{"delay": true},');
	str = str.replace(/___/g,'{"not": 32},');
	str = str.replace(/__/g,'{"not": 16},');
	str = str.replace(/_/g,'{"not": 8},');
	str = str.split('¥');
	let temp = [];
	str.forEach(element => {
		let item = element;
		if (element.indexOf('连开') !== -1 && element.indexOf('连束') !== -1) {
			item = element.replace('连开', '');
		}
		if (element.indexOf('大') !== -1) {
			item = element.replace('大', '') + '¥{"gamut":"—"},¥{"gamut":"—"},¥{"gamut":"—"},';
		}
		if (element.indexOf('中') !== -1) {
			item = element.replace('中', '') + '¥{"gamut":"—"},¥{"gamut":"—"},';
		}
		if (element.indexOf('小') !== -1) {
			item = element.replace('小', '') + '¥{"gamut":"—"},';
		}

		temp.push(item);
	});

	str = temp.join('¥');
	str = str.replace(/\./g,'{"delay":true},');
	str = str.replace(/连开/g,'{"across":-1},');
	str = str.replace(/连束/g,'{"across":1},');
	str = str.replace(/连/g,'{"across":0},');
	str = str.replace(/长/g,'{"long":true},');
	str = str.replace(/¥\|/g,'{"divide":true},');
	str = str.replace(/{|}/g,'');
	str = `[{${str.replace(/¥/g,'}\n{')}}]`;
	str = str.replace(/,}/g, '},');
	str = str.replace(/{=+}/g, '');
	// str = str.split('¥');
	str = str.replace(/一/g,1).replace(/二/g,2).replace(/三/g,3).replace(/四/g,4).replace(/五/g,5).replace(/六/g,6).replace(/七/g,7);
	console.log(str);


	return str;
}
