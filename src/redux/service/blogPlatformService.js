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

  static getPost = async ({ slug, token }) => {
    return await this._serviceFetch(
      `articles/${slug}`,
      token && {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  };

  static _interactionWithPost =
    (method) =>
    // eslint-disable-next-line no-unused-vars
    async ({ changed, token, slug = '', cb }) => {
      await this._serviceFetch(`articles/${slug}`, {
        method,
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: changed }),
      });
    };

  static setPost = this._interactionWithPost('POST');
  static editPost = this._interactionWithPost('PUT');
  static deletePost = this._interactionWithPost('DELETE');

  static favoritePost = async ({ slug, token, method }) =>
    await this._serviceFetch(`articles/${slug}/favorite`, {
      method: method ? 'DELETE' : 'POST',
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

  static signIn = async ({ email, password }) =>
    await this._serviceFetch('users/login ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    });

  static getUser = async (token) =>
    await this._serviceFetch('user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

  static edit = async ({ token, changed }) => {
    return await this._serviceFetch('user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: changed }),
    });
  };
}
