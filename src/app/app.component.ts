
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { PrioritiesApi } from '../service/description/priorities.api';
import { Content } from '../model/content.model';
import { Permission } from '../model/permission.enum';
import { TableContentItem } from '../model/table-content-item.model';
import { User } from '../model/user.model';
import { ContentApi } from '../service/content/content.api';
import { DecodeService } from '../service/decode/decode.service';
import { PermissionsApi } from '../service/permissions/permissions.api';
import { UserApi } from '../service/user/user.api';
import { data, Request, RequestState} from '../model/typescript-assignemt-data';

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
    ) {
    }

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
        this.assignemnt2();
    }

    /**
     *
     * PART ONE - ANGULAR/RxJs
     *
     */

    /*1.Using UserApi#getCurrentUser() fetch user and assign it to the field user.*/
    private getUser() {
    }

    /*2.Using UserApi#getCurrentUser() and PermissionsApi#getPermissions() create new observable "hasPermission".
        To check whether a user has permission to display content you need both values from UserApi=User and PermissionsApi=UserPermissions.
        Next you need to call UserPermissions#hasPermission(userId, Permission.DISPLAY_CONTENT): boolean.
    */
    private getUserPermission() {
    }

    /*3.
      -Fetch Content[] from contentApi.
      -Decode "Content#location" and "Content#department" using DecodeService#instant(code: number): Observable<string>
      -Map Content[] to TableContentItem[]:
        TableContentItem class contains two fields: id, description.
        To create TableContentItem#description use pattern "Entry: Content#description, Department: decoded_Department, Location: decoded_Location"
      -Assign the result to field tableContentItems */
    private getTableContent() {
    }

    /**4. Use PrioritiesApi#getPriorities and map incoming data to given format:
     * "Priorities: {Priority_1}, {Priority_2}, {Priority_N}"
     * Correctly formatted data assign to field this.priorities$
     * Expected result:
     * Priorities: Very High, Urgent, Do not ignore
     */
    private getPriorities() {
    }

    /**
     * PART TWO - TYPESCRIPT
     */

    /**
     * 1. Check if every request in state completed or planned has valid status.
     * If yes log to console "success", otherwise log to console a list of all invalid invoices in fromat of {id: n, userId: m}.
     */
    private assignment1() {
    }

    /**
     * 2.
     * -Add new Request to existing list (variable data) at position 0.
     * -Find in modified Request list one Request with specific id (e.g. id = 5, or id = 10)
     *  handle case in which there's no Request with given id by returning new Request with (id=10, description='new description', title='new title')
     * -Extract id and title from found Request and log them in console.
     *
     *
     */
    private assignemnt2() {
    }
}