import Dialog from './Dialog';

export default class ErrorDialog extends Dialog {
	static name = 'ErrorDialog';
	static fromObject(config) {
		if(config === null || typeof config !== 'object')
			throw new TypeError('config must be an Object.');
	}
}
