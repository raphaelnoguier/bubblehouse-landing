// global store
export const strict = false;
import Prismic from 'prismic-javascript';
import prismicConfig from '../prismic.config.js';

export const state = () => ({
	modalOpen: false,
	modalInputEmail: '',
	modalInputName: '',
	homepage: {}
});

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
	homepage(state) {
		return state.homepage
	},
};

export const mutations = {
	SET_MODAL_OPEN(state, { open, inputEmail, inputName }) {
		state.modalOpen = open;
		state.modalInputEmail = inputEmail;
		state.modalInputName = inputName;
		if (open) document.body.classList.add('locked');
		else document.body.classList.remove('locked');
	},
	SET_HOMEPAGE(state, homepage) {
		state.homepage = homepage;
	},
};

export const actions = {
	async nuxtServerInit ({ commit }) {
		let homepage = null;

	  	await Prismic.getApi(prismicConfig.apiEndpoint, { accessToken: prismicConfig.accessToken }).then((api) => {
			return api.query(Prismic.Predicates.at('document.type', 'homepage'))
			.then((response) => {
				homepage = response.results[0].data
				console.log(homepage);
			});
	  	});


		if (homepage) {
			commit('SET_HOMEPAGE', homepage)
			return { homepage };
		}
	},
};
