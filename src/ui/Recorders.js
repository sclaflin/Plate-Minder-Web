import ConfigGroup from './ConfigGroup';
import SQLiteRecorder from './SQLiteRecorder';
import MQTTRecorder from './MQTTRecorder';
import FileRecorder from './FileRecorder';
import { RECORDER_GROUP_INFO } from '../lib/constants';

export default class Recorders extends ConfigGroup {
	constructor() {
		super();

		this.info = RECORDER_GROUP_INFO;
		
		this.addType(
			SQLiteRecorder,
			MQTTRecorder,
			FileRecorder
		);
	}
}

customElements.define('recorders-element', Recorders);
