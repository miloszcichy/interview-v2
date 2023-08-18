import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class PrioritiesApi {
  public getPriorities(): Observable<string[]> {
    return of(['Very High', 'Urgent', 'Do not ignore']);
  }
}
