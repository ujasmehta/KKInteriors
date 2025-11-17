import { type SchemaTypeDefinition } from "sanity";


import { piece } from "./piece";
import { category } from "./category";
import { collection } from "./collection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [piece,category,collection,],
};
