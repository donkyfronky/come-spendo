-- Function: returns balance for a single user (out=true => negative, out=false => positive)
CREATE OR REPLACE FUNCTION public.user_line_items_balance(p_user_id uuid)
RETURNS numeric
LANGUAGE sql
STABLE
SECURITY INVOKER
AS $$
  SELECT COALESCE(
    SUM(CASE WHEN out THEN -total_amount ELSE total_amount END),
    0
  )
  FROM public.line_items
  WHERE user_id = p_user_id;
$$;
