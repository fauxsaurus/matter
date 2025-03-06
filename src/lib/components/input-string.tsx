type IProps = {oninput: (arg: string) => void; value: string}

export const InputString = (props: IProps) => (
	<textarea oninput={event => props.oninput(event.currentTarget.value)} value={props.value} />
)
