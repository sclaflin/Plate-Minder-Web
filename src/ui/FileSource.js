import Source from './Source';
import ConfigOption from './ConfigOption';
import API from '../lib/API';
import { DEFAULT_FILE_SOURCE_FILE, FILE_SOURCE_ITEM_INFO } from '../lib/constants';

export default class FileSource extends Source {
	static name = 'FileSource';
	static apiType = 'file';

	constructor(index, name, captureInterval, file = DEFAULT_FILE_SOURCE_FILE) {
		super(index, name, captureInterval);

		this.info = FILE_SOURCE_ITEM_INFO;
		this.addOption(
			new ConfigOption(
				'File',
				'file',
				file,
				API.updateSourceFile
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
			config.file
		);
	}
}
customElements.define('file-source-element', FileSource);
