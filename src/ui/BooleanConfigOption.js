import { html } from 'lit';
import ConfigOption from './ConfigOption';

export default class BooleanConfigOption extends ConfigOption {
	save(e) {
		const options = {
			detail: {
				configOption: this,
				target: e.target,
				value: e.target.value === 'true'
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
				<select class="content2" id="option" @change=${this.save} name=${this.name}>
					<option value="true" ?selected=${this.value}>True</option>
					<option value="false" ?selected=${!this.value}>False</option>
				</select>
			</div>
		`;
	}
}

customElements.define('boolean-config-option-element', BooleanConfigOption);
