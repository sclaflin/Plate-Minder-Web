import { SQLITE_RECORDER_ITEM_INFO } from '../lib/constants';
import Recorder from './Recorder';

export default class SQLiteRecorder extends Recorder {
	static name = 'SQLiteRecorder';
	static apiType = 'sqlite';

	constructor(index) {
		super(index);

		this.info = SQLITE_RECORDER_ITEM_INFO;
	}
}
customElements.define('sqlite-recorder-element', SQLiteRecorder);
