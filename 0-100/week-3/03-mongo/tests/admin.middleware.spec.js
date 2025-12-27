const adminMiddleware = require('../middleware/admin');
const { Admin } = require('../db/index');

// Mock the database
jest.mock('../db/index', () => ({
  Admin: {
    findOne: jest.fn()
  }
}));

describe('Admin Middleware', () => {
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
    it('should call next() when admin credentials are valid', async () => {
      req.headers.username = 'admin@test.com';
      req.headers.password = 'password123';
      
      Admin.findOne.mockResolvedValue({ 
        username: 'admin@test.com', 
        password: 'password123' 
      });

      await adminMiddleware(req, res, next);
      
      // Wait for promise to resolve
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(Admin.findOne).toHaveBeenCalledWith({
        username: 'admin@test.com',
        password: 'password123'
      });
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should handle case-sensitive username correctly', async () => {
      req.headers.username = 'Admin@Test.COM';
      req.headers.password = 'securePass';
      
      Admin.findOne.mockResolvedValue({ 
        username: 'Admin@Test.COM', 
        password: 'securePass' 
      });

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('Authentication Failure', () => {
    it('should return 403 when admin does not exist', async () => {
      req.headers.username = 'nonexistent@test.com';
      req.headers.password = 'wrongpassword';
      
      Admin.findOne.mockResolvedValue(null);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(Admin.findOne).toHaveBeenCalledWith({
        username: 'nonexistent@test.com',
        password: 'wrongpassword'
      });
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Admin doesn't exist"
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when password is incorrect', async () => {
      req.headers.username = 'admin@test.com';
      req.headers.password = 'wrongpassword';
      
      Admin.findOne.mockResolvedValue(null);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Admin doesn't exist"
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when username is missing', async () => {
      req.headers.password = 'password123';
      
      Admin.findOne.mockResolvedValue(null);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when password is missing', async () => {
      req.headers.username = 'admin@test.com';
      
      Admin.findOne.mockResolvedValue(null);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when both username and password are missing', async () => {
      Admin.findOne.mockResolvedValue(null);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string username', async () => {
      req.headers.username = '';
      req.headers.password = 'password123';
      
      Admin.findOne.mockResolvedValue(null);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle empty string password', async () => {
      req.headers.username = 'admin@test.com';
      req.headers.password = '';
      
      Admin.findOne.mockResolvedValue(null);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle special characters in password', async () => {
      req.headers.username = 'admin@test.com';
      req.headers.password = 'p@$$w0rd!#&';
      
      Admin.findOne.mockResolvedValue({ 
        username: 'admin@test.com', 
        password: 'p@$$w0rd!#&' 
      });

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(next).toHaveBeenCalled();
    });

    it('should handle very long username', async () => {
      const longUsername = 'a'.repeat(1000) + '@test.com';
      req.headers.username = longUsername;
      req.headers.password = 'password123';
      
      Admin.findOne.mockResolvedValue({ 
        username: longUsername, 
        password: 'password123' 
      });

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(next).toHaveBeenCalled();
    });

    it('should handle SQL injection attempts in username', async () => {
      req.headers.username = "admin' OR '1'='1";
      req.headers.password = 'password';
      
      Admin.findOne.mockResolvedValue(null);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Database Query', () => {
    it('should query database with correct parameters', async () => {
      req.headers.username = 'test@admin.com';
      req.headers.password = 'testpass';
      
      Admin.findOne.mockResolvedValue({ 
        username: 'test@admin.com', 
        password: 'testpass' 
      });

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(Admin.findOne).toHaveBeenCalledTimes(1);
      expect(Admin.findOne).toHaveBeenCalledWith({
        username: 'test@admin.com',
        password: 'testpass'
      });
    });

    it('should handle database returning undefined', async () => {
      req.headers.username = 'admin@test.com';
      req.headers.password = 'password123';
      
      Admin.findOne.mockResolvedValue(undefined);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle database returning false', async () => {
      req.headers.username = 'admin@test.com';
      req.headers.password = 'password123';
      
      Admin.findOne.mockResolvedValue(false);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle database returning 0', async () => {
      req.headers.username = 'admin@test.com';
      req.headers.password = 'password123';
      
      Admin.findOne.mockResolvedValue(0);

      await adminMiddleware(req, res, next);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });
  });
});