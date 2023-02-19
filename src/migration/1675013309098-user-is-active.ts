import { MigrationInterface, QueryRunner } from 'typeorm';

export class userIsActive1675013309098 implements MigrationInterface {
  name = 'userIsActive1675013309098';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`review\` CHANGE \`IsPublic\` \`isPublic\` tinyint NOT NULL COMMENT '공개 여부' DEFAULT '1'`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`isActive\` tinyint NOT NULL DEFAULT 0`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`nickname\` \`nickname\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` enum ('MALE', 'FEMALE', 'UNKNOWN') NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birth\` \`birth\` varchar(8) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birth\` \`birth\` varchar(8) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` enum ('MALE', 'FEMALE') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`nickname\` \`nickname\` varchar(20) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isActive\``);
    await queryRunner.query(
      `ALTER TABLE \`review\` CHANGE \`isPublic\` \`IsPublic\` tinyint NOT NULL COMMENT '공개 여부' DEFAULT '1'`,
    );
  }
}
