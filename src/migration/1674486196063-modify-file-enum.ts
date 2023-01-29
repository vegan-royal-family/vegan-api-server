import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifyFileEnum1674486196063 implements MigrationInterface {
  name = 'modifyFileEnum1674486196063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`target\` ON \`file\``);
    await queryRunner.query(
      `ALTER TABLE \`file\` CHANGE \`target\` \`target\` enum ('review', 'recipe') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`like\` CHANGE \`target\` \`target\` enum ('restaurant', 'recipe') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`target\` ON \`file\` (\`targetId\`, \`target\`, \`sequence\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`target\` ON \`file\``);
    await queryRunner.query(
      `ALTER TABLE \`like\` CHANGE \`target\` \`target\` enum ('restaurant') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` CHANGE \`target\` \`target\` enum ('default') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`target\` ON \`file\` (\`targetId\`, \`target\`, \`sequence\`)`,
    );
  }
}
