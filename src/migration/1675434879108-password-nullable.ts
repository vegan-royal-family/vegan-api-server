import {MigrationInterface, QueryRunner} from "typeorm";

export class passwordNullable1675434879108 implements MigrationInterface {
    name = 'passwordNullable1675434879108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
    }

}
