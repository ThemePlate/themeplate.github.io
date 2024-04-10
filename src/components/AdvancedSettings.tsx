import { type FieldItemType } from '../types';
import { classes } from './FieldForm';

type Props = {
	data: FieldItemType;
	save: (event: any) => void;
};

const check = {
	label: 'flex gap-4 items-center',
	input: 'appearance-none rounded w-6 h-6 text-neutral-600',
};

export default function ({ data, save }: Props) {
	const { multiple, none, style, repeatable, required } = data;

	const handleToggle = (event: any) => {
		const { checked } = event.currentTarget;
		event.currentTarget.value = checked;

		save(event);
	};

	return (
		<>
			<label className={classes.label}>
				Classname/s
				<input className={classes.field} type="text" name="style" onInput={save} value={style} />
			</label>

			<div className={classes.label}>
				<div className="col-span-3 col-start-2 mt-2 grid grid-cols-2 grid-rows-2 gap-2">
					<label className={check.label}>
						<input className={check.input} type="checkbox" name="multiple" onChange={handleToggle} checked={multiple} />
						Multiple
					</label>

					<label className={check.label}>
						<input className={check.input} type="checkbox" name="none" onChange={handleToggle} checked={none} />
						None
					</label>

					<label className={check.label}>
						<input
							className={check.input}
							type="checkbox"
							name="repeatable"
							onChange={handleToggle}
							checked={repeatable}
						/>
						Repeatable
					</label>

					<label className={check.label}>
						<input className={check.input} type="checkbox" name="required" onChange={handleToggle} checked={required} />
						Required
					</label>
				</div>
			</div>
		</>
	);
}
