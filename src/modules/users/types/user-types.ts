export interface UsersGetDataTypes {
  full_name: any;
  data: [
    {
      created_by: null;
      full_name: string;
      id: string;
      logo: string;
      phone: string;
      role: { id: string; name: string };
      status: string;
    }
  ];
  total: number;
}
