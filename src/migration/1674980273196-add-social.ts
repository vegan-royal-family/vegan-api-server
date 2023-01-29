import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSocial1674980273196 implements MigrationInterface {
  name = 'addSocial1674980273196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`social\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`socialId\` varchar(255) NOT NULL, \`socialProvider\` varchar(10) NOT NULL, \`socialName\` varchar(255) NULL, \`socialIdToken\` varchar(3000) NULL, \`socialRefreshToken\` varchar(500) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`visit\` DROP COLUMN \`title\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`categoryId\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`visit\` ADD \`userId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`visit\` ADD \`restaurantId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`visit\` ADD \`reviewId\` bigint NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` ADD \`restaurantId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` ADD \`authorId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`recipe_step\` ADD \`recipeId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`authorId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`like\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`like\` ADD \`userId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`restaurantId\``);
    await queryRunner.query(`ALTER TABLE \`menu\` ADD \`restaurantId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`restaurant\` DROP COLUMN \`veganTypeId\``);
    await queryRunner.query(`ALTER TABLE \`restaurant\` ADD \`veganTypeId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`restaurant\` DROP COLUMN \`categoryId\``);
    await queryRunner.query(`ALTER TABLE \`restaurant\` ADD \`categoryId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`visitId\``);
    await queryRunner.query(`ALTER TABLE \`review\` ADD \`visitId\` int NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('super_admin', 'service_admin', 'vegan_admin', 'user') NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`veganTypeId\``);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`veganTypeId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`veganTypeId\``);
    await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`veganTypeId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`categoryId\``);
    await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`categoryId\` int NOT NULL`);
    await queryRunner.query(`DROP INDEX \`target\` ON \`file\``);
    await queryRunner.query(
      `ALTER TABLE \`file\` CHANGE \`target\` \`target\` enum ('food', 'review', 'recipe', 'recipe_step') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`target\` ON \`file\` (\`targetId\`, \`target\`, \`sequence\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`target\` ON \`file\``);
    await queryRunner.query(
      `ALTER TABLE \`file\` CHANGE \`target\` \`target\` enum ('review', 'recipe') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`target\` ON \`file\` (\`targetId\`, \`target\`, \`sequence\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`categoryId\``);
    await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`categoryId\` bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`veganTypeId\``);
    await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`veganTypeId\` bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`veganTypeId\``);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`veganTypeId\` bigint NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`visitId\``);
    await queryRunner.query(`ALTER TABLE \`review\` ADD \`visitId\` bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`restaurant\` DROP COLUMN \`categoryId\``);
    await queryRunner.query(`ALTER TABLE \`restaurant\` ADD \`categoryId\` bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`restaurant\` DROP COLUMN \`veganTypeId\``);
    await queryRunner.query(`ALTER TABLE \`restaurant\` ADD \`veganTypeId\` bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`restaurantId\``);
    await queryRunner.query(`ALTER TABLE \`menu\` ADD \`restaurantId\` bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`like\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`like\` ADD \`userId\` bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`authorId\``);
    await queryRunner.query(`ALTER TABLE \`recipe_step\` DROP COLUMN \`recipeId\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`authorId\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`restaurantId\``);
    await queryRunner.query(`ALTER TABLE \`visit\` DROP COLUMN \`reviewId\``);
    await queryRunner.query(`ALTER TABLE \`visit\` DROP COLUMN \`restaurantId\``);
    await queryRunner.query(`ALTER TABLE \`visit\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`review\` ADD \`userId\` bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` ADD \`categoryId\` bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`visit\` ADD \`title\` varchar(255) NOT NULL`);
    await queryRunner.query(`DROP TABLE \`social\``);
  }
}
