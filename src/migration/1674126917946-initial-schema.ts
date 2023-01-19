import {MigrationInterface, QueryRunner} from "typeorm";

export class initialSchema1674126917946 implements MigrationInterface {
    name = 'initialSchema1674126917946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`target\` enum ('default') NOT NULL, \`targetId\` varchar(50) NOT NULL, \`name\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`mimeType\` varchar(50) NOT NULL, \`size\` int UNSIGNED NOT NULL, \`sequence\` smallint UNSIGNED NOT NULL DEFAULT '1', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`target\` (\`targetId\`, \`target\`, \`sequence\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`food\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ingredients\` json NOT NULL, \`thumbnailFileId\` bigint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` bigint NOT NULL, \`target\` enum ('restaurant') NOT NULL, \`targetId\` varchar(50) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu\` (\`id\` int NOT NULL AUTO_INCREMENT, \`restaurantId\` bigint NOT NULL, \`title\` varchar(255) NOT NULL, \`price\` int UNSIGNED NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_step\` (\`id\` int NOT NULL AUTO_INCREMENT, \`step\` int UNSIGNED NOT NULL DEFAULT '0', \`description\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`materials\` varchar(255) NOT NULL, \`veganTypeId\` bigint NOT NULL, \`categoryId\` bigint NOT NULL, \`thumbnailFileId\` bigint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`restaurant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`tel\` varchar(50) NOT NULL, \`openTime\` varchar(255) NOT NULL, \`veganTypeId\` bigint NOT NULL, \`categoryId\` bigint NOT NULL, \`url\` varchar(255) NOT NULL, \`star\` double(22) UNSIGNED NOT NULL DEFAULT '0', \`latitude\` double(22) UNSIGNED NOT NULL, \`longitude\` double(22) UNSIGNED NOT NULL, \`reviewCount\` int UNSIGNED NOT NULL DEFAULT '0', \`likeCount\` int UNSIGNED NOT NULL DEFAULT '0', \`visitCount\` int UNSIGNED NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_d8ec90bafca4e22a93a0e66461\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryId\` bigint NOT NULL, \`userId\` bigint NOT NULL, \`visitId\` bigint NOT NULL, \`star\` double(22) UNSIGNED NOT NULL DEFAULT '0', \`content\` varchar(255) NOT NULL, \`IsPublic\` tinyint NOT NULL COMMENT '공개 여부' DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_3d5c1c70c7e0c13e1b2b289a79\` (\`content\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'designer', 'user') NOT NULL DEFAULT 'user', \`nickname\` varchar(20) NOT NULL, \`veganFor\` json NOT NULL, \`veganTypeId\` bigint NOT NULL, \`profileFileId\` bigint NOT NULL, \`reportedCount\` int UNSIGNED NOT NULL DEFAULT '0', \`reviewCount\` int UNSIGNED NOT NULL DEFAULT '0', \`recipeCount\` int UNSIGNED NOT NULL DEFAULT '0', \`likeCount\` int UNSIGNED NOT NULL DEFAULT '0', \`visitCount\` int UNSIGNED NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vegan_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`visit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`visit\``);
        await queryRunner.query(`DROP TABLE \`vegan_type\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_3d5c1c70c7e0c13e1b2b289a79\` ON \`review\``);
        await queryRunner.query(`DROP TABLE \`review\``);
        await queryRunner.query(`DROP INDEX \`IDX_d8ec90bafca4e22a93a0e66461\` ON \`restaurant\``);
        await queryRunner.query(`DROP TABLE \`restaurant\``);
        await queryRunner.query(`DROP TABLE \`recipe\``);
        await queryRunner.query(`DROP TABLE \`recipe_step\``);
        await queryRunner.query(`DROP TABLE \`menu\``);
        await queryRunner.query(`DROP TABLE \`like\``);
        await queryRunner.query(`DROP TABLE \`food\``);
        await queryRunner.query(`DROP INDEX \`target\` ON \`file\``);
        await queryRunner.query(`DROP TABLE \`file\``);
    }

}
