import Source from './Source';
import ConfigOption from './ConfigOption';
import API from '../lib/API';
import { DEFAULT_RTSP_SOURCE_URL, RTSP_SOURCE_ITEM_INFO } from '../lib/constants';

export default class RTSPSource extends Source {
	static name = 'RTSPSource';
	static apiType = 'rtsp';
	
	constructor(index, name, captureInterval, url = DEFAULT_RTSP_SOURCE_URL) {
		super(index, name, captureInterval);
		
		this.info = RTSP_SOURCE_ITEM_INFO;
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
			config.url
		);
	}
}
customElements.define('rtsp-source-element', RTSPSource);
