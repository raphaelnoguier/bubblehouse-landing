// global store
export const strict = false;
import Prismic from 'prismic-javascript';
import prismicConfig from '../prismic.config.js';

export const state = () => ({
	modalOpen: false,
	modalInputEmail: '',
	modalInputName: '',
	homepage: {},
	navCtaVisible: false,
	navCtaBgColor: '',
	boardSectionBgColor: ''
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
	navCtaVisible(state) {
		return state.navCtaVisible
	},
	navCtaBgColor(state) {
		return state.navCtaBgColor
	},
	boardSectionBgColor(state) {
		return state.boardSectionBgColor
	},
};

export const mutations = {
	SET_MODAL_OPEN(state, bool) {
		state.modalOpen = bool;
		if (bool) document.body.classList.add('locked');
		else document.body.classList.remove('locked');
	},
	SET_MODAL_INPUT_EMAIL(state, email) {
		state.modalInputEmail = email;
	},
	SET_MODAL_INPUT_NAME(state, name) {
		state.modalInputName = name;
	},
	SET_HOMEPAGE(state, homepage) {
		state.homepage = homepage;
	},
	SET_NAV_CTA_VISIBLE(state, bool) {
		state.navCtaVisible = bool;
	},
	SET_NAV_CTA_BG_COLOR(state, color) {
		// state.navCtaBgColor = color;
	},
	SET_BOARD_SECTION_BG_COLOR(state, color) {
		state.boardSectionBgColor = color;
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
			commit('SET_HOMEPAGE', homepage);
			return { homepage };
		}
	},
};
