module.exports = function AuthError(
  message = 'Este recurso não pertence ao usuário',
) {
  this.name = 'AuthError';
  this.message = message;
};
