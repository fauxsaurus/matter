type IProps = {oninput: (arg: number) => void; value: number}

export const InputNumber = (props: IProps) => (
	<input
		oninput={event => props.oninput(event.currentTarget.valueAsNumber)}
		type="number"
		value={props.value}
	/>
)
