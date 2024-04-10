import type { HTMLAttributes } from 'preact/compat';

type Props = HTMLAttributes<HTMLButtonElement> & {
	outline?: boolean;
};

export default function ({ children, outline = false, ...props }: Props) {
	const className = [
		'cursor-pointer rounded border border-solid',
		'border border-solid text-sm hover:ring',
		'text-white bg-neutral-800',
		outline ? 'border-white' : 'border-neutral-700',
		outline ? 'py-1 px-2' : 'py-2 px-6',
	];

	return (
		<button {...props} className={className.join(' ')}>
			{children}
		</button>
	);
}
