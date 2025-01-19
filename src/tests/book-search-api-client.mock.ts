import { RemoteBook } from "../types/book";

export const jsonResponse: RemoteBook[] = [
  {
    book: {
      title: "The Shining",
      author: "Stephen King",
      isbn: 9780385121675,
    },
    stock: {
      quantity: 756,
      price: 19.99,
    },
  },
  {
    book: {
      title: "The Stand",
      author: "Stephen King",
      isbn: 9780340951446,
    },
    stock: {
      quantity: 22,
      price: 5.99,
    },
  },
];

export const xmlResponse: string = `<books><item><book><author>Stephen King</author><isbn>9780385121675</isbn><title>The Shining</title></book><stock><price>19.99</price><quantity>756</quantity></stock></item><item><book><author>Stephen King</author><isbn>9780340951446</isbn><title>The Stand</title></book><stock><price>5.99</price><quantity>22</quantity></stock></item></books>`;
