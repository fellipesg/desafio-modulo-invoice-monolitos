import request from 'supertest';
import app from '../src/app';
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../src/modules/client-adm/repository/client.model";
import ProductRegistrationModel from "../src/infrastructure/product-registration/product-registration.model"
import { migrator } from "../src/test-migrations/config-migrations/migrator";
import { Umzug } from 'umzug';
import ProductModel from '../src/modules/store-catalog/repository/product.model';
import {ProductModel as Alias} from '../src/modules/product-adm/repository/product.model';

describe('API Endpoints', () => {
    
    describe('POST /products', () => {

        it('should create a product successfully', async () => {
            const res = await request(app)
            .post('/products')
            .send({
                id: '1',
                name: 'Product 1',
                description: 'A sample product',
                purchasePrice: 100,
                stock: 50,
            });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id', '1');
            expect(res.body).toHaveProperty('name', 'Product 1');
            expect(res.body).toHaveProperty('description', 'A sample product');
            expect(res.body).toHaveProperty('purchasePrice', 100);
            expect(res.body).toHaveProperty('stock', 50);
        });
    });

    describe('POST /clients', () => {
        let sequelize: Sequelize;
    
        beforeEach(async () => {
            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
                sync: { force: true },
            });
    
            await sequelize.addModels([ClientModel]);
            await sequelize.sync();
        });
    
        afterEach(async () => {
            await sequelize.close();
        });
    
        it('should create a client successfully', async () => {
            const res = await request(app)
                .post('/clients')
                .send({
                    id: '1',
                    name: 'Client 1',
                    email: 'client1@example.com',
                    document: '12345678901',
                    address: {
                        street: '123 Main St',
                        number: '456',
                        complement: 'Apt 789',
                        city: 'Sample City',
                        state: 'SC',
                        zipCode: '12345-678',
                    }
                });
    
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id', '1');
            expect(res.body).toHaveProperty('name', 'Client 1');
            expect(res.body).toHaveProperty('email', 'client1@example.com');
            expect(res.body).toHaveProperty('document', '12345678901');
            expect(res.body).toHaveProperty('address');
            expect(res.body.address).toHaveProperty('_street', '123 Main St');
            expect(res.body.address).toHaveProperty('_number', '456');
            expect(res.body.address).toHaveProperty('_complement', 'Apt 789');
            expect(res.body.address).toHaveProperty('_city', 'Sample City');
            expect(res.body.address).toHaveProperty('_state', 'SC');
            expect(res.body.address).toHaveProperty('_zipCode', '12345-678');
        });
    });

    describe('POST /checkout', () => {
        let sequelize: Sequelize

        let migration: Umzug<any>;

        beforeEach(async () => {
            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: ":memory:",
                logging: false
            })
            
            sequelize.addModels([ProductModel, Alias])
            migration = migrator(sequelize)
            await migration.up()
        })

        afterEach(async () => {
            if (!migration || !sequelize) {
                return 
            }
            migration = migrator(sequelize)
            await migration.down()
            await sequelize.close()
        })
        it('should create a checkout', async () => {
            const client = await request(app)
            .post("/clients")
            .send({
                id: '1',
                name: 'Client 1',
                email: 'client1@example.com',
                document: '12345678901',
                address: {
                    street: '123 Main St',
                    number: '456',
                    complement: 'Apt 789',
                    city: 'Sample City',
                    state: 'SC',
                    zipCode: '12345-678',
                }
            }); 
            
            const product = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                description: "Description product 1",
                purchasePrice: 100,
                stock: 10
            });

            const product1 = await request(app)
            .post("/products")
            .send({
                name: "Product 2",
                description: "Description product 2",
                purchasePrice: 120,
                stock: 50
            });

            try {
                await ProductModel.create({
                    id: product.body.id,
                    name: product.body.name,
                    description: product.body.description,
                    salesPrice: 100,
                });
    
            
                await ProductModel.create({
                    id: product1.body.id,
                    name: product1.body.name,
                    description: product1.body.description,
                    salesPrice: 150,
                });
            }catch( err) {
                console.log(err);
            }
            
        
            const checkout = await request(app)
            .post("/checkout")
            .send({
                clientId: client.body.id,
                products: [
                {
                    productId: product.body.id,
                },
                {
                    productId: product1.body.id,
                }
                ]
            });

            expect(checkout.status).toBe(200);
            expect(checkout.body.products.length).toBe(2);
            expect(checkout.body.total).toBe(250);
            expect(checkout.body.status).toBe('approved');
        });
    });

});