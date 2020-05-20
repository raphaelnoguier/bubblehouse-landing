// global store
export const strict = false;
import Prismic from 'prismic-javascript';
import prismicConfig from '../prismic.config.js';

export const state = () => ({
	modalOpen: false,
	modalInputEmail: '',
	modalInputName: '',
	modalByPass: false,
	homepage: {},
	termsPage: {},
	privacyPage: {},
	navCtaVisible: false,
	navCtaBgColor: '',
	prevNavCtaBgColor: '',
	boardSectionBgColor: '',
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
	modalByPass(state) {
		return state.modalByPass
	},
	homepage(state) {
		return state.homepage
	},
	termsPage(state) {
		return state.termsPage
	},
	privacyPage(state) {
		return state.privacyPage
	},
	navCtaVisible(state) {
		return state.navCtaVisible
	},
	navCtaBgColor(state) {
		return state.navCtaBgColor
	},
	prevNavCtaBgColor(state) {
		return state.prevNavCtaBgColor
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
	SET_MODAL_BYPASS(state, bool) {
		state.modalByPass = bool;
	},
	SET_HOMEPAGE(state, homepage) {
		state.homepage = homepage;
	},
	SET_TERMSPAGE(state, termsPage) {
		state.termsPage = termsPage
	},
	SET_PRIVACYPAGE(state, privacyPage) {
		state.privacyPage = privacyPage
	},
	SET_NAV_CTA_VISIBLE(state, bool) {
		state.navCtaVisible = bool;
	},
	SET_NAV_CTA_BG_COLOR(state, color) {
		state.navCtaBgColor = color;
	},
	SET_PREV_NAV_CTA_BG_COLOR(state, color) {
		state.prevNavCtaBgColor = color;
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
			});
	  	});


		if (homepage) {
			commit('SET_HOMEPAGE', homepage);
			return { homepage };
		}
	},
	async GET_PRIVACY ({ commit }) {
		let privacyPage = null;

	  	await Prismic.getApi(prismicConfig.apiEndpoint, { accessToken: prismicConfig.accessToken }).then((api) => {
			return api.query(Prismic.Predicates.at('document.type', 'privacy'))
			.then((response) => {
				privacyPage = response.results[0].data
			});
	  	});

		if (privacyPage) {
			commit('SET_PRIVACYPAGE', privacyPage);
			return { privacyPage };
		}
	},
	async GET_TERMS ({ commit }) {
		let termsPage = null;

	  	await Prismic.getApi(prismicConfig.apiEndpoint, { accessToken: prismicConfig.accessToken }).then((api) => {
			return api.query(Prismic.Predicates.at('document.type', 'terms'))
			.then((response) => {
				termsPage = response.results[0].data
			});
	  	});

		if (termsPage) {
			commit('SET_TERMSPAGE', termsPage);
			return { termsPage };
		}
	}
};
