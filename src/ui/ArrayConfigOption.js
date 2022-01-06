import { html, css } from 'lit';
import ConfigOption from './ConfigOption';

export default class ArrayConfigOption extends ConfigOption {
	static name = 'ConfigOption';
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
			.valueAdd {
				display: flex;
			}
			.valueAdd input {
				flex: 1;
			}
			.valueAdd button {
				margin-left: 0.5em;
			}
		`
	];
	save(e) {
		const inputs = [...e.target.parentNode.getElementsByClassName('value')]
			.map(input => input.value)
			.filter(v => v !== '');
		
		const options = {
			detail: {
				configOption: this,
				value: inputs
			},
			bubbles: true,
			composed: true,
		};
		this.dispatchEvent(new CustomEvent('saveOption', options));
	}
	add(e) {
		const input = e.target.parentNode.getElementsByTagName('input')[0];
		const value = input.value;
		if(value === '')
			return;
		input.value = '';
		
		const inputs = [...e.target.parentNode.parentNode.getElementsByClassName('value')]
			.map(input => input.value)
			.filter(v => v !== '');
		inputs.push(value);
		
		const options = {
			detail: {
				configOption: this,
				value: inputs
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
				<div class="values">
					${this.value.map(v => html`<input class="value" id="option" @change=${this.save} name=${this.name} .value=${v} />`)}
					<div class="valueAdd">
						<input/>
						<button @click=${this.add}>Add</button>
					</div>
				</div>

			</div>
		`;
	}
}

customElements.define('array-config-option-element', ArrayConfigOption);
