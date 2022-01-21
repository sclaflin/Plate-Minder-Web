import { css } from 'lit';

export const baseStyle = css`
	*:focus {
		outline: none;
	}
	.header {
		border-top-left-radius: 0.25em;
		border-top-right-radius: 0.25em;
		background: #35475b;
		padding: 0.5em;
		font-weight: bold;
	}
	.info > .inner {
		border-radius: 0.25em;
		margin: 0.5em;
		padding: 0.5em;
	}
	.content, .content2 {
		border: none;
		border-radius: 0.25em;
	}
	.content {
		background: #2c3d52;
	}
	.content2 {
		background: #233348;
	}
	.warning {
		color: #ff5f57;
		background: #233348;
	}
	input {
		border: none;
		background: #233348;
		color: #fff;
		border-radius: 0.25em;
		padding: 0.25em;
	}
	button, select {
		background: #2a7fef;
		color: #fff;
		border: none;
		padding: 0.25em;
		border-radius: 0.25em;
		cursor: pointer;
	}
	fieldset {
		position: relative;
		padding-top: 3em;
		margin-bottom: 0.5em;
	}
	fieldset legend {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
`;
