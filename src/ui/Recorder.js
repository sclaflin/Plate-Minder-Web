import API from '../lib/API';
import ConfigItem from './ConfigItem';

export default class Recorder extends ConfigItem {
	constructor(index) {
		super(index);

		this.apiSaveMethod = API.addRecorder;
		this.apiDeleteMethod = API.deleteRecorder;
	}
}
customElements.define('recorder-element', Recorder);
