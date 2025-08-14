// /sanity/schemaTypes/documents/service.ts
import { defineType, defineField } from 'sanity'

export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (R:any)=>R.required() },
    { name: "summary", title: "Short description (one line)", type: "string" }, // <-- shows under title
    { name: "category", title: "Category", type: "string", options: { list: ["People","Places","Brand"] }, validation:(R:any)=>R.required() }, // <-- left rail tab
    { name: "order", title: "Order", type: "number" },
  ],
};
