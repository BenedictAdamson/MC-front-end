import { v4 as uuid, parse as parseUuid } from 'uuid';
import { Observable, of } from 'rxjs';
import { first, flatMap, map, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameComponent } from '../game/game.component';
import { GameService } from '../game.service';
import { ScenarioComponent } from '../scenario/scenario.component';
import { SelfService } from '../self.service';

@Component({
	selector: 'app-scenario',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

	static getGamesPath(scenario: uuid): string {
		return ScenarioComponent.getScenarioPath(scenario) + '/game/';
	}

	get scenario$(): Observable<uuid> {
		return this.route.parent.paramMap.pipe(
			map(params => params.get('scenario'))
		);
	}

	get games$(): Observable<string[]> {
		return this.scenario$.pipe(
			flatMap(scenario => this.gameService.getGamesOfScenario(scenario))
		);
	}

	constructor(
		private route: ActivatedRoute,
		private readonly router: Router,
		private selfService: SelfService,
		private gameService: GameService
	) { }

	ngOnInit() {
		this.scenario$.pipe(
			tap(scenario => this.gameService.updateGamesOfScenario(scenario))
		).subscribe();
	}

	/**
	 * @description
     * Whether the current user does not have permission to create games.
     *
     * A user that has not been authenticated does not have that permission.
	 */
	get isDisabledCreateGame$(): Observable<boolean> {
		return this.selfService.mayManageGames$.pipe(
			map(mayManage => !mayManage)
		);
	}

	/**
     * Attempts to create a new game for the scenario of this games list.
     * On completion, redirects to the the game page for that game.
	 */
	createGame(): void {
		this.scenario$.pipe(
			first(),// create only 1 game
			flatMap(scenario => this.gameService.createGame(scenario)),
			map(game => game.identifier),
			tap(gameIdentifier => {
				this.gameService.updateGamesOfScenario(gameIdentifier.scenario);
				this.router.navigateByUrl(GameComponent.getGamePath(gameIdentifier));
			})
		).subscribe();
	}
}
