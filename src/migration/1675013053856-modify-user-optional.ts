import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifyUserOptional1675013053856 implements MigrationInterface {
  name = 'modifyUserOptional1675013053856';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }
}
