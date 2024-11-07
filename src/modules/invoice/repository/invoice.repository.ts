import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItems from "../domain/invoiceItems";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemsModel } from "./invoiceItem.model";

export default class InvoiceRepository implements InvoiceGateway {

  async generate(entity: Invoice): Promise<void> {

    await InvoiceModel.create({
      id: entity.id.id,
      name: entity.name,
      document: entity.document,
      street: entity.street,
      number: entity.number,
      complement: entity.complement,
      city: entity.city,
      state: entity.state,
      zipcode: entity.zipCode,
      items: entity.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    },
    {
      include: [InvoiceItemsModel],
    })
  }

  async find(id: string): Promise<Invoice> {

    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: [InvoiceItemsModel],
    });

    if (!invoice) {
      throw new Error("Invoice not found")
    }
    const items = invoice.items.map(item => new InvoiceItems({
      id: new Id(item.id),
      name: item.name,
      price: item.price
    }));
    
    return new Invoice({
      name: invoice.name,
      document: invoice.document,
      street: invoice.street,
      number: invoice.number,
      complement: invoice.complement,
      city: invoice.city,
      state: invoice.state,
      zipCode: invoice.zipcode,
      items: items,
      createdAt: invoice.createdAt,
      updatedAt: invoice.createdAt
    })
  }
}