const HttpCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
}

const actionsTypes = {
  add: 'add',
  delete: 'delete',
  addComment: 'add comment',
  editDescription: 'edit description',
  move: 'move',
  rename: 'rename',
}

module.exports = {
  HttpCodes,
  actionsTypes,
}
