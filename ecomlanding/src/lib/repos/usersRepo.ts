// lib/repos/usersRepo.ts
export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  active: boolean;
};

let _users: UserRow[] = [
  { id: "1", name: "Admin", email: "admin@example.com", role: "admin", active: true },
  { id: "2", name: "Demo User", email: "user@example.com", role: "user", active: true },
];

export const usersRepo = {
  async list() { return [..._users]; },
  async setRole(id: string, role: "user" | "admin") {
    _users = _users.map((u) => (u.id === id ? { ...u, role } : u));
  },
  async toggleActive(id: string) {
    _users = _users.map((u) => (u.id === id ? { ...u, active: !u.active } : u));
  },
};
