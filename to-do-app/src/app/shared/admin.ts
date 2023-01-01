export interface Admin {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  admin_token: string;
  is_admin: boolean;
}
