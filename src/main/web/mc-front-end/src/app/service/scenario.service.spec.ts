import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { v4 as uuid } from 'uuid';

import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AbstractScenarioBackEndService } from './abstract.scenario.back-end.service';
import { HttpScenarioBackEndService } from './http.scenario.back-end.service';
import { NamedUUID } from '../named-uuid';
import { ScenarioService } from './scenario.service';
import { Scenario } from '../scenario';


describe('ScenarioService', () => {
   let httpTestingController: HttpTestingController;

   const SCENARIO_ID_A: string = uuid();
   const SCENARIO_ID_B: string = uuid();
   const CHARACTER_A: NamedUUID = { id: uuid(), title: 'Sergeant' };
   const CHARACTER_B: NamedUUID = { id: uuid(), title: 'Private' };
   const SCENARIO_A: Scenario = new Scenario(
      SCENARIO_ID_A,
      'Section Attack',
      'Basic fire-and-movement tactical training.',
      [CHARACTER_A]
   );
   const SCENARIO_B: Scenario = new Scenario(
      SCENARIO_ID_B,
      'Beach Assault',
      'Fast and deadly.',
      [CHARACTER_A, CHARACTER_B]
   );

   const setUp = (): ScenarioService => {
      TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

      const httpClient: HttpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      const backEnd: AbstractScenarioBackEndService = new HttpScenarioBackEndService(httpClient);
      return new ScenarioService(backEnd);
   };


   it('should be created', () => {
      const service: ScenarioService = setUp();
      expect(service).toBeTruthy();
   });


   it('can get scenario identifiers', () => {
      const scenarios: Scenario[] = [SCENARIO_A, SCENARIO_B];
      const identifiers: NamedUUID[] = scenarios.map(
         scenario => ({ id: scenario.identifier, title: scenario.title })
      );
      const service: ScenarioService = setUp();

      service.getScenarioIdentifiers().subscribe(ids => expect(ids).toEqual(identifiers));

      const request = httpTestingController.expectOne('/api/scenario');
      expect(request.request.method).toEqual('GET');
      request.flush(identifiers);
      httpTestingController.verify();
   });


   const canGetScenario = (testScenario: Scenario) => {
      const id: string = testScenario.identifier;
      const expectedPath: string = HttpScenarioBackEndService.getApiScenarioPath(id);
      const service: ScenarioService = setUp();

      service.get(id).subscribe(scenario => expect(scenario).toEqual(testScenario));

      const request = httpTestingController.expectOne(expectedPath);
      expect(request.request.method).toEqual('GET');
      request.flush(testScenario);
      httpTestingController.verify();
   };

   it('can get [A]', () => {
      canGetScenario(SCENARIO_A);
   });
   it('can get [B]', () => {
      canGetScenario(SCENARIO_B);
   });
});
