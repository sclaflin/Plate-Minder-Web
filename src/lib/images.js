import { html } from 'lit';

export const infoSquare = html`
	<svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-info-square'
		width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round'
		stroke-linejoin='round'>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<line x1='12' y1='8' x2='12.01' y2='8' />
		<rect x='4' y='4' width='16' height='16' rx='2' />
		<polyline points='11 12 12 12 12 16 13 16' />
	</svg>
`;

export const alert = html`
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
		<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
		<path d="M12 9v2m0 4v.01" />
		<path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
	</svg>
`;

export const logo = html`
	<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
	style="clip-rule:evenodd;fill-rule:evenodd;image-rendering:optimizeQuality;shape-rendering:geometricPrecision;text-rendering:geometricPrecision"
	viewBox="0 0 1024 551">
		<path d="M13003 0v7000H0V0z" style="fill:none" transform="scale(.07875)" />
		<path
			d="M923 482h11158c274 0 498 225 498 499v5038c0 274-224 499-498 499H923a500 500 0 0 1-499-499V981c0-274 224-499 499-499Z"
			style="fill:#35475b;fill-opacity:1" transform="scale(.07875)" />
		<path
			d="M2827 5866h162c51 0 93 47 93 106 0 58-42 106-93 106h-162c-51 0-93-48-93-106 0-59 42-106 93-106zm0-4732h162c51 0 93-47 93-106 0-58-42-106-93-106h-162c-51 0-93 48-93 106 0 59 42 106 93 106z"
			class="fil25" style="fill:#fff" transform="scale(.07875)" />
		<path
			d="M10176 5891h-162c-51 0-93 48-93 106 0 59 42 106 93 106h162c51 0 93-47 93-106 0-58-42-106-93-106zm0-4782h-162c-51 0-93-48-93-106 0-59 42-106 93-106h162c51 0 93 47 93 106 0 58-42 106-93 106z"
			class="fil24" style="fill:#fff" transform="scale(.07875)" />
		<g style="font-size:2675.37px;line-height:1.25;font-family:sans-serif;stroke-width:1.33769">
			<path
				d="M2712 2398q0 175-80 309-79 132-231 203-150 72-360 72h-258v622h-385V1842h627q336 0 511 142 176 141 176 414zm-388 7q0-142-86-203-85-61-256-61h-199v545h209q173 0 252-71 80-72 80-210zm777 1199V1842h386v1464h804v298zm2326-1464v1464h-386V2140h-530v-298h1446v298zm1033 930v-319h758v319zm2368 534V2470q0-137 21-393-77 379-98 446l-162 611h-285l-164-611q-38-142-99-446l9 131q9 137 9 262v1134h-287V1842h453l176 652q20 61 50 302 26-203 52-301l178-653h437v1762zm1397 0-502-1319q37 329 37 462v857h-336V1842h440l514 1355q-37-307-37-477v-878h336v1762zm2129-895q0 431-201 664-201 231-574 231h-549V1842h471q429 0 640 215 213 215 213 652zm-388 0q0-296-112-432-111-137-359-137h-80v1166h133q418 0 418-597zm1662 895-379-673h-226v673h-385V1842h645q345 0 516 134 171 135 171 388 0 179-97 305-96 125-267 176l455 759zm-46-1224q0-123-81-180-81-59-259-59h-219v491h230q329 0 329-252z"
				aria-label="PLT-MNDR"
				style="font-style:normal;font-variant:normal;font-weight:700;font-stretch:normal;font-size:2675.37px;font-family:'Liberation Mono';-inkscape-font-specification:'Liberation Mono Bold';fill:#fff;stroke-width:1.33769"
				transform="scale(.06624 .09363)" />
		</g>
		<path
			d="M302 413v13h6q3 0 4-2 2-1 2-5 0-3-2-4-1-2-4-2zm-5-4h11q5 0 8 3 3 2 3 7 0 6-3 8-3 3-8 3h-6v14h-5zm36 0h5v31h17v4h-22Zm47 5-6 17h13zm-2-5h5l13 35h-5l-3-9h-16l-3 9h-5zm22 0h30v4h-13v31h-4v-31h-13zm42 0h22v4h-17v10h16v4h-16v13h17v4h-22Zm35 20h13v4h-13zm28-20h6l9 24 9-24h7v35h-5v-31l-8 24h-5l-9-24v31h-4zm48 0h5v35h-5zm22 0h6l16 29v-29h4v35h-6l-15-29v29h-5zm48 4v27h6q7 0 10-3 3-4 3-11t-3-10q-3-3-10-3zm-5-4h10q10 0 14 4 5 4 5 13t-5 13q-4 5-14 5h-10zm44 0h22v4h-17v10h17v4h-17v13h18v4h-23zm55 18 2 3 3 4 5 10h-5l-4-9-4-5-4-1h-5v15h-5v-35h11q6 0 9 3t2 7l-1 5q-2 3-4 3zm-12-14v12h6l5-1 1-5-1-4q-2-2-5-2z"
			aria-label="PLATE-MINDER"
			style="font-size:600px;line-height:1.25;font-family:sans-serif;letter-spacing:100px;fill:#fff" />
	</svg>
`;
