import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { Int } from 'type-graphql';
import { TeamService } from '../teams/team.service';
import { Team } from '../teams/team.model';
import { forwardRef, Inject } from '@nestjs/common';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => TeamService))
    private readonly teamService: TeamService,
  ) {
  }

  @Query(returns => User, { name: 'user', nullable: true })
  async getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @ResolveProperty('teams', returns => [ Team ], { nullable: true })
  async getTeams(@Parent() user: User) {
    return this.teamService.findByIds(
      user.teams.map(team => team.id),
    );
  }
}
