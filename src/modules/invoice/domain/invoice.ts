import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "./invoiceItems";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: InvoiceItems[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;
  private _items: InvoiceItems[];

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._street =  props.street;
    this._number =  props.number;
    this._complement =  props.complement;
    this._city =  props.city;
    this._state =  props.state;
    this._zipCode =  props.zipCode;
    this._items = props.items;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get items(): InvoiceItems[] {
    return this._items;
  }
  get street(): string {
    return this._street;
  }
  get number(): string {
    return this._number;
  }
  get complement(): string {
    return this._complement;
  }
  get city(): string {
    return this._city;
  }
  get state(): string {
    return this._state;
  }
  get zipCode(): string {
    return this._zipCode;
  }

}
