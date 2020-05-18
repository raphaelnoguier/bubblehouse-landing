import DOM from 'prismic-dom';

const text = text => text ? DOM.RichText.asText(text) : '';
const html = html => html ? DOM.RichText.asHtml(html) : '';
const link = (link, ctx) => link ? DOM.Link.url(link, ctx) : '';

export {
	text,
	html,
	link
}