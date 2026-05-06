import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const menu = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/menu" }),
    schema: z.object({
        title: z.string(),
        price: z.coerce.number(), 
        category: z.enum(["Soupes", "Plats", "Desserts", "Hors d'œuvres"]),
        description: z.string(),
        image: z.string(),
        is_bestseller: z.boolean().optional(),
        hasSpice: z.boolean().optional().default(false),
        allergens: z.array(z.string()).optional().default([]),
        
        // --- NOUVELLE STRUCTURE : GROUPES DE VARIANTES ---
        variant_groups: z.array(z.object({
          group_name: z.string(), // "Protéines", "Nouilles", etc.
          options: z.array(z.object({
            name: z.string(),
            image: z.string().optional(),
          }))
        })).optional(),
        
        // --- LES EXTRAS ---
        extras: z.array(z.object({
          name: z.string(),
          price: z.coerce.number(),
        })).optional(),
        
        tags: z.array(z.string()),
        preorder: z.boolean().optional().default(false),
    }),
});

export const collections = { menu };