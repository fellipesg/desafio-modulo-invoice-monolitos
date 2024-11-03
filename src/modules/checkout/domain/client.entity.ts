import { AggregateError } from "sequelize";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Address from "../../@shared/domain/value-object/address";

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    address: Address;
}


export default class Client extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _email: string;
    private _address: Address;

    constructor(props: ClientProps) {
        super(props.id);
        this._name = props.name;
        this._email = props.email;
        this._address = props.address;
    }

    get name(): string {
        return this._name;
    }
    get email(): string {
        return this._email;
    }
    get address(): Address {
        return this._address;
    }
}