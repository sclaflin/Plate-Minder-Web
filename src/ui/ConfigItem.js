import {LitElement, html, css} from 'lit';
import { baseStyle } from './styles';
import ConfigOption from './ConfigOption';
import { infoSquare } from '../lib/images';
import Dialog from './Dialog';
import { DEFAULT_ITEM_INFO, NOOP } from '../lib/constants';

export default class ConfigItem extends LitElement {
	static apiType = '???';
	static properties = {
		type: {},
		options: {},
		status: {}
	};
	static styles = [
		baseStyle,
		css`
			:host {
				display: block;
			}
			.delete {
				position: absolute;
				top: 0.25em;
				right: 0.25em;
			}
			div.infoText {
				height: 0;
				overflow: hidden;
			}
			div.info.expanded {
				height: auto;
			}
			button.infoToggle {
				color: #fff;
				position: absolute;
				top: 0.25em;
				left: 0.25em;
				padding: 0;
				background: none;
			}
			button.infoToggle:focus {
				outline: none;
			}
			legend {
				padding-left: 2.5em !important;
			}
		`
	];
	#options = [];
	#index = null;
	#apiSaveMethod = null;
	#apiDeleteMethod = null;
	#status = null;
	#info = DEFAULT_ITEM_INFO;
	constructor(index) {
		super();

		this.index = index;
		this.apiSaveMethod = NOOP;
		this.apiDeleteMethod = NOOP;
	}
	get index() {
		return this.#index;
	}
	set index(v) {
		if(!Number.isInteger(v))
			throw new TypeError('index must be an integer.');
		this.#index = v;
	}
	get apiSaveMethod() {
		return this.#apiSaveMethod;
	}
	set apiSaveMethod(v) {
		if(typeof v !== 'function')
			throw new TypeError('apiSaveMethod must be a function.');
		this.#apiSaveMethod = v;
	}
	get apiDeleteMethod() {
		return this.#apiDeleteMethod;
	}
	set apiDeleteMethod(v) {
		if(typeof v !== 'function')
			throw new TypeError('apiDeleteMethod must be a function.');
		this.#apiDeleteMethod = v;
	}
	get options() {
		return this.#options.slice(0);
	}
	get status() {
		return this.#status;
	}
	set status(v) {
		// if(typeof v !== 'string')
		// 	throw new TypeError('status must be a string.');
		this.#status = v;
		this.requestUpdate();
	}
	get info() {
		return this.#info;
	}
	set info(v) {
		if(typeof v !== 'string')
			throw new TypeError('info must be a string.');
		this.#info = v;
		this.requestUpdate();
	}
	toggleInfo() {
		this.shadowRoot.querySelector('div.infoText').classList.toggle('expanded');
	}
	addOption(...args) {
		for(const arg of args) {
			if(!(arg instanceof ConfigOption))
				throw new TypeError('all arguments must be an instance of ConfigOption.');
		}
		this.#options.push(...args);
	}
	async saveOption(e) {
		const { target, value, configOption } = e.detail;
		try {
			await configOption.apiMethod(this.index, value);
			configOption.value = value;
		}
		catch(err) {
			target.value = configOption.value;
			const dlg = Dialog.createError(err.message);
			document.body.appendChild(dlg);
			return false;
		}
	}
	delete() {
		const options = {
			bubbles: true,
			composed: true,
		};
		this.dispatchEvent(new CustomEvent('deleteItem', options));
	}
	toJSON() {
		const options = this.options.reduce((obj, option) => {
			obj[option.name] = option.value;
			return obj;
		}, {});
		return {
			type: this.constructor.apiType,
			...options
		};
	}
	render() {
		return html`
			<fieldset class="content">
				<legend class="header">${this.constructor.name}</legend>
				<button class="warning delete" @click=${this.delete}>Delete</button>
				<button @click=${this.toggleInfo} class="infoToggle">
					${infoSquare}
				</button>
				<div class="info infoText ${this.options.length > 0 ? null : 'expanded'}">
					<div class="inner content2">${this.info}</div>
				</div>
				<div class="status">${this.status}</div>
				<div class="options" @saveOption=${this.saveOption}>
					${this.options}
				</div>
			</fieldset>
		`;
	}
	static fromObject(config) {
		if(config === null || typeof config !== 'object')
			throw new TypeError('config must be an Object.');
		return new this(
			config.index
		);
	}
}
customElements.define('config-item-element', ConfigItem);
