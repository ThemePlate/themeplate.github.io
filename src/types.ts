export const FIELD_TYPES = [
	'input',
	'textarea',
	'date',
	'select',
	'radio',
	'checkbox',
	'color',
	'file',
	'number',
	'editor',
	'html',
	'link',
] as const;

export type FieldItemType = {
	key: string;
	type: (typeof FIELD_TYPES)[number];
	title: string;
	description: string;
	multiple?: boolean;
	none?: boolean;
	style?: string;
	repeatable?: boolean;
	required?: boolean;
};
