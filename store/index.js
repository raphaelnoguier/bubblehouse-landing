// global store
export const strict = false;
import Prismic from 'prismic-javascript';
import prismicConfig from '../prismic.config.js';

export const state = () => ({
	homepage: {},
	termsPage: {},
	privacyPage: {},
	navCtaVisible: false,
});

export const getters = {
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
};

export const mutations = {
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
