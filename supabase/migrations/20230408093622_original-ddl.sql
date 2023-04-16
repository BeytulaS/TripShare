create table user_profiles (
  user_id uuid primary key references auth.users (id) not null,
  age integer CHECK (age >= 18 AND age < 100),
  username text unique not null
  CONSTRAINT proper_username CHECK (username ~* '^[a-zA-ZА-Яа-я ]+$')
  CONSTRAINT username_length CHECK (char_length(username) > 3 and char_length(username) < 30)
);

CREATE TABLE shared_trips (
  id SERIAL PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  starting_city TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  trip_date DATE NOT NULL,
  trip_time TIME NOT NULL,
  info TEXT NOT NULL
);

alter table user_profiles enable row level security;


CREATE POLICY "all can see" ON "public"."user_profiles"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "users can insert" ON "public"."user_profiles"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owners can update" ON "public"."user_profiles"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);

