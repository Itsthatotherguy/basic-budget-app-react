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
import { BelongsTo, ModelDefinition, Registry } from "miragejs/-types";
import Schema from "miragejs/orm/schema";
import { Category, CategoryType } from "./models/category";
import { Transaction } from "./models/transaction";

const CategoryModel: ModelDefinition<Category> = Model.extend({});
const TransactionModel: ModelDefinition<Transaction> = Model.extend({});

type AppRegistry = Registry<
  {
    category: typeof CategoryModel;
    transaction: typeof TransactionModel;
  },
  {}
>;

type AppSchema = Schema<AppRegistry>;
//   interface CategoryResponse {
//     categories: Category[];
//   }

// export const fetchPeople = (url: string) =>
//   fetch(url).then<PeopleResponse>((r) => r.json());

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    serializers: {
      category: RestSerializer.extend({}),
    },

    factories: {},

    models: {
      category: CategoryModel,
      transaction: TransactionModel,
    },

    seeds(server) {
      server.create("category", {
        name: "Salary - Chris",
        type: CategoryType.Income,
      });
      server.create("category", {
        name: "Salary - Melanie",
        type: CategoryType.Income,
      });
      server.create("category", {
        name: "Domestic Wages",
        type: CategoryType.Expenses,
      });
      server.create("category", {
        name: "Mortgage",
        type: CategoryType.Expenses,
      });
    },

    routes() {
      this.passthrough("/_next/static/development/_devPagesManifest.json");

      this.get("/api/categories", (schema: AppSchema) => {
        const categories = schema.all("category");

        // return new Response(
        //   500,
        //   {},
        //   { error: { message: "INTERNAL_SERVER_EXCEPTION" } }
        // );

        return new Response(200, {}, categories);
      });

      this.post("/api/categories", (schema: AppSchema, request: Request) => {
        let attrs = JSON.parse(request.requestBody);

        const category = schema.create("category", attrs);

        return new Response(201, {}, category);
      });

      this.put("/api/categories/:id", (schema: AppSchema, request: Request) => {
        const id = request.params.id;
        const body = request.requestBody as Partial<Category>;

        schema.find("category", id)?.update({
          ...body,
        });

        return new Response(204);
      });

      this.delete(
        "/api/categories/:id",
        (schema: AppSchema, request: Request) => {
          const id = request.params.id;

          schema.find("category", id)?.destroy();

          return new Response(204);
        }
      );
    },
  });

  return server;
}
