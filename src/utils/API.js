import REST_API from "@sergtyapkin/rest-api"
import validateModel from "@sergtyapkin/models-validator";
import * as Models from "~/utils/apiModels";

export default class MY_API extends REST_API {
    getUser = () => ({
        data: validateModel(Models.User, {
            id: '418-05',
            first_name: 'Тяпкин',
            mid_name: 'Сергей',
            last_name: 'Сергеевич',
            email: 'tapkin2002@mail.ru',
            phone: '8-916-093-28-60',
            photo_url: '',
            role: 'activist',
            tags: ['IT', 'Фронтенд', 'Спорт', 'Музыка'],
            info: 'Светомузыкальный web-разработчик. Тгк: t.me/Serg_Self'
        }),
        status: 200,
        ok: true,
    }) //this.#get('/user', {_model: Models.User});
    editProfile = (first_name, mid_name, last_name, interests, email, phone, bio) => this.#put('/user', {first_name, mid_name, last_name, interests, email, phone, bio});
    editAvatar = (photo_url) => this.#put('/user/avatar', {photo_url});
    login = (email, password, client_browser, client_os) => this.#post('/auth', {email, password, client_browser, client_os}, Models.User);
    register = (first_name, mid_name, last_name, email, phone, password, client_browser, client_os) => this.#post('/auth/register', {first_name, mid_name, last_name, email, phone, password, client_browser, client_os}, Models.User);
    logout = () => this.#delete('/auth');

    getUserById = (id) => this.#get(`/user`, {id});
    sendConfirmationLetter = (name, email) => this.#post('/email/confirm', {name, email});
    confirmEmailByCode = (secretCode) => this.#put('/user/email/confirm', {secretCode});
    changePassword = (oldPassword, newPassword) => this.#put('/user/password', {oldPassword, newPassword});
    sendRestorePasswordLetter = (secretCode, newPassword) => this.#post('/user/password/restore', {secretCode, newPassword});
    restorePassword = (secretCode, newPassword) => this.#put('/user/password', {secretCode, newPassword});


    async modelParsedRequest(requestFunc, path, data, model = {}) {
        const {ok, data: dataRes, status} = await requestFunc.bind(this)(path, data);
        if (!ok) {
            return {ok, data: dataRes, status};
        }
        return {ok, data: validateModel(dataRes, model), status};
    }
    #post(path, data = {}, model = {}) {return this.modelParsedRequest(super.post, path, data, model)}
    #get(path, data = {}, model = {}) {return this.modelParsedRequest(super.get, path, data, model)}
    #put(path, data = {}, model = {}) {return this.modelParsedRequest(super.put, path, data, model)}
    #delete(path, data = {}, model = {}) {return this.modelParsedRequest(super.delete, path, data, model)}
}
