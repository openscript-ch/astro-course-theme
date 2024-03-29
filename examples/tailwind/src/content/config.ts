import { defineCollection } from 'astro:content';
import { docsSchema } from '@openscript-ch/astro-course-theme/schema';

export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
};
