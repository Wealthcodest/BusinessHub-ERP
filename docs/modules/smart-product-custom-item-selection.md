# Smart Product / Custom Item Selection

Session items in quotations and invoices can be catalog snapshots or custom items. The shared session editor provides the same searchable product and service selector in both document types. Search covers the product name, SKU, barcode, description, category, and type; category chips support Products, Services, and available catalogue categories.

## Item data

An existing product item stores a snapshot at selection time:

```js
{ productId, description, unit, unitPrice, quantity, lineTotal }
```

`productId` identifies the source catalogue item, while the remaining fields belong to the document item. Changing a document item's unit, price, or quantity never changes the catalogue product.

A custom item uses the same shape with `productId: null`. It has no catalogue dependency and its description, unit, quantity, and price are entered directly.

Saved legacy document items without a `productId` are normalized as custom items when loaded. Session calculations remain unchanged: line totals are quantity times unit price, and discount and tax are calculated at session level.
