create table public.categories (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null default auth.uid (),
  name text not null,
  parent_id uuid null,
  constraint categories_pkey primary key (id),
  constraint categories_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint categories_parent_id_fkey foreign KEY (parent_id) references categories (id),
  constraint categories_user_id_fkey1 foreign KEY (user_id) references profiles (id)
);

alter table public.categories enable row level security;

create policy "Allow admin ALL to categories"
 on public.categories for ALL to authenticated 
 using ( (SELECT authorize()) )
 with check ( (SELECT authorize()) );

create policy "Allow user ALL to categories"
on public.categories
as  PERMISSIVE
for ALL
to authenticated
using ( (( SELECT auth.uid() AS uid) = user_id))
with check ( (( SELECT auth.uid() AS uid) = user_id) );