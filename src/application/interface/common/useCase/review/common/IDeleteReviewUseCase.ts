export interface IDeleteReviewUseCase {
  execute(reviewId: string): Promise<boolean>;
}
