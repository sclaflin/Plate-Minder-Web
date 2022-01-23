import { html, css } from 'lit';
import { infoSquare, alert } from '../lib/images';
import ConfigItem from './ConfigItem';
import BooleanConfigOption from './BooleanConfigOption';
import API, { FileNotFoundError } from '../lib/API';
import { DEFAULT_FILTER_DEBUG } from '../lib/constants';

export default class Filter extends ConfigItem {
	static styles = [
		...ConfigItem.styles,
		css`
			.debug-image {
				width: 100%
			}
			.alert {
				border-radius: 0.25em;
				padding: 0.25em;
				color: yellow;
			}
			.alert .icon {
				float: left;
				margin: 0.25em;
			}
		`
	];
	#debugImage = null;
	#debugImageTimeout = null;
	#debugImageUrl = null;

	constructor(index, debug = DEFAULT_FILTER_DEBUG) {
		super(index);

		this.apiSaveMethod = API.addFilter;
		this.apiDeleteMethod = API.deleteFilter;
		this.addOption(
			new BooleanConfigOption(
				'Debug Image',
				'debug',
				debug,
				//wrap the API method so we can be notified when 
				//the debug option changes
				async (index, debug) => {
					await API.updateFilterDebug(index, debug);
					this.debugImage = debug;
				}
			)
		);

		this.debugImage = debug;
	}
	get debugImage() {
		return this.#debugImage;
	}
	set debugImage(v) {
		if(typeof v !== 'boolean')
			throw new TypeError('debugImage must be a boolean.');
		
		this.#debugImage = v;
		if(this.debugImageUrl) {
			URL.revokeObjectURL(this.debugImageUrl);
			this.#debugImageUrl = null;
		}
		if(this.#debugImageTimeout)
			clearTimeout(this.#debugImageTimeout);

		if(this.debugImage) {
			this.getDebugImage();
			this.status = html`
				<div class="alert">
					<span class="icon">${alert}</span> Leaving debug enabled can cause a significant amount of disk writes over time.  Please disable debug after the filter has been configured.
				</div>
			`;
		}
		else
			this.status = null;
		
		this.requestUpdate();
	}
	get debugImageUrl() {
		return this.#debugImageUrl;
	}
	set debugImageUrl(v) {
		if(typeof v !== 'string')
			throw new TypeError('debugImageUrl must be an instance of String.');
		this.#debugImageUrl = v;
		this.requestUpdate();
	}
	async getDebugImage() {
		const prior = this.debugImageUrl;
		try {
			this.debugImageUrl = await API.getFilterDebugImage(this.index);
			URL.revokeObjectURL(prior);
		}
		catch(err) {
			if(!(err instanceof FileNotFoundError))
				throw err;
		}
		this.#debugImageTimeout = setTimeout(async() => this.getDebugImage(), 250);
	}
	render() {
		return html`
			<fieldset class="content">
				<legend class="header">${this.constructor.name}</legend>
				<button class="warning delete" @click=${this.delete}>Delete</button>
				<button @click=${this.toggleInfo} class="infoToggle">
					${infoSquare}
				</button>
				<div class="info infoText">
					<div class="inner content2">${this.info}</div>
				</div>
				<div class="status">${this.status}</div>
				<div class="options" @saveOption=${this.saveOption}>
					${this.options}
				</div>
				${this.debugImage ? html`<img class="debug-image" .src=${this.debugImageUrl}/>`: null}
			</fieldset>
		`;
	}
	static fromObject(config) {
		if(config === null || typeof config !== 'object')
			throw new TypeError('config must be an Object.');
		return new this(
			config.index,
			config.debug
		);
	}
}
customElements.define('filter-element', Filter);
