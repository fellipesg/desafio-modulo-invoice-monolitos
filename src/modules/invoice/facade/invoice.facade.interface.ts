import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.usecase.dto";


export interface FindInvoiceFacadeOutputDTO {
    id: string;
    name: string;
    document: string;
    address: {
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zipCode: string;
    };
    items: {
      id: string;
      name: string;
      price: number;
    }[];
    total: number;
    createdAt: Date;
  }
  
export default interface InvoiceFacadeInterface {
    create(
      invoice: GenerateInvoiceUseCaseInputDto
    ): Promise<GenerateInvoiceUseCaseOutputDto>;
    find(id: string): Promise<FindInvoiceFacadeOutputDTO>;
  }