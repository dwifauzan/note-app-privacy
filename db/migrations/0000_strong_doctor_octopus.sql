CREATE TABLE `note` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`file_path` text NOT NULL,
	`folder` text,
	`word_count` integer DEFAULT 0,
	`is_pinned` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `note_file_path_unique` ON `note` (`file_path`);--> statement-breakpoint
CREATE TABLE `note_link` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`source_id` integer NOT NULL,
	`target_id` integer NOT NULL,
	`name_alias` text,
	FOREIGN KEY (`source_id`) REFERENCES `note`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`target_id`) REFERENCES `note`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `note_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`note_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`note_id`) REFERENCES `note`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_note_tag` ON `note_tags` (`note_id`,`tag_id`);--> statement-breakpoint
CREATE INDEX `note_id_idx` ON `note_tags` (`note_id`);--> statement-breakpoint
CREATE INDEX `tag_id_idx` ON `note_tags` (`tag_id`);--> statement-breakpoint
CREATE TABLE `note_version` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`note_id` integer NOT NULL,
	`history_content` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`note_id`) REFERENCES `note`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`color_tag` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);