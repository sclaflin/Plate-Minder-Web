import {LitElement, html, css} from 'lit';
import { baseStyle } from './styles';
import { logo } from '../lib/images';
import API from '../lib/API';

import './Sources';
import './Filters';
import './Recorders';
import './Dialog';
import Dialog from './Dialog';


export default class PlateMinder extends LitElement {
	static name = 'PlateMinder';
	static properties = {
		config: {}
	};
	static styles = [
		baseStyle,
		css`
			:host {
				margin: 0.5em;
				display: block;
			}
			.logo {
				
			}
			.logo > svg {
				height: 150px;
			}
		`
	];
	#config = {};
	
	constructor() {
		super();

		(async () => {
			try {
				this.config = await API.getConfig();
			}
			catch(err) {
				const dlg = Dialog.createError(err.message);
				document.body.appendChild(dlg);
			}
		})();
	}
	get config() {
		return this.#config;
	}
	set config(v) {
		if(v === null || typeof v !== 'object')
			throw new TypeError('config must be an Object.');
		this.#config = v;
		this.requestUpdate();
	}
	render() {
		return html`
			<div class="logo">${logo}</div>
			<sources-element .config=${this.config.sources || []}></sources-element>
			<filters-element .config=${this.config.filters || []}></filters-element>
			<recorders-element .config=${this.config.recorders || []}></recorders-element>
		`;
	}
}
customElements.define('plate-minder', PlateMinder);
