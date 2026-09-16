create table vendors (
  id text primary key,
  name text not null,
  team text default 'Inside Sales',
  active boolean default true
);

create table deals (
  id bigint primary key,
  vendor_id text references vendors(id),
  dealname text,
  pipeline text,
  dealstage text,
  canal text,
  icp text,
  createdate date,
  closedate date,
  is_closed_won boolean default false,
  is_closed_lost boolean default false,
  etapa_anterior text,
  motivo text,
  atraso boolean default false,
  num_tarefas int default 0,
  maior_atraso_dias int default 0,
  synced_at timestamptz default now()
);

create table deal_stage_history (
  id bigint generated always as identity primary key,
  deal_id bigint references deals(id) on delete cascade,
  stage text not null,
  entered_at timestamptz not null,
  exited_at timestamptz
);

create table tasks (
  id bigint primary key,
  deal_id bigint references deals(id) on delete cascade,
  due_date date,
  completion_date date,
  status text
);

create table calls (
  id bigint primary key,
  vendor_id text references vendors(id),
  deal_id bigint references deals(id),
  call_date date not null
);

create table sync_log (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz default now(),
  finished_at timestamptz,
  deals_synced int,
  status text,
  error_message text,
  triggered_by text
);

alter table vendors enable row level security;
alter table deals enable row level security;
alter table deal_stage_history enable row level security;
alter table tasks enable row level security;
alter table calls enable row level security;
alter table sync_log enable row level security;

create policy "Authenticated users can read" on vendors for select using (auth.role() = 'authenticated');
create policy "Authenticated users can read" on deals for select using (auth.role() = 'authenticated');
create policy "Authenticated users can read" on deal_stage_history for select using (auth.role() = 'authenticated');
create policy "Authenticated users can read" on tasks for select using (auth.role() = 'authenticated');
create policy "Authenticated users can read" on calls for select using (auth.role() = 'authenticated');
create policy "Authenticated users can read" on sync_log for select using (auth.role() = 'authenticated');

create policy "Service role can write vendors" on vendors for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role can write deals" on deals for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role can write deal_stage_history" on deal_stage_history for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role can write tasks" on tasks for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role can write calls" on calls for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role can write sync_log" on sync_log for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
