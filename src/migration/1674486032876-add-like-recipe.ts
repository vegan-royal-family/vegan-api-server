import { MigrationInterface, QueryRunner } from 'typeorm';

export class addLikeRecipe1674486032876 implements MigrationInterface {
  name = 'addLikeRecipe1674486032876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`like\` CHANGE \`target\` \`target\` enum ('restaurant', 'recipe') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`like\` CHANGE \`target\` \`target\` enum ('restaurant') NOT NULL`,
    );
  }
}
