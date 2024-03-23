import { FIELD_TYPES, type FieldItemType } from '../types';

type Props = {
	values: FieldItemType;
	save: (values: FieldItemType) => void;
};

const classes = {
	label: 'grid grid-cols-4 gap-4 items-baseline',
	field: 'appearance-none col-span-3 rounded bg-neutral-600 px-3 py-1',
};
export default function ({ values, save }: Props) {
	const { title, key, description, type } = values;

	const handleChange = (event: any) => {
		const { name, value } = event.currentTarget;

		save({
			...values,
			[name]: value,
		});
	};

	return (
		<>
			<label className={classes.label}>
				Key
				<input
					className={classes.field}
					type="text"
					name="key"
					onInput={handleChange}
					value={key}
				/>
			</label>

			<label className={classes.label}>
				Type
				<select
					className={classes.field}
					name="type"
					onChange={handleChange}
					value={type}
				>
					{FIELD_TYPES.map((fType, index) => (
						<option key={index} value={fType}>
							{fType}
						</option>
					))}
				</select>
			</label>

			<label className={classes.label}>
				Title
				<input
					className={classes.field}
					type="text"
					name="title"
					onInput={handleChange}
					value={title}
				/>
			</label>

			<label className={classes.label}>
				Description
				<textarea className={classes.field} name="description" onInput={handleChange}>
					{description}
				</textarea>
			</label>
		</>
	);
}
