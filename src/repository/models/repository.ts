import { Repository as GqlRepository } from '../../generated/graphql';

export type Repository = Pick<
  GqlRepository,
  'id' | 'name' | 'stargazerCount' | 'forkCount'
>;
