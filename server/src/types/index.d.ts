interface UserPayLoad {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  isDeleted: Boolean;
}

export declare global {
  namespace Express {
    interface Request {
      user: UserPayLoad;
    }
  }
}
