//enum based on provided formats, can be added to
export enum ApiResponseFormat {
  JSON,
  XML,
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
