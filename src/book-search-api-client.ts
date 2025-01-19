import { parseString } from "xml2js";
import { Book, QueryPath, RemoteBook, ResponseType } from "./types/book";

export class BookSearchApiClient {
  format: ResponseType;
  baseApiUrl: string = "http://api.book-seller-example.com/";

  constructor(format: "xml" | "json") {
    this.format = format;
  }

  createApiCall(
    baseApiUrl: string,
    params: { key: string; value: string }[]
  ): URL {
    const url = new URL(baseApiUrl);
    params.map((param) => {
      url.searchParams.append(param.key, param.value);
    });
    url.searchParams.append("format", this.format);
    return url;
  }

  formatApiResponse(data: RemoteBook[] | string): Book[] {
    let books: Book[] = [];

    books = (data as RemoteBook[]).map((apiObject) => {
      return {
        title: apiObject.book.title,
        author: apiObject.book.author,
        isbn: Number(apiObject.book.isbn),
        quantity: Number(apiObject.stock.quantity),
        price: Number(apiObject.stock.price),
      };
    });

    return books;
  }

  async fetchByQuery(queryPath: QueryPath, inputParam: string, limit: number) {
    const queryPaths: QueryPath[] = ["by-author", "by-year"];
    if (!queryPaths.includes(queryPath)) {
      throw new Error(`Error: the queryPath: ${queryPath} is not supported`);
    }

    const requestUrl: string = `${this.baseApiUrl}${queryPath}`;

    const params: { key: string; value: string }[] = [];
    params.push({ key: "q", value: String(inputParam) });
    params.push({ key: "limit", value: String(limit) });

    const url = this.createApiCall(requestUrl, params);

    let responseData;

    try {
      const res: Response = await fetch(url);
      if (res.status != 200) {
        throw new Error(`error occured when fetching from ${url}`);
      }

      switch (this.format) {
        case "json":
          responseData = this.formatApiResponse(await res.json());
          break;
        case "xml":
          parseString(
            await res.text(),
            { explicitArray: false },
            (err: any, result: any) => {
              if (result!) {
                responseData = this.formatApiResponse(result["books"]["item"]);
              }
            }
          );
          if (!responseData) {
            throw new Error(`unable to parse xml response: ${responseData}`);
          }

          break;
        default:
          throw new Error(`the format: ${this.format} is not supported`);
          break;
      }
    } catch (e: any) {
      throw new Error(e);
    }
    return responseData;
  }
}
