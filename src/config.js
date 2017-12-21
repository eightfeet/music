console.log(process.env.NODE_ENV);

export const API_BASE = process.env.NODE_ENV === 'development' ? '' : '/music';

export default {
};
