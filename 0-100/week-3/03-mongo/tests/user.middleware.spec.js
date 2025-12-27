const userMiddleware = require('../middleware/user');
const { User } = require('../db/index');

// Mock the database
jest.mock('../db/index', () => ({
  User: {
    findOne: jest.fn()
  }
}));

describe('User Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('Authentication Success', () => {
    it('should call next() when user credentials are valid', async () => {
      req.headers.username = 'user@test.com';
      req.headers.password = 'password123';
      
      User.findOne.mockResolvedValue({ 
        username: 'user@test.com', 
        password: 'password123',
        courses: []
      });

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(User.findOne).toHaveBeenCalledWith({
        username: 'user@test.com',
        password: 'password123'
      });
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should authenticate user with purchased courses', async () => {
      req.headers.username = 'user@test.com';
      req.headers.password = 'password123';
      
      User.findOne.mockResolvedValue({ 
        username: 'user@test.com', 
        password: 'password123',
        courses: ['course1', 'course2']
      });

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(next).toHaveBeenCalled();
    });

    it('should handle unicode characters in username', async () => {
      req.headers.username = 'üser@tëst.com';
      req.headers.password = 'pässwörd';
      
      User.findOne.mockResolvedValue({ 
        username: 'üser@tëst.com', 
        password: 'pässwörd',
        courses: []
      });

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(next).toHaveBeenCalled();
    });
  });

  describe('Authentication Failure', () => {
    it('should return 403 when user does not exist', async () => {
      req.headers.username = 'nonexistent@test.com';
      req.headers.password = 'wrongpassword';
      
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(User.findOne).toHaveBeenCalledWith({
        username: 'nonexistent@test.com',
        password: 'wrongpassword'
      });
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        msg: "User doesn't exist"
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when password is incorrect', async () => {
      req.headers.username = 'user@test.com';
      req.headers.password = 'wrongpassword';
      
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        msg: "User doesn't exist"
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when username header is missing', async () => {
      req.headers.password = 'password123';
      
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when password header is missing', async () => {
      req.headers.username = 'user@test.com';
      
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when both headers are missing', async () => {
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle whitespace-only username', async () => {
      req.headers.username = '   ';
      req.headers.password = 'password123';
      
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle whitespace-only password', async () => {
      req.headers.username = 'user@test.com';
      req.headers.password = '   ';
      
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle numeric username', async () => {
      req.headers.username = '12345';
      req.headers.password = 'password123';
      
      User.findOne.mockResolvedValue({ 
        username: '12345', 
        password: 'password123',
        courses: []
      });

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(next).toHaveBeenCalled();
    });

    it('should handle very long password', async () => {
      const longPassword = 'p'.repeat(10000);
      req.headers.username = 'user@test.com';
      req.headers.password = longPassword;
      
      User.findOne.mockResolvedValue({ 
        username: 'user@test.com', 
        password: longPassword,
        courses: []
      });

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(next).toHaveBeenCalled();
    });

    it('should handle NoSQL injection attempts', async () => {
      req.headers.username = '{"$ne": null}';
      req.headers.password = '{"$ne": null}';
      
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle null-byte injection', async () => {
      req.headers.username = 'user@test.com\0admin';
      req.headers.password = 'password123';
      
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
    });
  });

  describe('Database Query Validation', () => {
    it('should call findOne with exact parameters', async () => {
      req.headers.username = 'exact@user.com';
      req.headers.password = 'exactpass';
      
      User.findOne.mockResolvedValue({ 
        username: 'exact@user.com', 
        password: 'exactpass',
        courses: []
      });

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith({
        username: 'exact@user.com',
        password: 'exactpass'
      });
    });

    it('should handle database returning empty object', async () => {
      req.headers.username = 'user@test.com';
      req.headers.password = 'password123';
      
      User.findOne.mockResolvedValue({});

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(next).toHaveBeenCalled();
    });

    it('should handle database returning minimal valid user', async () => {
      req.headers.username = 'user@test.com';
      req.headers.password = 'password123';
      
      User.findOne.mockResolvedValue({ 
        username: 'user@test.com'
      });

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(next).toHaveBeenCalled();
    });
  });

  describe('Response Format', () => {
    it('should return proper JSON format on failure', async () => {
      req.headers.username = 'user@test.com';
      req.headers.password = 'wrongpass';
      
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          msg: expect.any(String)
        })
      );
    });

    it('should use exact error message format', async () => {
      req.headers.username = 'user@test.com';
      req.headers.password = 'wrongpass';
      
      User.findOne.mockResolvedValue(null);

      await userMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const callArgs = res.json.mock.calls[0][0];
      expect(callArgs.msg).toBe("User doesn't exist");
    });
  });
});