import Address from "../../../@shared/domain/value-object/address"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice"
import InvoiceItems from "../../domain/invoiceItems";
import FindInvoiceUseCase from "./find-invoice.usecase";


const rawItems = [
  { id: "1", name: "Item 1", price: 100 },
  { id: "2", name: "Item 2", price: 150 },
];
const items = rawItems.map(item => new InvoiceItems({
  id: new Id(item.id),
  name: item.name,
  price: item.price
}));


const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "1234-5678",
  street: "Rua 123",
  number: "99",
  complement: "Casa Verde",
  city: "Criciúma",
  state: "SC",
  zipCode: "88888-888",
  items: items
})

const MockRepository = () => {

  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe("Find invoice use case unit test", () => {

  it("should find an invoice", async () => {

    const repository = MockRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const input = {
      id: "1"
    }

    const result = await usecase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toEqual(input.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.address.street).toEqual(invoice.street)
    expect(result.address.number).toEqual(invoice.number)
    expect(result.address.complement).toEqual(invoice.complement)
    expect(result.address.city).toEqual(invoice.city)
    expect(result.address.state).toEqual(invoice.state)
    expect(result.address.street).toEqual(invoice.street)
    expect(result.address.zipCode).toEqual(invoice.zipCode)
    expect(result.items.length).toEqual(2)
    expect(result.createdAt).toEqual(invoice.createdAt)
  })
})