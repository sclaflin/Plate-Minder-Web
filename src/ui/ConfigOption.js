import {LitElement, html, css} from 'lit';
import { baseStyle } from './styles';

const NOOP = () => {};

export default class ConfigOption extends LitElement {
	static properties = {
		label: {},
		name: {},
		value: {}
	};
	static styles = [
		baseStyle,
		css`
			:host {
				display: block;
			}
			.content {
				margin: 0.25em;
				display: flex;
			}
			.content > * {
				flex-grow: 1;
			}
			.content > label {
				display: inline-block;
				width: 8em;
				flex-grow: 0;
			}
		`
	];
	#label = null;
	#name = null;
	#value = null;
	#apiMethod = null;

	constructor(label, name, value, apiMethod) {
		super();

		this.label = label;
		this.name = name;
		this.value = value;
		this.apiMethod = apiMethod || NOOP;
	}
	get label() {
		return this.#label;
	}
	set label(v) {
		if(typeof v !== 'string')
			throw new TypeError('label must be a string.');
		this.#label = v;
	}
	get name() {
		return this.#name;
	}
	set name(v) {
		if(typeof v !== 'string')
			throw new TypeError('name must be a string.');
		this.#name = v;
	}
	get value() {
		return this.#value;
	}
	set value(v) {
		this.#value = v;
		this.requestUpdate();
	}
	get apiMethod() {
		return this.#apiMethod;
	}
	set apiMethod(v) {
		if(typeof v !== 'function')
			throw new TypeError('apiMethod must be a function.');
		this.#apiMethod = v;
	}
	save(e) {
		const options = {
			detail: {
				configOption: this,
				target: e.target,
				value: e.target.value
			},
			bubbles: true,
			composed: true,
		};
		this.dispatchEvent(new CustomEvent('saveOption', options));
	}
	render() {
		return html`
			<div class="content">
				<label for="option">${this.label}</label>
				<input id="option" @change=${this.save} name=${this.name} .value=${this.value} />
			</div>
		`;
	}
}

customElements.define('config-option-element', ConfigOption);
