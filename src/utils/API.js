import REST_API from "@sergtyapkin/rest-api"
import validateModel from "@sergtyapkin/models-validator";
import * as Models from "~/models";

export default class MY_API extends REST_API {
    login = (email, password, clientBrowser, clientOS) => this.post('/api/user/auth', {_model: Models.User, email, password, clientBrowser, clientOS});
    register = (name, group, telegram, vk, email, phone_number, password, clientBrowser, clientOS) => this.post('/api/user', {_model: Models.User, name, group, telegram, vk, email, phone_number, password, clientBrowser, clientOS});
    logout = () => this.delete('/api/user/session', {_model: {}});
    getUser = () => ({
        data: {
            username: 'Василий',
        },
        status: 200,
        ok: true,
    }) //this.get('/api/user', {_model: Models.User});
    getUserById = (id) => this.get(`/api/user`, {_model: Models.User, id});
    sendConfirmationLetter = (name, email) => this.post('/api/email/confirm', {_model: Models.User, name, email});
    confirmEmailByCode = (secretCode) => this.put('/api/user/email/confirm', {_model: Models.User, secretCode});
    changePassword = (oldPassword, newPassword) => this.put('/api/user/password', {_model: Models.User, oldPassword, newPassword});
    editProfile = (name, group, telegram, vk, email, phone_number) => this.put('/api/user', {_model: Models.User, name, group, telegram, vk, email, phone_number});
    sendRestorePasswordLetter = (secretCode, newPassword) => this.post('/api/user/password/restore', {_model: Models.User, secretCode, newPassword});
    restorePassword = (secretCode, newPassword) => this.put('/api/user/password', {_model: Models.User, secretCode, newPassword});
    authCode = (secretCode, clientBrowser, clientOS) => this.post('/api/user/auth/code', {_model: Models.User, secretCode, clientBrowser, clientOS});


    async modelParsedRequest(requestFunc, path, data = {}) {
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
        return {ok, data: validateModel(_model, dataRes), status};
    }
    post(path, data = {}) {return this.modelParsedRequest(super.post, path, data)}
    get(path, data = {}) {return this.modelParsedRequest(super.get, path, data)}
    put(path, data = {}) {return this.modelParsedRequest(super.put, path, data)}
    delete(path, data = {}) {return this.modelParsedRequest(super.delete, path, data)}
}
