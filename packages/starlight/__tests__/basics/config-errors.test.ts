import { expect, test } from 'vitest';
import { parseWithFriendlyErrors } from '../../utils/error-map';
import { StarlightConfigSchema, type StarlightUserConfig } from '../../utils/user-config';

function parseStarlightConfigWithFriendlyErrors(config: StarlightUserConfig) {
	return parseWithFriendlyErrors(
		StarlightConfigSchema,
		config,
		'Invalid config passed to starlight integration'
	);
}

test('parses valid config successfully', () => {
	const data = parseStarlightConfigWithFriendlyErrors({ title: '' });
	expect(data).toMatchInlineSnapshot(`
		{
		  "components": {
		    "Banner": "@openscript-ch/astro-course-theme/components/Banner.astro",
		    "ContentPanel": "@openscript-ch/astro-course-theme/components/ContentPanel.astro",
		    "DraftContentNotice": "@openscript-ch/astro-course-theme/components/DraftContentNotice.astro",
		    "EditLink": "@openscript-ch/astro-course-theme/components/EditLink.astro",
		    "FallbackContentNotice": "@openscript-ch/astro-course-theme/components/FallbackContentNotice.astro",
		    "Footer": "@openscript-ch/astro-course-theme/components/Footer.astro",
		    "Head": "@openscript-ch/astro-course-theme/components/Head.astro",
		    "Header": "@openscript-ch/astro-course-theme/components/Header.astro",
		    "Hero": "@openscript-ch/astro-course-theme/components/Hero.astro",
		    "LanguageSelect": "@openscript-ch/astro-course-theme/components/LanguageSelect.astro",
		    "LastUpdated": "@openscript-ch/astro-course-theme/components/LastUpdated.astro",
		    "MarkdownContent": "@openscript-ch/astro-course-theme/components/MarkdownContent.astro",
		    "MobileMenuFooter": "@openscript-ch/astro-course-theme/components/MobileMenuFooter.astro",
		    "MobileMenuToggle": "@openscript-ch/astro-course-theme/components/MobileMenuToggle.astro",
		    "MobileTableOfContents": "@openscript-ch/astro-course-theme/components/MobileTableOfContents.astro",
		    "PageFrame": "@openscript-ch/astro-course-theme/components/PageFrame.astro",
		    "PageSidebar": "@openscript-ch/astro-course-theme/components/PageSidebar.astro",
		    "PageTitle": "@openscript-ch/astro-course-theme/components/PageTitle.astro",
		    "Pagination": "@openscript-ch/astro-course-theme/components/Pagination.astro",
		    "Search": "@openscript-ch/astro-course-theme/components/Search.astro",
		    "Sidebar": "@openscript-ch/astro-course-theme/components/Sidebar.astro",
		    "SiteTitle": "@openscript-ch/astro-course-theme/components/SiteTitle.astro",
		    "SkipLink": "@openscript-ch/astro-course-theme/components/SkipLink.astro",
		    "SocialIcons": "@openscript-ch/astro-course-theme/components/SocialIcons.astro",
		    "TableOfContents": "@openscript-ch/astro-course-theme/components/TableOfContents.astro",
		    "ThemeProvider": "@openscript-ch/astro-course-theme/components/ThemeProvider.astro",
		    "ThemeSelect": "@openscript-ch/astro-course-theme/components/ThemeSelect.astro",
		    "TwoColumnContent": "@openscript-ch/astro-course-theme/components/TwoColumnContent.astro",
		  },
		  "credits": false,
		  "customCss": [],
		  "defaultLocale": {
		    "dir": "ltr",
		    "label": "English",
		    "lang": "en",
		    "locale": undefined,
		  },
		  "disable404Route": false,
		  "editLink": {},
		  "favicon": {
		    "href": "/favicon.svg",
		    "type": "image/svg+xml",
		  },
		  "head": [],
		  "isMultilingual": false,
		  "isUsingBuiltInDefaultLocale": true,
		  "lastUpdated": false,
		  "locales": undefined,
		  "pagefind": true,
		  "pagination": true,
		  "tableOfContents": {
		    "maxHeadingLevel": 3,
		    "minHeadingLevel": 2,
		  },
		  "title": {
		    "en": "",
		  },
		  "titleDelimiter": "|",
		}
	`);
});

test('errors if title is missing', () => {
	expect(() =>
		parseStarlightConfigWithFriendlyErrors({} as any)
	).toThrowErrorMatchingInlineSnapshot(
		`
		"[AstroUserError]:
			Invalid config passed to starlight integration
		Hint:
			**title**: Did not match union.
			> Required"
		`
	);
});

test('errors if title value is not a string or an Object', () => {
	expect(() =>
		parseStarlightConfigWithFriendlyErrors({ title: 5 } as any)
	).toThrowErrorMatchingInlineSnapshot(
		`
		"[AstroUserError]:
			Invalid config passed to starlight integration
		Hint:
			**title**: Did not match union.
			> Expected type \`"string" | "object"\`, received \`"number"\`"
	`
	);
});

test('errors with bad social icon config', () => {
	expect(() =>
		parseStarlightConfigWithFriendlyErrors({ title: 'Test', social: { unknown: '' } as any })
	).toThrowErrorMatchingInlineSnapshot(
		`
		"[AstroUserError]:
			Invalid config passed to starlight integration
		Hint:
			**social.unknown**: Invalid enum value. Expected 'twitter' | 'mastodon' | 'github' | 'gitlab' | 'bitbucket' | 'discord' | 'gitter' | 'codeberg' | 'codePen' | 'youtube' | 'threads' | 'linkedin' | 'twitch' | 'microsoftTeams' | 'instagram' | 'stackOverflow' | 'x.com' | 'telegram' | 'rss' | 'facebook' | 'email' | 'reddit' | 'patreon' | 'signal' | 'slack' | 'matrix' | 'openCollective' | 'hackerOne' | 'blueSky' | 'discourse' | 'zulip', received 'unknown'
			**social.unknown**: Invalid url"
	`
	);
});

test('errors with bad logo config', () => {
	expect(() =>
		parseStarlightConfigWithFriendlyErrors({ title: 'Test', logo: { html: '' } as any })
	).toThrowErrorMatchingInlineSnapshot(
		`
		"[AstroUserError]:
			Invalid config passed to starlight integration
		Hint:
			**logo**: Did not match union.
			> Expected type \`{ src: string } | { dark: string; light: string }\`
			> Received \`{ "html": "" }\`"
	`
	);
});

test('errors with bad head config', () => {
	expect(() =>
		parseStarlightConfigWithFriendlyErrors({
			title: 'Test',
			head: [{ tag: 'unknown', attrs: { prop: null }, content: 20 } as any],
		})
	).toThrowErrorMatchingInlineSnapshot(
		`
		"[AstroUserError]:
			Invalid config passed to starlight integration
		Hint:
			**head.0.tag**: Invalid enum value. Expected 'title' | 'base' | 'link' | 'style' | 'meta' | 'script' | 'noscript' | 'template', received 'unknown'
			**head.0.attrs.prop**: Did not match union.
			> Expected type \`"string" | "boolean" | "undefined"\`, received \`"null"\`
			**head.0.content**: Expected type \`"string"\`, received \`"number"\`"
	`
	);
});

test('errors with bad sidebar config', () => {
	expect(() =>
		parseStarlightConfigWithFriendlyErrors({
			title: 'Test',
			sidebar: [{ label: 'Example', href: '/' } as any],
		})
	).toThrowErrorMatchingInlineSnapshot(
		`
		"[AstroUserError]:
			Invalid config passed to starlight integration
		Hint:
			**sidebar.0**: Did not match union.
			> Expected type \`{ link: string } | { items: array } | { autogenerate: object }\`
			> Received \`{ "label": "Example", "href": "/" }\`"
	`
	);
});

test('errors with bad nested sidebar config', () => {
	expect(() =>
		parseStarlightConfigWithFriendlyErrors({
			title: 'Test',
			sidebar: [
				{
					label: 'Example',
					items: [
						{ label: 'Nested Example 1', link: '/' },
						{ label: 'Nested Example 2', link: true },
					],
				} as any,
			],
		})
	).toThrowErrorMatchingInlineSnapshot(`
		"[AstroUserError]:
			Invalid config passed to starlight integration
		Hint:
			**sidebar.0.items.1**: Did not match union.
			> Expected type \`{ link: string } | { items: array } | { autogenerate: object }\`
			> Received \`{ "label": "Example", "items": [ { "label": "Nested Example 1", "link": "/" }, { "label": "Nested Example 2", "link": true } ] }\`"
	`);
});
