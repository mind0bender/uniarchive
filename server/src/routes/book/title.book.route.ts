import { Request, Response } from "express";
import Book, { BookInterface } from "../../db/models/book.model";
import { z } from "zod";
import { ResponseType } from "../../utils/response.util";
import errorsFromZodIssue from "../../utils/validation.util/error.validation.util";
import { Document } from "mongoose";
import logger from "../../utils/logger.util/index.logger.util";

const findTitleBooksSchema: z.ZodObject<{
  filter: z.ZodOptional<
    z.ZodObject<{
      title: z.ZodOptional<z.ZodString>;
    }>
  >;
}> = z.object({
  filter: z
    .object({
      title: z.string().optional(),
    })
    .optional(),
});

export default function findTitleBooksRoute(
  req: Request,
  res: Response<
    ResponseType<{
      books: Omit<Omit<BookInterface, keyof Document>, "getAvailalbeCopies">[];
    }>
  >
): void {
  const { filter } = req.body;
  const { success, data, error } = findTitleBooksSchema.safeParse({ filter });
  if (!success) {
    res.json({ success: false, errors: errorsFromZodIssue(error) });
    return;
  }

  Book.find(
    data.filter
      ? {
          title: { $regex: new RegExp(data.filter.title || "", "i") },
        }
      : {}
  )
    .then((books: BookInterface[]): void => {
      res.json({
        success: true,
        data: {
          books: books.map(
            (
              book: BookInterface
            ): Omit<
              Omit<BookInterface, keyof Document>,
              "getAvailalbeCopies"
            > => ({
              title: book.title,
              authors: book.authors,
              genres: book.genres,
              rating: book.rating,
              summary: book.summary,
              coverImageUrl: book.coverImageUrl,
              copies: book.copies,
              isbn: book.isbn,
              pages: book.pages,
            })
          ),
        },
      });
      return;
    })
    .catch((error: Error): void => {
      res.json({ success: false, errors: [error.message] });
      return;
    });
}
