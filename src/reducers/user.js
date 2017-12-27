const defaultState = {
	selected: '5',
	audio: '1',
	customReady: 6
};
const reducer = (state = defaultState, action) => {
	const data = {};
	switch (action.type) {
		case 'SET_RUNTIME_VARIABLE':
			data[action.payload.name] = action.payload.value;
			return { ...state, ...data };
		default:
			return state;
	}
};

export default reducer;
