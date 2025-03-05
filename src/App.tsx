import type {Component} from 'solid-js'
import {createSignal, Index} from 'solid-js'

import styles from './App.module.css'

type IUuid = string
type IType = 'string' | 'number' | 'object' | 'array' | 'boolean' | 'regex'

const mkUuid = (): IUuid => self.crypto.randomUUID()

const App: Component = () => {
	const [state, setState] = createSignal<Record<IUuid, {id: IUuid; value: any; type: IType}>>({})
	const uiState = () => Object.values(state()) // Needs to be an [] for `<Index>`.

	const updateState = (id: IUuid, value: any, props = {}) =>
		void setState(state =>
			Object.assign({}, state, {[id]: {...(state[id] ?? {}), value, ...props}})
		)

	const createNewState = (type: IType) => {
		const id = mkUuid()
		const value = {
			array: [],
			boolean: false,
			number: 0,
			object: {},
			regex: {pattern: '', flags: ''},
			string: '',
		}[type]
		updateState(id, value, {id, type})
	}

	return (
		<div class={styles.App}>
			<Index each={uiState()}>
				{item => {
					const {id, value, type} = item()

					const input =
						type === 'string' ? (
							<textarea
								oninput={event => updateState(id, event.currentTarget.value)}
								value={value}
							></textarea>
						) : type === 'number' ? (
							<input
								type="number"
								oninput={event =>
									updateState(id, event.currentTarget.valueAsNumber)
								}
								value={value}
							/>
						) : (
							`Editing type "${type}" not supported.`
						)

					return (
						<div>
							<label>
								{id}: {input}
							</label>
						</div>
					)
				}}
			</Index>
			<div>
				<button onClick={() => createNewState('string')}>""</button>
				<button onClick={() => createNewState('number')}>#</button>
				<button onClick={() => createNewState('array')}>[]</button>
				<button onClick={() => createNewState('object')}>{'{}'}</button>
				<button onClick={() => createNewState('boolean')}>tf</button>
				<button onClick={() => createNewState('regex')}>*.</button>
			</div>
			<output>
				<pre>{JSON.stringify(state(), null, 4)}</pre>
			</output>
		</div>
	)
}

export default App
