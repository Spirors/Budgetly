create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Only insert if email is confirmed
  if new.email_confirmed_at is not null then
    insert into public.users (id, username, email)
    values (
      new.id,
      coalesce(new.raw_user_meta_data->>'username', ''),
      new.email
    )
    on conflict (id) do nothing;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_email_confirmed on auth.users;

create trigger on_email_confirmed
after update on auth.users
for each row
when (
  old.email_confirmed_at is null and
  new.email_confirmed_at is not null
)
execute procedure public.handle_new_user();