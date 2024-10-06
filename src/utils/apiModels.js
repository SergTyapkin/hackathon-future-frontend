export const User = {
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
    type: new Set(['admin', 'activist', 'expert', 'partner']),
    optional: true,
  },
  bio: {
    type: String,
    from: 'info',
  },
}

export const Project = {
  id: String,
  title: String,
  goals: String,
  tags: {
    type: Array,
    item: String,
    optional: true,
    default: [],
  },
  region: String,
  previewUrl: {
    type: String,
    from: 'url_for_preview'
  },
  format: String,
}
