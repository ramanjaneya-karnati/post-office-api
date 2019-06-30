import { PostOffice } from '../postoffice.model'

describe('Post office model', () => {
  describe('schema', () => {
    test('post office name', () => {
      const name = PostOffice.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50
      })
    })

    test('post office zipcode', () => {
      const zipcode = PostOffice.schema.obj.zipcode
      expect(zipcode).toEqual({
        type: Number,
        required: true,
        trim: true,
        maxlength: 50
      })
    })
  })
})
