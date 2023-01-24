import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyEnum1674552030870 implements MigrationInterface {
    name = 'modifyEnum1674552030870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` enum ('MALE', 'FEMALE') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`birth\` varchar(8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birth\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
    }

}
