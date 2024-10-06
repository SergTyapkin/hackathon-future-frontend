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
            photo_url: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
            role: 'activist',
            tags: ['IT', 'Фронтенд', 'Спорт', 'Музыка'],
            info: 'Светомузыкальный web-разработчик. Тгк: t.me/Serg_Self'
        }),
        status: 200,
        ok: true,
    }) //this.#get('/user/get', undefined, Models.User);
    editProfile = (first_name, mid_name, last_name, interests, email, phone, bio) => this.#put('/user', {first_name, mid_name, last_name, interests, email, phone, bio});
    editAvatar = (photo_url) => this.#put('/user/avatar', {photo_url});
    login = (email, password, client_browser, client_os) => this.#post('/auth', {email, password, client_browser, client_os});
    register = (first_name, mid_name, last_name, email, phone, password, client_browser, client_os) => this.#post('/auth/register', {first_name, mid_name, last_name, email, phone, password, client_browser, client_os});
    logout = () => this.#delete('/auth');

    getMyProjects = () => ({
        data: validateModel(Models.ProjectsList, {
            projects: [
                {
                    id: '41-655',
                    title: 'Строим коммунизм',
                    goals: 'Воскресить Ленина, Победить мировую буржуазию',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    region: 'Москва',
                    url_for_preview: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    format: 'Очно',
                },
                {
                    id: '50-61',
                    title: 'Уничтожаем коммунизм',
                    goals: 'Убить Ленина, Возродить мировую буржуазию',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    region: 'Москва',
                    url_for_preview: 'https://avatars.mds.yandex.net/i?id=76f28736e27e47fb267124ecba089052db0f203d-12521952-images-thumbs&n=13',
                    format: 'Очно',
                },
                {
                    id: '50-61',
                    title: 'Психоологическая помощь после разбитого коммунизма',
                    goals: 'Возродить мотивацию строить коммунизм',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    region: 'Москва',
                    url_for_preview: 'https://avatars.mds.yandex.net/i?id=e0346a13f890524fec12868dc172205f_l-7663003-images-thumbs&n=13',
                    format: 'Очно',
                },
            ]
        }),
        status: 200,
        ok: true,
    }) //this.#get('/project/my', undefined, Models.ProjectsList);
    getAllProjects = this.getMyProjects //() => this.#get('/project/all', undefined, Models.ProjectsList);

    getAllFeeds = () => ({
        data: validateModel(Models.FeedsList, {
            feeds: [
                {
                    id: '41-655',
                    title: 'Строим коммунизм',
                    contents: 'Цели этой работы могут быть достаточно многообразны. Достаточно вспомнить хотя бы опыт предыдущих лет, через который прошли многие именитые научные деятели, и тогда все сразу встает на свои места.',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    preview_url: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    author_id: '423-23',
                    author_name: 'Олег Петров',
                },
                {
                    id: '4231-655',
                    title: 'Рушим коммунизм',
                    contents: 'Цели этой работы могут быть достаточно многообразны. Достаточно вспомнить хотя бы опыт предыдущих лет, через который прошли многие именитые научные деятели, и тогда все сразу встает на свои места.',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    preview_url: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    author_id: '423-23',
                    author_name: 'Евгения Завалишина',
                },
                {
                    id: '41-6552',
                    title: 'Помогите он сломался',
                    contents: 'Цели этой работы могут быть достаточно многообразны. Достаточно вспомнить хотя бы опыт предыдущих лет, через который прошли многие именитые научные деятели, и тогда все сразу встает на свои места.',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    preview_url: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    author_id: '423-23',
                    author_name: 'Олег Иванов',
                },
                {
                    id: '41-6552',
                    title: 'Помогите он сломался',
                    contents: 'Цели этой работы могут быть достаточно многообразны. Достаточно вспомнить хотя бы опыт предыдущих лет, через который прошли многие именитые научные деятели, и тогда все сразу встает на свои места.',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    preview_url: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    author_id: '423-23',
                    author_name: 'Олег Иванов',
                },
                {
                    id: '41-6552',
                    title: 'Помогите он сломался',
                    contents: 'Цели этой работы могут быть достаточно многообразны. Достаточно вспомнить хотя бы опыт предыдущих лет, через который прошли многие именитые научные деятели, и тогда все сразу встает на свои места.',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    preview_url: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    author_id: '423-23',
                    author_name: 'Олег Иванов',
                },
                {
                    id: '41-6552',
                    title: 'Помогите он сломался',
                    contents: 'Цели этой работы могут быть достаточно многообразны. Достаточно вспомнить хотя бы опыт предыдущих лет, через который прошли многие именитые научные деятели, и тогда все сразу встает на свои места.',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    preview_url: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    author_id: '423-23',
                    author_name: 'Олег Иванов',
                },
                {
                    id: '41-6552',
                    title: 'Помогите он сломался',
                    contents: 'Цели этой работы могут быть достаточно многообразны. Достаточно вспомнить хотя бы опыт предыдущих лет, через который прошли многие именитые научные деятели, и тогда все сразу встает на свои места.',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    preview_url: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    author_id: '423-23',
                    author_name: 'Олег Иванов',
                },
            ]
        }),
        status: 200,
        ok: true,
    }) //this.#get(`/feed/all`, undefined, Models.FeedsList);

    getUserById = (id) => this.#get(`/user`, {id}, Models.User);
    sendConfirmationLetter = (name, email) => this.#post('/email/confirm', {name, email});
    confirmEmailByCode = (secretCode) => this.#put('/user/email/confirm', {secretCode});
    changePassword = (oldPassword, newPassword) => this.#put('/user/password', {oldPassword, newPassword});
    sendRestorePasswordLetter = (secretCode, newPassword) => this.#post('/user/password/restore', {secretCode, newPassword});
    restorePassword = (secretCode, newPassword) => this.#put('/user/password', {secretCode, newPassword});


    async modelParsedRequest(requestFunc, path, data, model = undefined) {
        const {ok, data: dataRes, status} = await requestFunc.bind(this)(path, data);
        if (!ok) {
            return {ok, data: dataRes, status};
        }
        if (!model) {
            return {ok, data: dataRes, status};
        }
        return {ok, data: validateModel(model, dataRes), status};
    }
    #post(path, data = {}, model = undefined) {return this.modelParsedRequest(super.post, path, data, model)}
    #get(path, data = {}, model = undefined) {return this.modelParsedRequest(super.get, path, data, model)}
    #put(path, data = {}, model = undefined) {return this.modelParsedRequest(super.put, path, data, model)}
    #delete(path, data = {}, model = undefined) {return this.modelParsedRequest(super.delete, path, data, model)}
}
