import InvoiceItems from "../../domain/invoiceItems"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const MockRepository = () => {
  return {

    generate: jest.fn(),
    find: jest.fn()
  }
}

describe("Generate invoice use case unit test", () => {

  it("should generate an invoice", async () => {

    const repository = MockRepository()
    const usecase = new GenerateInvoiceUseCase(repository)
    const rawItems = [
      { id: "1", name: "Item 1", price: 100 },
      { id: "2", name: "Item 2", price: 150 },
    ];


    const input = {
      id: "1",
      name: "Invoice 1",
      document: "document",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipCode: "88888-888",
      items: rawItems,
    };

    const result =  await usecase.execute(input)

    expect(repository.generate).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.items.length).toEqual(2)
  })
})