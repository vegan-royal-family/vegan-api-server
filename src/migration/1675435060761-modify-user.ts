import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifyUser1675435060761 implements MigrationInterface {
  name = 'modifyUser1675435060761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`veganFor\` \`veganFor\` json NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`veganLevel\` \`veganLevel\` enum ('completely', 'preferably', 'interest') NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`veganTypeId\` \`veganTypeId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`profileFileId\` \`profileFileId\` bigint NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`profileFileId\` \`profileFileId\` bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`veganTypeId\` \`veganTypeId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`veganLevel\` \`veganLevel\` enum ('completely', 'preferably', 'interest') NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`veganFor\` \`veganFor\` json NOT NULL`);
  }
}
