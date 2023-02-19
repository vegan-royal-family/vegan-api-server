import { MigrationInterface, QueryRunner } from 'typeorm';

export class separateUserProfile1675508947590 implements MigrationInterface {
  name = 'separateUserProfile1675508947590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`nickname\` varchar(20) NOT NULL, \`gender\` enum ('MALE', 'FEMALE', 'UNKNOWN') NOT NULL, \`birth\` varchar(8) NOT NULL, \`veganFor\` json NOT NULL, \`veganLevel\` enum ('completely', 'preferably', 'interest') NOT NULL, \`veganTypeId\` int NOT NULL, \`profileFileId\` bigint NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nickname\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`veganFor\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profileFileId\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`veganLevel\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birth\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`veganTypeId\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isActive\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`isActive\` tinyint NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`veganTypeId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`birth\` varchar(8) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`gender\` enum ('MALE', 'FEMALE', 'UNKNOWN') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`veganLevel\` enum ('completely', 'preferably', 'interest') NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`profileFileId\` bigint NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`veganFor\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`nickname\` varchar(20) NULL`);
    await queryRunner.query(`DROP TABLE \`profile\``);
  }
}
