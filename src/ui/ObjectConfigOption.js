import { html, css } from 'lit';
import ConfigOption from './ConfigOption';

export default class ObjectConfigOption extends ConfigOption {
	static name = 'ObjectConfigOption';
	static styles = [
		...ConfigOption.styles,
		css`
			.values {
				display: flex;
				flex-direction: column;
			}
			.values > * {
				margin-bottom: 0.25em;
			}
			.keyValue,
			.keyValueHeader,
			.keyValueNew {
				display: flex;
			}
			.keyValue .key,
			.keyValueHeader .key,
			.keyValueNew .key {
				margin-right: 0.5em;
				width: 10em;
			}
			.keyValue .value,
			.keyValueHeader .value,
			.keyValueNew .value {
				flex: 1;
			}
			.keyValueNew > button {
				margin-left: 0.5em;
			}
		`
	];
	save(e) {
		const value = [...e.target.parentNode.parentNode.getElementsByClassName('keyValue')]
			.map(div => {
				const [key, value] = [...div.getElementsByTagName('input')].map(input => input.value);
				return {
					key,
					value
				};
			})
			.filter(keyValue => keyValue.key !== '')
			.reduce(
				(obj, keyValue) => {
					obj[keyValue.key] = keyValue.value;
					return obj;
				},
				{}
			);
		
		const options = {
			detail: {
				configOption: this,
				value
			},
			bubbles: true,
			composed: true,
		};
		this.dispatchEvent(new CustomEvent('saveOption', options));
	}
	add(e) {
		const parentNode = e.target.parentNode;
		const value = [...parentNode.parentNode.getElementsByClassName('keyValue')]
			.map(div => {
				const [key, value] = [...div.getElementsByTagName('input')].map(input => input.value);
				return {
					key,
					value
				};
			})
			.filter(keyValue => keyValue.key !== '')
			.reduce(
				(obj, keyValue) => {
					obj[keyValue.key] = keyValue.value;
					return obj;
				},
				{}
			);
		
		const inputs = [...parentNode.getElementsByTagName('input')];
		const [key, _value] = inputs.map(input => input.value);
		for(const input of inputs)
			input.value = '';
		value[key] = _value;

		const options = {
			detail: {
				configOption: this,
				value
			},
			bubbles: true,
			composed: true,
		};
		this.dispatchEvent(new CustomEvent('saveOption', options));
	}
	render() {
		const value = Object.keys(this.value).map(key => {
			return html`
				<div class="keyValue" @change=${this.save}>
					<input class="key" .value=${key}/>
					<input class="value" .value=${this.value[key]}/>
				</div>
			`;		
		});

		return html`
			<div class="content">
				<label>${this.label}</label>
				<div class="values">
					<div class="keyValueHeader">
						<div class="key">Key</div>
						<div class="value">Value</div>
					</div>
					${value}
					<div class="keyValueNew">
						<input class="key"/>
						<input class="value"/>
						<button @click=${this.add}>Add</button>
					</div>
				</div>
			</div>
		`;
	}
}

customElements.define('object-config-option-element', ObjectConfigOption);
