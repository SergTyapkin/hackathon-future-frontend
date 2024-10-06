import REST_API from "@sergtyapkin/rest-api"
import validateModel from "@sergtyapkin/models-validator";
import * as Models from "~/utils/apiModels";

export default class MY_API extends REST_API {
    getUser = () => this.#get('/user', undefined, Models.User);
    editProfile = (first_name, mid_name, last_name, tags, email, phone, info) => this.#put('/user', {first_name, mid_name, last_name, tags, email, phone, info});
    editAvatar = (photo_url) => this.#put('/user', {photo_url});
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
    getProjectById = (id) => ({
        data: validateModel(Models.Project, {
            id: '50-611',
            title: 'Психологическая помощь после разбитого коммунизма',
            goals: 'Возродить мотивацию строить коммунизм',
            tags: ['Красный', 'Синий', 'Жёлтый'],
            region: 'Москва',
            url_for_preview: 'https://avatars.mds.yandex.net/i?id=e0346a13f890524fec12868dc172205f_l-7663003-images-thumbs&n=13',
            format: 'Очно',
            docs: ['https://localhost:5173/project/41-655asdasdasdasda/asd a/sd/a/sd /as/dasd', 'https://localhost:5173/']
        }),
        status: 200,
        ok: true,
    }) //this.#get(`/project/${id}`, undefined, Models.Project);
    editProject = (id, title, goals, tags, region, format, docs) => this.#put(`/project`, {id, title, goals, tags, region, format, docs});
    editProjectPreview = (id, url_for_preview) => this.#put(`/project`, {id, url_for_preview});

    getAllGosPrograms = () => ({
        data: validateModel(Models.GosProgramsList, {
            programs: [
                {
                    id: '41-655',
                    title: 'Твой ход',
                    info: ' Всероссийский студенческий проект от Росмолодёжь. Проект входит в президентскую платформу «Россия — страна возможностей»',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    link: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    preview_url: 'https://avatars.mds.yandex.net/i?id=93727e9dacfb0373cd6782b92341f2b6_l-9711399-images-thumbs&n=13',
                },
                {
                    id: '50-61',
                    title: 'Уничтожаем коммунизм',
                    info: 'Убить Ленина, Возродить мировую буржуазию',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    link: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    preview_url: 'https://avatars.mds.yandex.net/i?id=76f28736e27e47fb267124ecba089052db0f203d-12521952-images-thumbs&n=13',
                },
                {
                    id: '50-61',
                    title: 'Психоологическая помощь после разбитого коммунизма',
                    info: 'Возродить мотивацию строить коммунизм',
                    tags: ['Красный', 'Синий', 'Жёлтый'],
                    link: 'https://vkplay.ru/pre_0x736_resize/hotbox/content_files/news/2022/09/15/ad15ef8debf642bd84acd1486184a202.jpg?quality=85',
                    preview_url: 'https://avatars.mds.yandex.net/i?id=e0346a13f890524fec12868dc172205f_l-7663003-images-thumbs&n=13',
                },
            ]
        }),
        status: 200,
        ok: true,
    }) //this.#get('/gos-programs/all', undefined, Models.GosProgramsList);

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
