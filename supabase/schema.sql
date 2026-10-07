-- Run once in the Supabase SQL editor.
create table papers (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  title text,
  spec jsonb
);
alter table papers enable row level security;
grant select, insert on public.papers to anon;
create policy "anon read" on public.papers for select to anon using (true);
create policy "anon insert" on public.papers for insert to anon with check (true);
