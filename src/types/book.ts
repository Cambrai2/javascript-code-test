export type ResponseType = "json" | "xml";

export type QueryPath = "by-author" | "by-year";

// Allows the easy change of an api as its responseType is stored with its url
export interface ApiRoute {
  url: string;
  responseType: ResponseType;
}

export interface Book {
  title: string;
  author: string;
  isbn: number;
  quantity: number;
  price: number;
}

// Assumed api Response structure given the provided mapping.
export interface RemoteBook {
  book: {
    title: string;
    author: string;
    isbn: number;
  };
  stock: {
    quantity: number;
    price: number;
  };
}
