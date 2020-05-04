// global store
export const strict = false

export const state = () => ({
	modalOpen: false,
	modalInputName: ''
})

export const getters = {
	modalOpen(state) {
		return state.modalOpen
	},
	modalInputName(state) {
		return state.modalInputName
	},
}

export const mutations = {
	SET_MODAL_OPEN(state, { open, inputName }) {
		state.modalOpen = open;
		state.modalInputName = inputName;
		if (open) document.body.classList.add('locked');
		else document.body.classList.remove('locked');
	},
}
