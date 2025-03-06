import type {Component} from 'solid-js'
import {createSignal, Index} from 'solid-js'

import styles from './App.module.css'

type IUuid = string
type IType = 'string' | 'number' | 'object' | 'array' | 'boolean' | 'regex'
type IState = {id: IUuid; label: string; type: IType; value: any}

const mkUuid = (): IUuid => self.crypto.randomUUID()

const App: Component = () => {
	const [states, setStates] = createSignal<Record<IUuid, IState>>({})
	const uiState = () => Object.values(states()) // Needs to be an [] for `<Index>`.

	const setState = (id: IUuid, value: any, props = {}) =>
		void setStates(state =>
			Object.assign({}, state, {[id]: {...(state[id] ?? {}), value, ...props}})
		)

	const createState = (type: IType) => {
		const id = mkUuid()
		const value = {
			array: [],
			boolean: false,
			number: 0,
			object: {},
			regex: {type: 'regex', pattern: '', flags: ''},
			string: '',
		}[type]
		setState(id, value, {id, label: 'label', type})
	}

	const deleteState = (id: IUuid) => void setStates(({[id]: _, ...state}) => state)

	const relabelState = (id: IUuid, label: string) =>
		void setStates(state => Object.assign({}, state, {[id]: {...state[id], label}}))

	return (
		<div class={styles.App}>
			<Index each={uiState()}>
				{item => {
					const {id, label, type, value} = item()

					const input =
						type === 'string' ? (
							<textarea
								oninput={event => setState(id, event.currentTarget.value)}
								value={value}
							></textarea>
						) : type === 'number' ? (
							<input
								type="number"
								oninput={event => setState(id, event.currentTarget.valueAsNumber)}
								value={value}
							/>
						) : type === 'boolean' ? (
							<input
								checked={value}
								onchange={event => setState(id, event.currentTarget.checked)}
								type="checkbox"
							/>
						) : type === 'regex' ? (
							<>
								<input
									oninput={event =>
										setState(id, {
											...item().value,
											pattern: event.currentTarget.value,
										})
									}
									type="text"
									value={value.pattern}
								/>
								<input
									oninput={event =>
										setState(id, {
											...item().value,
											flags: event.currentTarget.value,
										})
									}
									type="text"
									value={value.flags}
								/>
							</>
						) : (
							`Editing type "${type}" not supported.`
						)

					return (
						<div>
							<input
								oninput={event => relabelState(id, event.currentTarget.value)}
								value={label}
								type="text"
							/>
							: {input}
							<button onclick={() => deleteState(id)} title="delete">
								x
							</button>
						</div>
					)
				}}
			</Index>
			<div>
				<button onClick={() => createState('string')}>""</button>
				<button onClick={() => createState('number')}>#</button>
				<button onClick={() => createState('array')}>[]</button>
				<button onClick={() => createState('object')}>{'{}'}</button>
				<button onClick={() => createState('boolean')}>tf</button>
				<button onClick={() => createState('regex')}>*.</button>
			</div>
			<output>
				<pre>{JSON.stringify(states(), null, 4)}</pre>
			</output>
		</div>
	)
}

export default App
