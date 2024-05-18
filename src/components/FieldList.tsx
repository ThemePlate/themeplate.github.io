import { signal, useComputed } from '@preact/signals';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FIELD_TYPES } from '../types';
import Button from './Button';
import FieldItem from './FieldItem';

import type { Signal } from '@preact/signals';
import type { FieldItemType } from '../types';

type Props = {
	items: Signal<Signal<FieldItemType>[]>;
	initLength: number;
};

export default function ({ items, initLength }: Props) {
	const nextIndex = useComputed(() => items.value.length + 1);

	const addField = () => {
		items.value = [
			...items.value,
			signal({
				key: `index-${nextIndex}`,
				type: FIELD_TYPES[0],
				title: `Title #${nextIndex}`,
				description: `Description #${nextIndex}`,
			}),
		];
	};

	const removeField = (index: number) => {
		items.value = items.value.filter((_, i) => i !== index);
	};

	const moveField = (dragIndex: number, hoverIndex: number) => {
		const reorder = (startIndex: number, endIndex: number) => {
			const result = [...items.value];
			const [removed] = result.splice(startIndex, 1);

			result.splice(endIndex, 0, removed);

			return result;
		};

		items.value = reorder(dragIndex, hoverIndex);
	};

	return (
		<div className="grid auto-rows-min gap-4 p-4 lg:p-8">
			<DndProvider backend={HTML5Backend}>
				<ol className="grid gap-4">
					{items.value.map((field, index) => (
						<FieldItem
							key={field.peek().key}
							id={index}
							data={field}
							defaultOpen={index + 1 >= initLength}
							removeAction={removeField}
							moveAction={moveField}
						/>
					))}
				</ol>
			</DndProvider>

			<div className="mt-2">
				<Button onClick={() => addField()}>Add</Button>
			</div>
		</div>
	);
}
