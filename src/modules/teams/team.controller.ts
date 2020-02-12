import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {

  constructor(
    private readonly teamService: TeamService,
  ) {
  }

  @Get()
  async getAllTeams() {
    const teams = await this.teamService.findAll();

    return { teams };
  }

  @Get(':id')
  async getTeamById(@Param('id') id: number) {
    const team = await this.teamService.findById(id);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return { team };
  }
}
