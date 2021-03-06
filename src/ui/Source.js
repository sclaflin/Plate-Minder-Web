import { html, css } from 'lit';
import ConfigItem from './ConfigItem';
import ConfigOption from './ConfigOption';
import ArrayConfigOption from './ArrayConfigOption';
import API from '../lib/API';
import {
	DEFAULT_SOURCE_NAME,
	DEFAULT_SOURCE_CAPTURE_INTERVAL,
	DEFAULT_SOURCE_STATUS_INTERVAL,
	DEFAULT_SOURCE_PRE_INPUT_ARGS,
	DEFAULT_SOURCE_PRE_OUTPUT_ARGS,
	DEFAULT_SOURCE_ALWAYS_RESTART
} from '../lib/constants';
import Dialog from './Dialog';
import BooleanConfigOption from './BooleanConfigOption';

export default class Source extends ConfigItem {
	static styles = [
		ConfigItem.styles,
		css`
			.statusBar {
				text-align: right;
				margin: 0 0.5em 0.5em 0;
			}
			.warning {
				border-radius: 0.25em;
				padding: 0.25em;
			}
		`
	];
	#checkStatusTimeout = null;
	
	constructor(
		index,
		name = DEFAULT_SOURCE_NAME,
		captureInterval = DEFAULT_SOURCE_CAPTURE_INTERVAL,
		preInputArgs = DEFAULT_SOURCE_PRE_INPUT_ARGS,
		preOutputArgs = DEFAULT_SOURCE_PRE_OUTPUT_ARGS,
		alwaysRestart = DEFAULT_SOURCE_ALWAYS_RESTART
	) {
		super(index);

		this.apiSaveMethod = API.addSource;
		this.apiDeleteMethod = API.deleteSource;
		this.addOption(
			new ConfigOption(
				'Name',
				'name',
				name,
				API.updateSourceName
			),
			new ConfigOption(
				'Capture Interval',
				'captureInterval',
				captureInterval,
				API.updateSourceCaptureInterval
			),
			new ArrayConfigOption(
				'Pre-Input Args',
				'preInputArgs',
				preInputArgs,
				API.updateSourcePreInputArgs
			),
			new ArrayConfigOption(
				'Pre-Output Args',
				'preOutputArgs',
				preOutputArgs,
				API.updateSourcePreOutputArgs
			),
			new BooleanConfigOption(
				'Always Restart',
				'alwaysRestart',
				alwaysRestart,
				API.updateSourceAlwaysRestart
			)
		);
	}
	
	async start() {
		await API.updateSourceRun(this.index, true);
	}

	async stop() {
		await API.updateSourceRun(this.index, false);
	}

	async checkStatus() {
		try {
			const status = await API.getSourceStatus(this.index);
			const button = status.running ?
				html`<button @click=${this.stop}>Stop Source</button>`:
				html`<button @click=${this.start}>Start Source</button>`;
			const message = status.errText ?
				html`<p class="warning">${status.errText}`:
				null;
			this.status = html`
				<div class="statusBar">
					${button}
					${message}
				</div>
			`;
			
			if(this.#checkStatusTimeout)
				return;
			this.#checkStatusTimeout = setTimeout(() => {
				this.#checkStatusTimeout = null;
				this.checkStatus();
			}, DEFAULT_SOURCE_STATUS_INTERVAL);
		}
		catch(err) {
			Dialog.createError(err.message);
		}
	}

	static fromObject(config) {
		if(config === null || typeof config !== 'object')
			throw new TypeError('config must be an Object.');
		console.log(config);
		return new this(
			config.index,
			config.name,
			config.captureInterval,
			config.preInputArgs || [],
			config.preOutputArgs || [],
			config.alwaysRestart
		);
	}
}
customElements.define('source-element', Source);
