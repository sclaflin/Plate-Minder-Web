import Recorder from './Recorder';
import ConfigOption from './ConfigOption';
import API from '../lib/API';
import { DEFAULT_RECORDER_PATTERN, DEFAULT_RECORDER_RETAIN_DAYS, FILE_RECORDER_ITEM_INFO } from '../lib/constants';

export default class FileRecorder extends Recorder {
	static name = 'FileRecorder';
	static apiType = 'file';
	
	constructor(index, pattern = DEFAULT_RECORDER_PATTERN, retainDays = DEFAULT_RECORDER_RETAIN_DAYS) {
		super(index);
		
		this.info = FILE_RECORDER_ITEM_INFO;
		this.addOption(
			new ConfigOption(
				'Pattern',
				'pattern',
				pattern,
				API.updateRecorderPattern
			),
			new ConfigOption(
				'Retain Days',
				'retainDays',
				retainDays,
				API.updateRecorderRetainDays
			)
		);
	}

	static fromObject(config) {
		if(config === null || typeof config !== 'object')
			throw new TypeError('config must be an Object.');
		return new this(
			config.index,
			config.pattern,
			config.retainDays
		);
	}
}
customElements.define('file-recorder-element', FileRecorder);
