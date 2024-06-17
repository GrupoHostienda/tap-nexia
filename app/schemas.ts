import { z } from "zod";

/* SCHEMA PARA LINKS - STYLES | START */
const StylePropertiesAPISchema = z.object({
  id: z.number(),
  property: z.string(),
  options: z.array(z.string()),
});
export const LinkStylesAPISchema = z.object({
  id: z.number(),
  name: z.string(),
  hasSchema: z.number(),
  schemas: z.array(StylePropertiesAPISchema),
});
export const LinksStylesAPISchema = z.array(LinkStylesAPISchema);
/* SCHEMA PARA LINKS - STYLES | END */

export const BackgroundSchema = z.object({
  id: z.number(),
  name: z.string(),
  plan: z.string(),
  image: z.string().nullable(),
});
export const BackgroundsSchema = z.array(BackgroundSchema);

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  role: z.string(),
  cover: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  home_page: z
    .object({
      bio: z.string(),
      style: z.string(),
      background: z.object({
        id: z.number(),
        name: z.string(),
        plan: z.string(),
        image: z.string().nullable(),
      }),
    })
    .nullable(),
});

export const UserLinkSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  isHidden: z.number(),
  style: z.object({ class: z.string() }),
  type: z.object({ id: z.number(), name: z.string(), hasSchema: z.number() }),
});

export const UserLinksSchema = z.array(UserLinkSchema);
