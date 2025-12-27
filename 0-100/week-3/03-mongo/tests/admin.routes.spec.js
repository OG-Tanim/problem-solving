const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('../routes/admin');
const { Admin, Course } = require('../db/index');
const adminMiddleware = require('../middleware/admin');

// Mock the database and middleware
jest.mock('../db/index', () => ({
  Admin: {
    exists: jest.fn(),
    create: jest.fn()
  },
  Course: {
    create: jest.fn(),
    find: jest.fn()
  }
}));

jest.mock('../middleware/admin', () => jest.fn((req, res, next) => next()));

const app = express();
app.use(bodyParser.json());
app.use('/admin', adminRouter);

describe('Admin Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /admin/signup', () => {
    describe('Success Cases', () => {
      it('should create a new admin successfully', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({
          username: 'newadmin@test.com',
          password: 'password123'
        });

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: 'newadmin@test.com',
            password: 'password123'
          });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          msg: 'Admin created successfully'
        });
        expect(Admin.exists).toHaveBeenCalledWith({ username: 'newadmin@test.com' });
        expect(Admin.create).toHaveBeenCalledWith({
          username: 'newadmin@test.com',
          password: 'password123'
        });
      });

      it('should handle special characters in credentials', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({
          username: 'admin+special@test.com',
          password: 'p@$$w0rd!#'
        });

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: 'admin+special@test.com',
            password: 'p@$$w0rd!#'
          });

        expect(response.status).toBe(201);
        expect(response.body.msg).toBe('Admin created successfully');
      });

      it('should handle long passwords', async () => {
        const longPassword = 'a'.repeat(500);
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({
          username: 'admin@test.com',
          password: longPassword
        });

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: 'admin@test.com',
            password: longPassword
          });

        expect(response.status).toBe(201);
      });

      it('should handle unicode characters', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({
          username: 'ädmin@tëst.com',
          password: 'pässwörd'
        });

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: 'ädmin@tëst.com',
            password: 'pässwörd'
          });

        expect(response.status).toBe(201);
      });
    });

    describe('Failure Cases', () => {
      it('should return 403 when admin already exists', async () => {
        Admin.exists.mockResolvedValue(true);

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: 'existing@test.com',
            password: 'password123'
          });

        expect(response.status).toBe(403);
        expect(response.body).toEqual({
          msg: 'Admin already exists'
        });
        expect(Admin.create).not.toHaveBeenCalled();
      });

      it('should return 500 on database error during exists check', async () => {
        Admin.exists.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: 'admin@test.com',
            password: 'password123'
          });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
          msg: 'Internal server error'
        });
      });

      it('should return 500 on database error during create', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockRejectedValue(new Error('Create failed'));

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: 'admin@test.com',
            password: 'password123'
          });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
          msg: 'Internal server error'
        });
      });

      it('should handle missing username field', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({
          username: undefined,
          password: 'password123'
        });

        const response = await request(app)
          .post('/admin/signup')
          .send({
            password: 'password123'
          });

        expect(response.status).toBe(201);
      });

      it('should handle missing password field', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({
          username: 'admin@test.com',
          password: undefined
        });

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: 'admin@test.com'
          });

        expect(response.status).toBe(201);
      });

      it('should handle empty request body', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({});

        const response = await request(app)
          .post('/admin/signup')
          .send({});

        expect(response.status).toBe(201);
      });

      it('should handle null values', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({
          username: null,
          password: null
        });

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: null,
            password: null
          });

        expect(response.status).toBe(201);
      });
    });

    describe('Input Validation', () => {
      it('should handle empty string username', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({
          username: '',
          password: 'password123'
        });

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: '',
            password: 'password123'
          });

        expect(response.status).toBe(201);
      });

      it('should handle extra fields in request', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({
          username: 'admin@test.com',
          password: 'password123'
        });

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: 'admin@test.com',
            password: 'password123',
            extraField: 'should be ignored',
            anotherField: 123
          });

        expect(response.status).toBe(201);
        expect(Admin.create).toHaveBeenCalledWith({
          username: 'admin@test.com',
          password: 'password123'
        });
      });

      it('should handle SQL injection attempts', async () => {
        Admin.exists.mockResolvedValue(null);
        Admin.create.mockResolvedValue({
          username: "admin' OR '1'='1",
          password: 'password'
        });

        const response = await request(app)
          .post('/admin/signup')
          .send({
            username: "admin' OR '1'='1",
            password: 'password'
          });

        expect(response.status).toBe(201);
      });
    });
  });

  describe('POST /admin/courses', () => {
    describe('Success Cases', () => {
      it('should create a new course successfully', async () => {
        const mockCourse = {
          _id: '507f1f77bcf86cd799439011',
          title: 'Test Course',
          description: 'Test Description',
          price: 99.99,
          imageLink: 'https://example.com/image.jpg'
        };

        Course.create.mockResolvedValue(mockCourse);

        const response = await request(app)
          .post('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123')
          .send({
            title: 'Test Course',
            description: 'Test Description',
            price: 99.99,
            imageLink: 'https://example.com/image.jpg'
          });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          msg: 'Course created successfully',
          courseId: '507f1f77bcf86cd799439011'
        });
        expect(adminMiddleware).toHaveBeenCalled();
      });

      it('should create course with minimal fields', async () => {
        const mockCourse = {
          _id: '123456',
          title: 'Course',
          description: 'Desc',
          price: 0,
          imageLink: ''
        };

        Course.create.mockResolvedValue(mockCourse);

        const response = await request(app)
          .post('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123')
          .send({
            title: 'Course',
            description: 'Desc',
            price: 0,
            imageLink: ''
          });

        expect(response.status).toBe(201);
        expect(response.body.courseId).toBe('123456');
      });

      it('should handle large price values', async () => {
        const mockCourse = {
          _id: 'abc123',
          title: 'Expensive Course',
          description: 'Premium content',
          price: 999999.99,
          imageLink: 'https://example.com/premium.jpg'
        };

        Course.create.mockResolvedValue(mockCourse);

        const response = await request(app)
          .post('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123')
          .send({
            title: 'Expensive Course',
            description: 'Premium content',
            price: 999999.99,
            imageLink: 'https://example.com/premium.jpg'
          });

        expect(response.status).toBe(201);
      });

      it('should handle negative price values', async () => {
        const mockCourse = {
          _id: 'neg123',
          title: 'Free Course',
          description: 'Free content',
          price: -10,
          imageLink: 'https://example.com/free.jpg'
        };

        Course.create.mockResolvedValue(mockCourse);

        const response = await request(app)
          .post('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123')
          .send({
            title: 'Free Course',
            description: 'Free content',
            price: -10,
            imageLink: 'https://example.com/free.jpg'
          });

        expect(response.status).toBe(201);
      });

      it('should handle very long descriptions', async () => {
        const longDesc = 'A'.repeat(10000);
        const mockCourse = {
          _id: 'long123',
          title: 'Long Course',
          description: longDesc,
          price: 50,
          imageLink: 'https://example.com/img.jpg'
        };

        Course.create.mockResolvedValue(mockCourse);

        const response = await request(app)
          .post('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123')
          .send({
            title: 'Long Course',
            description: longDesc,
            price: 50,
            imageLink: 'https://example.com/img.jpg'
          });

        expect(response.status).toBe(201);
      });

      it('should handle special characters in title', async () => {
        const mockCourse = {
          _id: 'spec123',
          title: 'C++ & C# Programming: <Advanced>',
          description: 'Learn programming',
          price: 75,
          imageLink: 'https://example.com/prog.jpg'
        };

        Course.create.mockResolvedValue(mockCourse);

        const response = await request(app)
          .post('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123')
          .send({
            title: 'C++ & C# Programming: <Advanced>',
            description: 'Learn programming',
            price: 75,
            imageLink: 'https://example.com/prog.jpg'
          });

        expect(response.status).toBe(201);
      });
    });

    describe('Failure Cases', () => {
      it('should return 500 on database error', async () => {
        Course.create.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
          .post('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123')
          .send({
            title: 'Test Course',
            description: 'Test Description',
            price: 99.99,
            imageLink: 'https://example.com/image.jpg'
          });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
          msg: 'Internal server error'
        });
      });

      it('should handle missing required fields', async () => {
        const mockCourse = {
          _id: 'partial123'
        };

        Course.create.mockResolvedValue(mockCourse);

        const response = await request(app)
          .post('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123')
          .send({});

        expect(response.status).toBe(201);
      });

      it('should handle null values in course data', async () => {
        const mockCourse = {
          _id: 'null123',
          title: null,
          description: null,
          price: null,
          imageLink: null
        };

        Course.create.mockResolvedValue(mockCourse);

        const response = await request(app)
          .post('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123')
          .send({
            title: null,
            description: null,
            price: null,
            imageLink: null
          });

        expect(response.status).toBe(201);
      });
    });
  });

  describe('GET /admin/courses', () => {
    describe('Success Cases', () => {
      it('should return all courses', async () => {
        const mockCourses = [
          {
            _id: '1',
            title: 'Course 1',
            description: 'Description 1',
            price: 50,
            imageLink: 'https://example.com/1.jpg',
            published: true
          },
          {
            _id: '2',
            title: 'Course 2',
            description: 'Description 2',
            price: 75,
            imageLink: 'https://example.com/2.jpg',
            published: true
          }
        ];

        Course.find.mockResolvedValue(mockCourses);

        const response = await request(app)
          .get('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          courses: mockCourses
        });
        expect(Course.find).toHaveBeenCalledWith({});
        expect(adminMiddleware).toHaveBeenCalled();
      });

      it('should return empty array when no courses exist', async () => {
        Course.find.mockResolvedValue([]);

        const response = await request(app)
          .get('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          courses: []
        });
      });

      it('should return large number of courses', async () => {
        const mockCourses = Array(1000).fill(null).map((_, i) => ({
          _id: `id${i}`,
          title: `Course ${i}`,
          description: `Description ${i}`,
          price: i * 10,
          imageLink: `https://example.com/${i}.jpg`
        }));

        Course.find.mockResolvedValue(mockCourses);

        const response = await request(app)
          .get('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123');

        expect(response.status).toBe(200);
        expect(response.body.courses.length).toBe(1000);
      });

      it('should handle courses with special characters', async () => {
        const mockCourses = [
          {
            _id: 'special1',
            title: 'C++ & JavaScript: <Advanced> "Programming"',
            description: "Learn 'coding' & \"development\"",
            price: 99.99,
            imageLink: 'https://example.com/special?param=value&other=123'
          }
        ];

        Course.find.mockResolvedValue(mockCourses);

        const response = await request(app)
          .get('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123');

        expect(response.status).toBe(200);
        expect(response.body.courses[0].title).toContain('C++');
      });

      it('should return courses with various published states', async () => {
        const mockCourses = [
          { _id: '1', title: 'Published', published: true },
          { _id: '2', title: 'Unpublished', published: false },
          { _id: '3', title: 'No state' }
        ];

        Course.find.mockResolvedValue(mockCourses);

        const response = await request(app)
          .get('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123');

        expect(response.status).toBe(200);
        expect(response.body.courses).toHaveLength(3);
      });
    });

    describe('Failure Cases', () => {
      it('should return 500 on database error', async () => {
        Course.find.mockRejectedValue(new Error('Database connection failed'));

        const response = await request(app)
          .get('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
          msg: 'Internal server error'
        });
      });

      it('should handle database timeout', async () => {
        Course.find.mockRejectedValue(new Error('Timeout'));

        const response = await request(app)
          .get('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123');

        expect(response.status).toBe(500);
      });

      it('should handle null result from database', async () => {
        Course.find.mockResolvedValue(null);

        const response = await request(app)
          .get('/admin/courses')
          .set('username', 'admin@test.com')
          .set('password', 'password123');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          courses: null
        });
      });
    });
  });
});