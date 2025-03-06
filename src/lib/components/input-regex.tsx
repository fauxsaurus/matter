type IProps = {
	flags: string
	pattern: string
	oninput: (arg: Record<'flags', string> | Record<'pattern', string>) => void
}

export const InputRegex = (props: IProps) => {
	/** @todo add validation here */
	return (
		<>
			<input
				oninput={event => props.oninput({pattern: event.currentTarget.value})}
				type="text"
				value={props.pattern}
			/>
			<input
				oninput={event => props.oninput({flags: event.currentTarget.value})}
				type="text"
				value={props.flags}
			/>
		</>
	)
}
