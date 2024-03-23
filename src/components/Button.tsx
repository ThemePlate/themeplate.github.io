import type { HTMLAttributes } from 'preact/compat';

type Props = HTMLAttributes<HTMLButtonElement>;

export default function ({ children, ...props }: Props) {
	return (
		<button {...props} className="rounded border border-neutral-700 bg-neutral-800 px-6 py-2 text-sm text-neutral-200 hover:ring">
			{children}
		</button>
	);
}
