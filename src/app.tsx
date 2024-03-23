import { signal, useSignal } from '@preact/signals';
import CodePreview from './components/CodePreview';
import FieldList from './components/FieldList';

import { FIELD_TYPES, type FieldItemType } from './types';

const random = Math.floor(Math.random() * FIELD_TYPES.length);
const fields: FieldItemType[] = [
	{
		key: 'index',
		type: FIELD_TYPES[random],
		title: 'Example Title',
		description: 'Test Description',
	},
];

export default function () {
	const fieldItems = useSignal(fields.map((field) => signal(field)));

	return (
		<div className="grid place-items-center gap-8 md:gap-16 lg:w-full">
			<h1 className="text-center text-5xl font-black tracking-wide md:text-6xl">ThemePlate Fields</h1>

			<div className="grid w-full bg-neutral-900 lg:grid-cols-2">
				<FieldList items={fieldItems} initLength={fields.length}></FieldList>
				<CodePreview data={fieldItems}></CodePreview>
			</div>

			<div class="flex items-center gap-4">
				<a href="https://vitejs.dev" target="_blank">
					<img src="/vite.svg" alt="Vite logo" />
				</a>
				<a href="https://preactjs.com" target="_blank">
					<img src="/preact.svg" alt="Preact logo" />
				</a>
				<a href="https://www.typescriptlang.org" target="_blank">
					<img src="/typescript.svg" alt="Typescript logo" />
				</a>
			</div>
		</div>
	);
}
