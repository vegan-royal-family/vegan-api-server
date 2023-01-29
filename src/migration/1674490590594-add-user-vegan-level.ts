import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserVeganLevel1674490590594 implements MigrationInterface {
  name = 'addUserVeganLevel1674490590594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`veganLevel\` enum ('completely', 'preferably', 'interest') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`veganLevel\``);
  }
}
