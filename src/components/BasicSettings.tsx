import { FIELD_TYPES, type FieldItemType } from '../types';
import { classes } from './FieldForm';

type Props = {
	data: FieldItemType;
	save: (event: any) => void;
};

export default function ({ data, save }: Props) {
	const { title, key, description, type } = data;

	return (
		<>
			<label className={classes.label}>
				Key
				<input className={classes.field} type="text" name="key" onInput={save} value={key} />
			</label>

			<label className={classes.label}>
				Type
				<select className={classes.field} name="type" onChange={save} value={type}>
					{FIELD_TYPES.map((fType, index) => (
						<option key={index} value={fType}>
							{fType}
						</option>
					))}
				</select>
			</label>

			<label className={classes.label}>
				Title
				<input className={classes.field} type="text" name="title" onInput={save} value={title} />
			</label>

			<label className={classes.label}>
				Description
				<textarea className={classes.field} name="description" onInput={save}>
					{description}
				</textarea>
			</label>
		</>
	);
}
