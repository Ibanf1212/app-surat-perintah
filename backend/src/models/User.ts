export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: 'admin' | 'creator' | 'approver';
  nip?: string;
  position?: string;
  department?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  full_name: string;
  nip?: string;
  position?: string;
  department?: string;
  role?: 'creator' | 'approver';
}
