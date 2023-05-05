| method | endpoint | body | response | action |
| --- | --- | --- | --- | --- |
| POST | /books | { book } | { book } | cria um livro no banco de dados |
| GET | /books | -/- | [{ book }] | lista de livros |
| GET | /books/:bookId | -/- | { book } | devolve um livro |
| PUT | /books/:bookId | { book } | { book } | atualiza um livro no banco de dados |
| DELETE | /books/:bookId | -/- | message | remove um livro do banco de dados |
