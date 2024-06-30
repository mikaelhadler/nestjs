import { http, HttpResponse } from 'msw'
 
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('http://localhost:3000/users', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      email: 'mk@example.com',
      password: '123',
    })
  }),
  // http.post('/posts', () => HttpResponse.json({
  //   id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
  //   name: 'John',
  //   lastName: 'Maverick',
  //   email: 'mk@example.com',
  //   password: '123',
  //   role: 'admin',
  //   created_at: new Date(),
  //   updated_at: new Date(),
  // })),
]