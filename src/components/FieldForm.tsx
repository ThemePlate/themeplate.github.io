import { useState } from 'preact/hooks';
import { type FieldItemType } from '../types';
import AdvancedSettings from './AdvancedSettings';
import BasicSettings from './BasicSettings';
import Button from './Button';

type Props = {
	values: FieldItemType;
	save: (values: FieldItemType) => void;
};

export const classes = {
	label: 'grid grid-cols-4 gap-4 items-baseline',
	field: 'col-span-3 rounded bg-neutral-600 px-3 py-1',
};

export default function ({ values, save }: Props) {
	const [showAdvanced, setShowAdvanced] = useState(false);

	const handleChange = (event: any) => {
		const { name, value, type } = event.currentTarget;
		const saveValue = type === 'checkbox' ? 'true' === value : value;

		save({
			...values,
			[name]: saveValue,
		});
	};

	const toggleAdvanced = (event: Event) => {
		event.preventDefault();
		setShowAdvanced(!showAdvanced);
	};

	return (
		<>
			<BasicSettings data={values} save={handleChange} />

			<div className={classes.label}>
				<div></div>
				<Button style="grid-column: 2/-1" onClick={toggleAdvanced}>
					Advanced Settings {String.fromCharCode(showAdvanced ? 8593 : 8595)}
				</Button>
			</div>

			{showAdvanced && <AdvancedSettings data={values} save={handleChange} />}
		</>
	);
}
