import { effect } from '@preact/signals';
import { useState } from 'preact/hooks';
import { codeToHtml } from 'shiki';

import type { Signal } from '@preact/signals';
import type { FieldItemType } from '../types';

interface Props {
	data: Signal<Signal<FieldItemType>[]>;
}

const item = (value: FieldItemType) => {
	const items = Object.entries(value)
		.filter(([key]) => key !== 'key')
		.map(([key, val]) => {
			return `'${key}' => '${val}'`;
		});

	return `'${value.key}' => array(
		${items.join(',\n\t\t')},
	)`;
};

const wrap = (value: Signal<FieldItemType>[]) => {
	const items = Object.values(value).map((val) => `${item(val.value)}`);

	return `array(
	${items.join(',\n\t')},
);`;
};

export default function ({ data }: Props) {
	const [html, setHtml] = useState('');

	effect(() => {
		codeToHtml(wrap(data.value), {
			lang: 'php',
			theme: 'dark-plus',
		}).then(setHtml);
	});

	return <div className="" dangerouslySetInnerHTML={{ __html: html }}></div>;
}