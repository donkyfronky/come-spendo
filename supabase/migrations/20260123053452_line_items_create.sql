CREATE TABLE line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
   out boolean not null default true,
  quantity NUMERIC(10,2) NOT NULL DEFAULT 1,
  unit_price NUMERIC(12,2) NOT NULL,
  total_amount NUMERIC(12,2) NOT NULL,
  user_id uuid not null default auth.uid (),
  insert_date timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
  update_at timestamp with time zone null,
    constraint line_items_user_id_fkey foreign KEY (user_id) references profiles (id)
);

create extension if not exists moddatetime schema extensions;
create trigger handle_updated_at BEFORE
update on line_items for EACH row
execute FUNCTION extensions.moddatetime ('update_at'); 


alter table public.line_items enable row level security;

create policy "Allow admin ALL to line_items"
 on public.line_items for ALL to authenticated 
 using ( (SELECT authorize()) )
 with check ( (SELECT authorize()) );

create policy "Allow user ALL to line_items"
on public.line_items
as  PERMISSIVE
for ALL
to authenticated
using ( (( SELECT auth.uid() AS uid) = user_id))
with check ( (( SELECT auth.uid() AS uid) = user_id) );



CREATE TABLE line_item_categories (
  line_item_id UUID NOT NULL REFERENCES line_items(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (line_item_id, category_id)
);
alter table public.line_item_categories enable row level security;

create policy "Allow user ALL to line_item_categories"
on public.line_item_categories
as  PERMISSIVE
for ALL
to authenticated
using ( true )
with check ( true);