import { useComputed, useSignal } from '@preact/signals';
import Button from './Button';
import FieldForm from './FieldForm';

import type { Signal } from '@preact/signals';
import type { FieldItemType } from '../types';

type Props = {
	defaultOpen: boolean;
	id: number;
	data: Signal<FieldItemType>;
	removeAction: (index: number) => void;
};

export default function ({ defaultOpen, id, data, removeAction }: Props) {
	const title = useComputed(() => data.value.title);
	const type = useComputed(() => data.value.type.toUpperCase());
	const collapsed = useSignal(!defaultOpen);
	const isCollapsed = useComputed(() => (collapsed.value ? 'true' : 'false'));
	const className = useComputed(() => `grid gap-2 border-neutral-600 p-4 ${collapsed.value ? 'hidden' : ''}`);

	return (
		<li key={id} className="rounded bg-neutral-800 text-white shadow">
			<div className="flex items-center justify-between p-4">
				<h2 className="w-full" id={`preview-${id}`} aria-hidden={isCollapsed} aria-controls={`form-${id}`}>
					<button
						className="grid w-full cursor-pointer grid-cols-4 items-center gap-4 hover:ring"
						onClick={() => {
							collapsed.value = !collapsed.value;
						}}
					>
						<span className="bg-neutral-600 p-1 text-xs">{type}</span>
						<span className="col-span-3 text-left">{title}</span>
					</button>
				</h2>

				<Button outline={true} onClick={() => removeAction(id)}>
					&#10005;
				</Button>
			</div>

			<form id={`form-${id}`} className={className} aria-labelledby={`preview-${id}`}>
				<FieldForm values={data.peek()} save={(values) => (data.value = values)} />
			</form>
		</li>
	);
}
