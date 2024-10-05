import REST_API from "@sergtyapkin/rest-api"
import validateModel from "@sergtyapkin/models-validator";
import * as Models from "~/models";

export default class MY_API extends REST_API {
    login = (email, password, clientBrowser, clientOS) => this.#post('/api/user/auth', {email, password, clientBrowser, clientOS}, Models.User);
    register = (name, group, telegram, vk, email, phone_number, password, clientBrowser, clientOS) => this.#post('/api/user', {name, group, telegram, vk, email, phone_number, password, clientBrowser, clientOS}, Models.User);
    logout = () => this.#delete('/api/user/session', {});
    getUser = () => ({
        data: {
            username: 'Василий',
        },
        status: 200,
        ok: true,
    }) //this.#get('/api/user', {_model: Models.User});
    getUserById = (id) => this.#get(`/api/user`, {id});
    sendConfirmationLetter = (name, email) => this.#post('/api/email/confirm', {name, email});
    confirmEmailByCode = (secretCode) => this.#put('/api/user/email/confirm', {secretCode});
    changePassword = (oldPassword, newPassword) => this.#put('/api/user/password', {oldPassword, newPassword});
    editProfile = (name, group, telegram, vk, email, phone_number) => this.#put('/api/user', {name, group, telegram, vk, email, phone_number});
    sendRestorePasswordLetter = (secretCode, newPassword) => this.#post('/api/user/password/restore', {secretCode, newPassword});
    restorePassword = (secretCode, newPassword) => this.#put('/api/user/password', {secretCode, newPassword});
    authCode = (secretCode, clientBrowser, clientOS) => this.#post('/api/user/auth/code', {secretCode, clientBrowser, clientOS});


    async modelParsedRequest(requestFunc, path, data, model = {}) {
        if (!data._model) {
            throw SyntaxError(`Model for request '${path}' not specified`);
        }
        data = Object.assign({}, data);
        const _model = data._model;
        delete data._model;
        const {ok, data: dataRes, status} = await requestFunc.bind(this)(path, data);
        if (!ok) {
            return {ok, data: dataRes, status};
        }
        return {ok, data: validateModel(_data, modelRes), status};
    }
    #post(path, data, model = {}) {return this.modelParsedRequest(super.post, path, data, model)}
    #get(path, data, model = {}) {return this.modelParsedRequest(super.get, path, data, model)}
    #put(path, data, model = {}) {return this.modelParsedRequest(super.put, path, data, model)}
    #delete(path, data, model = {}) {return this.modelParsedRequest(super.delete, path, data, model)}
}
