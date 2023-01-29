import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeRole1674140780398 implements MigrationInterface {
  name = 'removeRole1674140780398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('admin', 'designer', 'user') NOT NULL DEFAULT 'user'`,
    );
  }
}
