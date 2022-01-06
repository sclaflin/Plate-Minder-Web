import { LitElement, html, css } from 'lit-element';
import { baseStyle } from './styles';
import { infoSquare } from '../lib/images';
import ConfigItem from './ConfigItem';
import { DEFAULT_GROUP_INFO } from '../lib/constants';

export default class ConfigGroup extends LitElement {
	static name = 'ConfigGroup';
	static properties = {
		config: {},
		name: {},
		items: {}
	};
	static styles = [
		baseStyle,
		css`
			:host {
				display: block;
			}
			button {
				text-align: right;
			}
			fieldset {
				box-shadow: 0px 1px 3px black;
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
			div.infoText {
				height: 0;
				overflow: hidden;
			}
			div.info.expanded {
				height: auto;
			}
			.button-bar {
				display: flex;
				justify-content: flex-end;
			}
			.button-bar > * {
				margin: 0.25em;
			}
			legend {
				padding-left: 2.5em !important;
			}
		`
	];
	#config = null;
	#info = DEFAULT_GROUP_INFO;
	#items = [];
	#types = [];
	get selectedType() {
		return this.types[
			this.renderRoot?.querySelector('select')?.selectedIndex ?? -1
		];
	}
	get items() {
		return this.#items.slice(0);
	}
	get types() {
		return this.#types.slice(0);
	}
	get config() {
		return this.#config;
	}
	set config(v) {
		if(!Array.isArray(v))
			throw new TypeError('config must be an Array.');
		this.addItem(...v.map((source, index) => {
			const type = this.types.find(type => type.apiType === source.type);
			if(!type)
				throw new TypeError('unsupported type.');
			return type.fromObject({ ...source, index });
		}));
		this.requestUpdate();
	}
	get info() {
		return this.#info;
	}
	set info(v) {
		this.#info = v;
		this.requestUpdate();
	}
	toggleInfo() {
		this.shadowRoot.querySelector('div.infoText').classList.toggle('expanded');
	}
	addItem(...args) {
		for(const arg of args) {
			if(!(arg instanceof ConfigItem))
				throw new TypeError('all arguments must be an instance of ConfigItem.');
		}
		this.#items.push(...args);
		this.requestUpdate();
	}
	removeItem(...args) {
		for(const arg of args) {
			if(!(arg instanceof ConfigItem))
				throw new TypeError('all arguments must be an instance of ConfigItem.');
		}
		for(const configItem of args) {
			const index = this.#items.indexOf(configItem);
			this.#items.splice(index, 1);
		}
		this.requestUpdate();
	}
	addType(...args) {
		for(const arg of args) {
			if(!Object.prototype.isPrototypeOf.call(ConfigItem, arg))
				throw new TypeError('all arguments must be an extended ConfigItem class.');
		}
		this.#types.push(...args);
		this.requestUpdate();
	}
	async newItem() {
		const configItem = new this.selectedType(this.items.length);
		await configItem.apiSaveMethod(configItem);
		this.addItem(configItem);
	}
	async deleteItem(e) {
		const configItem = e.target;
		const index = this.items.indexOf(configItem);
		await e.target.apiDeleteMethod(index);
		this.removeItem(configItem);
	}
	render() {
		return html`
			<fieldset class="content2">
				<legend class="header">
					<button @click=${this.toggleInfo} class="infoToggle">
						${infoSquare}
					</button>
					${this.constructor.name}
				</legend>
				
				<div class="info infoText ${this.items.length > 0 ? null : 'expanded'}">
					<div class="inner content">${this.info}</div>
				</div>
				<div class="items" @deleteItem=${this.deleteItem}>
					${this.items}
				</div>
				<div class="button-bar">
					<select>
						${this.types.map(type => html`<option .value=${type.apiType}>${type.name}</option>`)}
					</select>
					<button @click=${this.newItem}>Add</button>
				</div>
			</fieldset>
		`;
	}
}

customElements.define('config-group-element', ConfigGroup);
