import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Team } from './team.model';
import { TeamService } from './team.service';
import { Int } from 'type-graphql';
import { UserService } from '../users/user.service';
import { forwardRef, Inject } from '@nestjs/common';
import { User } from '../users/user.model';

@Resolver(of => Team)
export class TeamResolver {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly teamService: TeamService,
  ) {
  }

  @Query(returns => Team, { name: 'team', nullable: true })
  async getTeamById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.teamService.findById(id);
  }

  @Mutation(returns => Team, { nullable: true })
  async addMember(
    @Args({ name: 'teamId', type: () => Int }) teamId: number,
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ) {
    return this.teamService.addMember(teamId, userId);
  }

  @Mutation(returns => Team, { nullable: true })
  async removeMember(
    @Args({ name: 'teamId', type: () => Int }) teamId: number,
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ) {
    return this.teamService.removeMember(teamId, userId);
  }

  @ResolveProperty('members', returns => [ User ], { nullable: true })
  async getMembers(@Parent() team: Team) {
    return this.userService.findByIds(
      team.members.map(user => user.id),
    );
  }
}
