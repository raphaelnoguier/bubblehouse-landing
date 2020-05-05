// global store
export const strict = false

export const state = () => ({
	modalOpen: false,
	modalInputEmail: '',
	modalInputName: ''
})

export const getters = {
	modalOpen(state) {
		return state.modalOpen
	},
	modalInputEmail(state) {
		return state.modalInputEmail
	},
	modalInputName(state) {
		return state.modalInputName
	},
}

export const mutations = {
	SET_MODAL_OPEN(state, { open, inputEmail, inputName }) {
		state.modalOpen = open;
		state.modalInputEmail = inputEmail;
		state.modalInputName = inputName;
		if (open) document.body.classList.add('locked');
		else document.body.classList.remove('locked');
	},
}
