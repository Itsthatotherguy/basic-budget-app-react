// @ts-nocheck
import {
  belongsTo,
  createServer,
  Factory,
  hasMany,
  Model,
  Request,
  Response,
  RestSerializer,
} from "miragejs";
import { ModelDefinition, Registry } from "miragejs/-types";
import Schema from "miragejs/orm/schema";
import { Category, CategoryType } from "../../features/categories/store/models";
import { TransactionEntity } from "../../features/transactions/store/models";
import faker from "faker";

const CategoryModel: ModelDefinition<Category> = Model.extend({
  transactions: hasMany(),
});
const TransactionModel: ModelDefinition<TransactionEntity> = Model.extend({
  category: belongsTo(),
});

type AppRegistry = Registry<
  {
    category: typeof CategoryModel;
    transaction: typeof TransactionModel;
  },
  {}
>;

type AppSchema = Schema<AppRegistry>;

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    // environment,
    // serializers: {
    //   category: RestSerializer.extend({}),
    //   transaction: RestSerializer.extend({
    //     include: ["category"],
    //     embed: true,
    //   }),
    // },
    // factories: {
    //   category: Factory.extend({
    //     name() {
    //       return faker.commerce.department();
    //     },
    //     type() {
    //       return Math.round(Math.random()) === 0
    //         ? CategoryType.Income
    //         : CategoryType.Expenses;
    //     },
    //   }),
    //   transaction: Factory.extend({
    //     date() {
    //       return faker.date.recent();
    //     },
    //     description() {
    //       return faker.random.words(3);
    //     },
    //     amount() {
    //       return faker.datatype.float(10000);
    //     },
    //   }),
    // },
    // models: {
    //   category: CategoryModel,
    //   transaction: TransactionModel,
    // },
    // seeds(server) {
    //   server.createList("category", 5).forEach((category) => {
    //     server.createList("transaction", 10, { category });
    //   });
    // },
    // routes() {
    //   this.get("/api/categories", (schema: AppSchema) => {
    //     const categories = schema.all("category");
    //     // return new Response(
    //     //   500,
    //     //   {},
    //     //   { error: { message: "INTERNAL_SERVER_EXCEPTION" } }
    //     // );
    //     return new Response(200, {}, categories);
    //   });
    //   this.post("/api/categories", (schema: AppSchema, request: Request) => {
    //     let attrs = JSON.parse(request.requestBody);
    //     const category = schema.create("category", attrs);
    //     return new Response(201, {}, category);
    //   });
    //   this.put("/api/categories/:id", (schema: AppSchema, request: Request) => {
    //     const id = request.params.id;
    //     const body = request.requestBody as Partial<Category>;
    //     schema.find("category", id)?.update({
    //       ...body,
    //     });
    //     return new Response(201, {}, { id });
    //   });
    //   this.delete(
    //     "/api/categories/:id",
    //     (schema: AppSchema, request: Request) => {
    //       const id = request.params.id;
    //       schema.find("category", id)?.destroy();
    //       return new Response(201, {}, { id });
    //     }
    //   );
    //   this.get("/api/transactions", (schema: AppSchema) => {
    //     const transactions = schema.all("transaction");
    //     console.log(transactions);
    //     return new Response(200, {}, transactions);
    //   });
    //   this.post("/api/transactions", (schema: AppSchema, request: Request) => {
    //     let attrs = JSON.parse(request.requestBody);
    //     attrs.category = schema.find("category", attrs.category);
    //     const transaction = schema.create("transaction", attrs);
    //     return new Response(201, {}, transaction);
    //   });
    //   this.delete(
    //     "/api/transactions/:id",
    //     (schema: AppSchema, request: Request) => {
    //       const id = request.params.id;
    //       schema.find("transaction", id)?.destroy();
    //       return new Response(201, {}, { id });
    //     }
    //   );
    //   this.put(
    //     "/api/transactions/:id",
    //     (schema: AppSchema, request: Request) => {
    //       const id = request.params.id;
    //       const body = request.requestBody as Partial<Category>;
    //       schema.find("transaction", id)?.update({
    //         ...body,
    //       });
    //       return new Response(204, {}, {});
    //     }
    //   );
    // },
  });

  return server;
}
