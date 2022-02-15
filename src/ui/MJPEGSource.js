import Source from './Source';
import ConfigOption from './ConfigOption';
import API from '../lib/API';
import { DEFAULT_MJPEG_SOURCE_URL, MJPEG_SOURCE_ITEM_INFO } from '../lib/constants';

export default class MJPEGSource extends Source {
	static apiType = 'mjpeg';
	
	constructor(index, name, captureInterval, preInputArgs, preOutputArgs, alwaysRestart, url = DEFAULT_MJPEG_SOURCE_URL) {
		super(index, name, captureInterval, preInputArgs, preOutputArgs, alwaysRestart);
		
		this.info = MJPEG_SOURCE_ITEM_INFO;
		this.addOption(
			new ConfigOption(
				'URL',
				'url',
				url,
				API.updateSourceUrl
			)
		);
	}

	static fromObject(config) {
		if(config === null || typeof config !== 'object')
			throw new TypeError('config must be an Object.');
		return new this(
			config.index,
			config.name,
			config.captureInterval,
			config.preInputArgs,
			config.preOutputArgs,
			config.alwaysRestart,
			config.url
		);
	}
}
customElements.define('mjpeg-source-element', MJPEGSource);
