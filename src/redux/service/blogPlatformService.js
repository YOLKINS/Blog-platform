/* eslint-disable indent */
export default class BlogPlatformService {
  static _serviceFetch = async (url, options) => {
    const response = await fetch(`https://blog.kata.academy/api/${url}`, options);
    return response;
  };

  static getPostsList = async (page = 1, token) =>
    await this._serviceFetch(
      `articles?limit=5&offset=${0 + (page - 1) * 5}`,
      token && {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

  static getPost = async (slug, token) =>
    await this._serviceFetch(
      `articles/${slug}`,
      token && {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

  static _interactionWithArticle =
    (method) =>
    async ({ data, token, slug = '' }) =>
      await this._serviceFetch(`articles/${slug}`, {
        method,
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: data }),
      });

  static postArticle = this._interactionWithArticle('POST');
  static editeArticle = this._interactionWithArticle('PUT');
  static deleteArticle = this._interactionWithArticle('DELETE');

  static favoriteArticle = async (slug, token, favorite) =>
    await this._serviceFetch(`articles/${slug}/favorite`, {
      method: favorite ? 'DELETE' : 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

  static signUp = async (user) =>
    await this._serviceFetch('users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: user }),
    });

  static signIn = async (user) =>
    await this._serviceFetch('users/login ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: user }),
    });

  static getUserData = async (token) =>
    await this._serviceFetch('user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

  static updateUserData = async ({ token, user }) =>
    await this._serviceFetch('user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: user }),
    });
}
