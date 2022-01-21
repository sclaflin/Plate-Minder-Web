import { LitElement, html, css } from 'lit-element';
import { baseStyle } from './styles';

export default class Dialog extends LitElement {
	static properties = {
		title: {},
		content: {},
		buttonBar: {}
	};
	static styles = [
		baseStyle,
		css`
			.background, .outer {
				position: fixed;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
			}
			.background {
				background-color: #000;
				opacity: 0.75;
			}
			.outer {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.inner {
				border-radius: 0.25em;
				margin: 1em;
				min-width: 300px;
				max-width: 60%;
			}
			.content {
				min-height: 3em;
				margin: 0.25em;
			}
			.buttonbar {
				text-align: right;
				margin: 0.25em;
			}
		`
	];
	#title = null;
	#content = null;
	#buttonBar = null;
	
	get title() {
		return this.#title;
	}
	set title(v) {
		if(typeof v !== 'string')
			throw new TypeError('title must be a string.');
		this.#title =  v;
		this.requestUpdate();
	}
	get content() {
		return this.#content;
	}
	set content(v) {
		if(!(v instanceof Node))
			throw new TypeError('content must be an instance of Node.');
		this.#content = v;
		this.requestUpdate();
	}
	get buttonBar() {
		return this.#buttonBar;
	}
	set buttonBar(v) {
		if(!(v instanceof Node))
			throw new TypeError('content must be an instance of Node.');
		this.#buttonBar = v;
		this.requestUpdate();
	}
	render() {
		return html`
			<div class="background"></div>
			<div class="outer">
				<div class="inner content">
					<div class="title header">${this.title}</div>
					<div class="content">${this.content}</div>
					<div class="buttonbar">${this.buttonBar}</div>
				</div>
			</div>
		`;
	}
	static fromObject(config) {
		if(config === null || typeof config !== 'object')
			throw new TypeError('config must be an Object.');
		const dlg = new this();
		dlg.title = config.title;
		dlg.content = typeof config.content === 'string' ? document.createTextNode(config.content) : config.content;
		dlg.buttonBar = typeof config.buttonBar === 'string' ? document.createTextNode(config.buttonBar) : config.buttonBar;
		return dlg;
	}
	static createError(content) {
		const dlg = new this();
		const close = document.createElement('button');
		close.appendChild(document.createTextNode('OK'));
		close.addEventListener('click', () => dlg.remove());
		dlg.title = 'Error';
		dlg.content = typeof content === 'string' ? document.createTextNode(content) : content;
		dlg.buttonBar = close;
		return dlg;
	}
}

customElements.define('dialog-element', Dialog);
