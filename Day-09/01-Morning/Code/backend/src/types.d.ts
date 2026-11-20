// src/types.d.ts
declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }
  
  export {};