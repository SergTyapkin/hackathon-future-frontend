export const Validators = {
  fullname: {
    regExp: /^(([а-я]+-)*[a-я]+) +(([а-я]+-)*[a-я]+)( +(([а-я]+-)*[a-я]+))?$/i,
    prettifyResult: (str) => str.trim().replaceAll(/ {2,}/g, ' '),
  },
  name: {
    regExp: /^([а-яa-z]+)(-[a-яa-z]+)*$/i,
    prettifyResult: (str) => str.trim().charAt(0).toUpperCase() + str.slice(1),
  },
  group: {
    regExp: /(^(иу|ибм|мт|см|бмт|рл|э|рк|фн|л|сгн|вуц|гуимц|уц|фмоп|фоф|исот|ркт|ак|пс|рт|лт|оэ|оэп)\d\d?и?-1\d[АМБамб]?$)|(^юр-1\d$)/i,
    prettifyResult: (str) => str.trim().toUpperCase(),
  },
  tg: {
    regExp: /^((https:\/\/)?(t\.me\/)|@)?\w{5,}$/i,
    prettifyResult:  (str) => str.trim().replace(/https:\/\//i, '').replace(/t\.me\//i, '').replace('@', ''),
  },
  vk: {
    regExp: /^(https:\/\/)?(vk\.com\/|@)?(\w+\.)*\w+$/i,
    prettifyResult: (str) => str.trim().replace(/https:\/\//i, '').replace(/vk\.com\//i, '').replace('@', ''),
  },
  email: {
    regExp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    prettifyResult: (str) => str.trim().toLowerCase(),
  },
  phone: {
    regExp: /^((\+7)|8)[-\s.]?((\(\d\d\d\))|(\d\d\d))[-\s.]?\d\d\d[-\s.]?\d\d[-\s.]?\d\d$/,
    prettifyResult: (str) => str.trim().replace('+7', '8').replace('-', '').replace('(', '').replace(')', ''),
  },
  password: {
    regExp: /^.{6,}$/i,
  },
  uuid4: {
    regExp: /^#?[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i,
    prettifyResult: (str) => str.trim().replace('#', '').toLowerCase(),
  },
  text: {
    regExp: /.*/i,
    prettifyResult: (str) => str.trim(),
  }
}
Object.entries(Validators).forEach(([name, validator]) => {
  validator.validate = (str) => !validator.regExp || validator.regExp.test(str.trim());
});


export function getValidatedAndPrettified(field, str) {
  if (!field.validate || field.validate(str)) {
    return field.prettifyResult ? field.prettifyResult(str) : str;
  }
  return null;
}
