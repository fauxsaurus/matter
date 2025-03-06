type IProps = {oninput: (arg: boolean) => void; value: boolean}

export const InputBoolean = (props: IProps) => (
	<input
		checked={props.value}
		onchange={event => props.oninput(event.currentTarget.checked)}
		type="checkbox"
	/>
)
