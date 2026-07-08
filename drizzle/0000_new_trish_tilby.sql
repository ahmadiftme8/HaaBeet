CREATE TYPE "public"."frequency_type" AS ENUM('DAILY', 'WEEKLY', 'CUSTOM');--> statement-breakpoint
CREATE TABLE "circle_members" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"circle_id" varchar(36) NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "circle_members_user_id_circle_id_pk" PRIMARY KEY("user_id","circle_id")
);
--> statement-breakpoint
CREATE TABLE "circles" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"invite_code" varchar(20) NOT NULL,
	"owner_id" varchar(36) NOT NULL,
	CONSTRAINT "circles_invite_code_unique" UNIQUE("invite_code")
);
--> statement-breakpoint
CREATE TABLE "habit_entries" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"habit_id" varchar(36) NOT NULL,
	"date" timestamp NOT NULL,
	"completed" boolean DEFAULT false,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "habits" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text,
	"frequency_type" "frequency_type" DEFAULT 'DAILY' NOT NULL,
	"frequency_config" json,
	"is_template" boolean DEFAULT false,
	"is_public" boolean DEFAULT false,
	"user_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "circle_members" ADD CONSTRAINT "circle_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "circle_members" ADD CONSTRAINT "circle_members_circle_id_circles_id_fk" FOREIGN KEY ("circle_id") REFERENCES "public"."circles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "circles" ADD CONSTRAINT "circles_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_entries" ADD CONSTRAINT "habit_entries_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;