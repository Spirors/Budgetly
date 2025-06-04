-- Budgets table
create policy "Enable all access for authenticated users"
on "public"."budgets"
as permissive
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Transactions table
create policy "Enable all access for authenticated users"
on "public"."transactions"
as permissive
for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());