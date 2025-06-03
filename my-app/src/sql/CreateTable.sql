-- Users table (use Supabase Auth for authentication, but you can extend with profile info)
create table users (
  id uuid primary key default uuid_generate_v4(),
  username text not null,
  email text not null unique
);

-- Budgets table
create table budgets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  max numeric not null,
  created_at timestamp with time zone default now()
);

-- Transactions table
create table transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  budget_id uuid references budgets(id) on delete set null,
  budget_name text not null,
  amount numeric not null,
  date date not null,
  description text,
  created_at timestamp with time zone default now()
);