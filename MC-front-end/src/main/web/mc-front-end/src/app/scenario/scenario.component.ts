import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScenarioService } from '../scenario.service';
import { Scenario } from '../scenario';

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {

    scenario: Scenario;

    constructor(
        private route: ActivatedRoute,
        private scenarioService: ScenarioService) { }

    ngOnInit() {
        this.getScenario();
    }


    getScenario(): void {
        const id: string = this.route.snapshot.paramMap.get('id');
        this.scenarioService.getScenario(id)
            .subscribe(scenario => this.scenario = scenario);
    }
}
