import { BookSearchApiClient } from "../book-search-api-client";
import { jsonResponse, xmlResponse } from "./book-search-api-client.mock";

describe("BookSearchApiClient", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getBooksByQuery", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(jsonResponse),
          text: () => Promise.resolve(xmlResponse),
        })
      ) as jest.Mock;
    });

    it("validate createApiCall function", async () => {
      const service = new BookSearchApiClient("json");

      const queryPath = "by-author";
      const result = await service.createApiCall(
        `http://api.book-seller-example.com/${queryPath}`,
        [
          { key: "q", value: "Stephen King" },
          { key: "limit", value: "10" },
        ]
      );

      expect(result.toString()).toBe(
        `http://api.book-seller-example.com/${queryPath}?q=Stephen+King&limit=10&format=json`
      );
    });

    it("validate JSON response", async () => {
      const service = new BookSearchApiClient("json");

      const res = await service.fetchByQuery("by-author", "Shakespear", 10);

      expect(res).toStrictEqual([
        {
          title: "The Shining",
          author: "Stephen King",
          isbn: 9780385121675,
          quantity: 756,
          price: 19.99,
        },
        {
          title: "The Stand",
          author: "Stephen King",
          isbn: 9780340951446,
          quantity: 22,
          price: 5.99,
        },
      ]);
    });

    it("validate xml conversion into response", async () => {
      const service = new BookSearchApiClient("xml");
      const res = await service.fetchByQuery("by-author", "Shakespear", 10);

      expect(res).toStrictEqual([
        {
          title: "The Shining",
          author: "Stephen King",
          isbn: 9780385121675,
          quantity: 756,
          price: 19.99,
        },
        {
          title: "The Stand",
          author: "Stephen King",
          isbn: 9780340951446,
          quantity: 22,
          price: 5.99,
        },
      ]);
    });
  });

  describe("Error Handling", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(null),
          text: () => Promise.resolve(null),
        })
      ) as jest.Mock;
    });

    it("validate null error handling", async () => {
      const service = new BookSearchApiClient("xml");

      try {
        await service.fetchByQuery("by-author", "This will fail", 10);
      } catch (error: any) {
        expect(error.message).toBe(
          "Error: unable to parse xml response: undefined"
        );
      }
    });

    it("validate incorrect format handling", async () => {
      const format = "erroneousFormat";
      // @ts-ignore
      const service = new BookSearchApiClient(format);

      try {
        await service.fetchByQuery("by-author", "Mark Twain", 10);
      } catch (error: any) {
        expect(error.message).toBe(
          `Error: the format: ${format} is not supported`
        );
      }
    });

    it("validate incorrect queryPath handling", async () => {
      const queryPath = "by-coAuthor";
      // @ts-ignore
      const service = new BookSearchApiClient("json");

      try {
        // @ts-ignore
        await service.fetchByQuery(queryPath, "Mark Twain", 10);
      } catch (error: any) {
        expect(error.message).toBe(
          `Error: the queryPath: ${queryPath} is not supported`
        );
      }
    });
  });
});
