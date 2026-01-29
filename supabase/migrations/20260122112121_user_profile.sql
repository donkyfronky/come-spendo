create type role_type as enum (
  'admin'
);
alter type role_type add value 'user';

create table public.profiles (
  id uuid not null,
  first_name text null,
  last_name text null,
  nickname text null,
  role public.role_type not null default 'user'::role_type,
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
);

alter table public.profiles enable row level security;


create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;


create or replace function public.authorize()
returns boolean as $$
declare
  bind_permissions int;
begin

  select count(*)
  into bind_permissions
  from public.profiles
  where profiles.id = auth.uid()
    and profiles.role = 'admin';
  return bind_permissions > 0;
end;
$$ language plpgsql stable security definer set search_path = ''; 

create policy "user do anything in profiles"
on public.profiles
as  PERMISSIVE
for ALL
to authenticated
using ( (( SELECT auth.uid() AS uid) = id))
with check ( (( SELECT auth.uid() AS uid) = id) );

create policy "Allow admin select profiles"
 on public.profiles for select to authenticated
 using ( (SELECT authorize()) );