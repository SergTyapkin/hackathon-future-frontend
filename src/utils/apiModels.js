const UserModel = { // declare model
  value: Number,
  userName: [String, String],
  sex: new Set(['male', 'female']),
  children: {
    type: Array,
    optional: true,
    item: {
      type: Object,
      fields: {
        name: String,
        age: Number,
      }
    }
  }
}
