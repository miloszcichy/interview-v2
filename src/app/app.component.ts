import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  firstValueFrom,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { PrioritiesApi } from '../service/description/priorities.api';
import { Content } from '../model/content.model';
import { Permission } from '../model/permission.enum';
import { TableContentItem } from '../model/table-content-item.model';
import { User } from '../model/user.model';
import { ContentApi } from '../service/content/content.api';
import { DecodeService } from '../service/decode/decode.service';
import { PermissionsApi } from '../service/permissions/permissions.api';
import { UserApi } from '../service/user/user.api';
import {
  data,
  Request,
  RequestState,
} from '../model/typescript-assignemt-data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  user: User = {} as User;
  contentTableItems: TableContentItem[];
  hasPermission$: Observable<boolean>;
  priorities$: Observable<string>;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userApi: UserApi,
    private contentApi: ContentApi,
    private permissionsApi: PermissionsApi,
    private prioritiesApi: PrioritiesApi,
    private decodeService: DecodeService
  ) {}

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.getUser();
    this.getUserPermission();
    this.getPriorities();
    this.getTableContent();
    this.assignment1();
  }

  /**
   *
   * PART ONE - ANGULAR/RxJs
   *
   */

  /*1.Using UserApi#getCurrentUser() fetch user and assign it to the field user.*/
  private getUser() {
    this.userApi
      .getCurrentUser()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => (this.user = value));
  }
  /*2.Using UserApi#getCurrentUser() and PermissionsApi#getPermissions() create new observable "hasPermission".
      To check whether a user has permission to display content you need both values from UserApi=User and PermissionsApi=UserPermissions.
      Next you need to call UserPermissions#hasPermission(userId, Permission.DISPLAY_CONTENT): boolean.
  */
  private getUserPermission() {
    this.hasPermission$ = combineLatest([
      this.userApi.getCurrentUser(),
      this.permissionsApi.getPermissions(),
    ]).pipe(
      map(([user, permissions]) =>
        permissions.hasPermission(user.id, Permission.DISPLAY_CONTENT)
      )
    );
  }
  /*3.
    -Fetch Content[] from contentApi.
    -Decode "Content#location" and "Content#department" using DecodeService#instant(code: number): Observable<string>
    -Map Content[] to TableContentItem[]:
      TableContentItem class contains two fields: id, description.
      To create TableContentItem#description use pattern "Entry: Content#description, Department: decoded_Department, Location: decoded_Location"
    -Assign the result to field tableContentItems */
  private getTableContent() {
    this.contentApi
      .getContent()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((contentList: Content[]) => {
        Promise.all(
          contentList.map(async (content) => {
            const department = await this.getDecodedValue(content.department);
            const location = await this.getDecodedValue(content.location);
            return this.buildContentTableItem(content, department, location);
          })
        ).then((result) => (this.contentTableItems = result));
      });
  }

  /**4. Use PrioritiesApi#getPriorities and map incoming data to given format:
   * "Priorities: {Priority_1}, {Priority_2}, {Priority_N}"
   * Correctly formatted data assign to field this.priorities$
   * Expected result:
   * Priorities: Very High, Urgent, Do not ignore
   */
  private getPriorities() {
    this.priorities$ = this.prioritiesApi
      .getPriorities()
      .pipe(
        map((priorities) => priorities.reduce((acc, val) => `${acc}, ${val}`))
      );
  }

  private buildContentTableItem(
    { id, description }: Content,
    department,
    location
  ) {
    return {
      id: id,
      description: `Entry: ${description}, Department: ${department}, Location: ${location}`,
    };
  }

  private async getDecodedValue(code: number): Promise<string> {
    return await firstValueFrom(this.decodeService.instant(code));
  }
  /**
   * PART TWO - TYPESCRIPT
   */

  /**
   * 1. Check if every request in state completed or planned has valid status.
   * If yes log to console "success", otherwise log to console a list of all invalid invoices in fromat of {id: n, userId: m}.
   */
  private assignment1() {
    let result = null;
    const condition = this.filterStatus().every(
      (object) => object.invoice.isValid
    );
    if (condition) {
      console.log('success');
    } else {
      result = this.filterStatus()
        .map((object) => object.invoice)
        .filter((object) => !object.isValid)
        .map((object) => {
          return { id: object.id, userId: object.userId };
        });
    }
    console.log(result);
  }
  
  private filterStatus(): Request[] {
    return data.filter((object: Request) =>
      [RequestState.PLANNED, RequestState.COMPLETED].includes(object.state)
    );
  }
}
