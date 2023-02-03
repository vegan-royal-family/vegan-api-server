import { MigrationInterface, QueryRunner } from 'typeorm';

export class usernameToEmail1675433162605 implements MigrationInterface {
  name = 'usernameToEmail1675433162605';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`username\` \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`email\` \`username\` varchar(255) NOT NULL`,
    );
  }
}
