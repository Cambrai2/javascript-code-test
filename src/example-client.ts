import { BookSearchApiClient } from "./book-search-api-client";

async function getBooks() {
  const bookClient = new BookSearchApiClient("json");

  try {
    const result = await bookClient.fetchByQuery(
      "by-author",
      "Stephen King",
      10
    );
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
