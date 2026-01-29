## Fix RLS of line_item_categorie
In file `20260123053452_line_items_create` create a policy to check the owner of the join like 
```
create policy "Policy with security definer functions"
on "public"."line_item_categories"
as PERMISSIVE
for ALL
to public
using (
  team_id in (select get_teams_for_user(auth.uid()))
);
```
Create a pg function like `get_teams_for_user` in the example to verify the `user_id` value into `categories`

## Checks
- check `ThemeContext` to avoid React issues