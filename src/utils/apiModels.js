export const User = { // declare model
  id: String,
  firstName: {
    type: String,
    from: 'first_name',
  },
  midName: {
    type: String,
    from: 'mid_name',
  },
  lastName: {
    type: String,
    from: 'last_name',
  },
  interests: {
    type: Array,
    item: String,
    from: 'tags',
    optional: true,
    default: [],
  },
  photoUrl: {
    type: String,
    optional: true,
    from: 'photo_url',
  },
  email: String,
  phone: String,
  role: {
    type: new Set(['admin', 'activist', 'expert', 'parnter']),
    optional: true,
  },
  bio: {
    type: String,
    from: 'info',
  },
}
