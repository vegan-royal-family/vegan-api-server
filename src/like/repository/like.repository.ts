import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { DoUndoLikeInput } from '../dtos/doLike.dto';
import { Like } from '../entity/like.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  getLikeByInput(doLikeInput: DoUndoLikeInput): Promise<Like | undefined> {
    return this.findOne({ where: doLikeInput });
  }

  createLike(doLikeInput: DoUndoLikeInput): Promise<Like> {
    return this.save(this.create(doLikeInput));
  }

  deleteLike({ target, targetId, userId }: DoUndoLikeInput): Promise<DeleteResult> {
    return this.createQueryBuilder('like')
      .delete()
      .where('target = :target', { target })
      .andWhere('targetId = :targetId', { targetId })
      .andWhere('userId = :userId', { userId })
      .execute();
  }
}
