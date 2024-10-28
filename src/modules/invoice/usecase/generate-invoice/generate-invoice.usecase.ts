import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoiceItems";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";


export default class GenerateInvoiceUseCase {

  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

    const items = input.items.map(item => new InvoiceItems({
      id: new Id(item.id),
      name: item.name,
      price: item.price
    }));

    const props = {
      id: new Id(),
      name: input.name,
      document: input.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      items: items
    }

    const invoice = new Invoice(props);
    await this._invoiceRepository.generate(invoice);
    return {
      id: props.id.id,
      name: props.name,
      document: props.document,
      street: props.street,
      number: props.number,
      complement: props.complement,
      city: props.city,
      state: props.state,
      zipCode: props.zipCode,
      items: input.items,
      total: items.reduce((sum, item) => sum + item.price, 0) 
    };
  }
}