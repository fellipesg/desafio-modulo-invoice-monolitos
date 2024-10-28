
import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoiceItems";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase {

  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {

    const result = await this._invoiceRepository.find(input.id);
    const items = result.items.map(item => ({
      id: item.id.id, 
      name: item.name,
      price: item.price,
    }));

    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      address: new Address(
        result.street,
        result.number,
        result.complement,
        result.city,
        result.state,
        result.zipCode,
      ),
      items: items,
      createdAt: result.createdAt,
      total: items.reduce((sum, item) => sum + item.price, 0) 
    }
  }
}