import ConfigGroup from './ConfigGroup';
import RTSPSource from './RTSPSource';
import FileSource from './FileSource';
import { SOURCE_GROUP_INFO } from '../lib/constants';


export default class Sources extends ConfigGroup {
	constructor() {
		super();

		this.info = SOURCE_GROUP_INFO;
		
		this.addType(
			RTSPSource,
			FileSource
		);
	}
	addItem(...args) {
		super.addItem(...args);
		for(const source of args) {
			source.checkStatus();
		}
	}
}

customElements.define('sources-element', Sources);
