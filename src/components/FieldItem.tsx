import { useComputed, useSignal } from '@preact/signals';
import { useRef } from 'preact/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { DnDTypes } from '../types';
import Button from './Button';
import FieldForm from './FieldForm';

import type { Signal } from '@preact/signals';
import type { Identifier, XYCoord } from 'dnd-core';
import type { DragItem, FieldItemType } from '../types';

type Props = {
	defaultOpen: boolean;
	id: number;
	data: Signal<FieldItemType>;
	removeAction: (index: number) => void;
	moveAction: (dragIndex: number, hoverIndex: number) => void;
};

export default function ({ defaultOpen, id, data, removeAction, moveAction }: Props) {
	const itemRef = useRef<HTMLLIElement>(null);
	const title = useComputed(() => data.value.title);
	const type = useComputed(() => data.value.type.toUpperCase());
	const collapsed = useSignal(!defaultOpen);
	const isCollapsed = useComputed(() => (collapsed.value ? 'true' : 'false'));
	const className = useComputed(() => `grid gap-2 border-neutral-600 p-4 ${collapsed.value ? 'hidden' : ''}`);

	const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
		accept: DnDTypes.FIELD,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor) {
			const currentRef = itemRef.current;

			if (null === currentRef) {
				return;
			}

			const dragIndex = item.id;
			const hoverIndex = id;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = currentRef.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

			if (
				(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
				(dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
			) {
				return;
			}

			moveAction(dragIndex, hoverIndex);

			item.id = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: DnDTypes.FIELD,
		item: () => {
			return { id };
		},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0.1 : 1;
	drag(drop(itemRef));

	return (
		<li
			ref={itemRef}
			className="cursor-move rounded bg-neutral-800 text-white shadow"
			data-handler-id={handlerId}
			style={{ opacity }}
		>
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
				<FieldForm values={data.value} save={(values) => (data.value = values)} />
			</form>
		</li>
	);
}
