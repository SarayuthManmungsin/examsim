import { TableModel } from '@app/models/table/table.model';
import { Endpoints } from '@app/configs/endpoints';
import { TableColumnModel } from '@app/models/table/table-column.model';
import { TableColumnTypes } from '@app/models/table/table-column-types';
import { Strings } from '@app/configs/strings';

export class TableHelper {

    static userTable(): TableModel {
        const columns = [
            new TableColumnModel({
                title: Strings.USER_NAME,
                key: 'username',
                dataType: TableColumnTypes.Text,
                width: 30
            }),
            new TableColumnModel({
                title: Strings.FIRST_NAME,
                key: 'firstName',
                dataType: TableColumnTypes.Text,
                width: 30
            }),
            new TableColumnModel({
                title: Strings.LAST_NAME,
                key: 'lastName',
                dataType: TableColumnTypes.Text,
                width: 30
            })
        ];

        return new TableModel({
            columns: columns,
            sourceUrl: Endpoints.GetAllUsers
        });
    }

    static tenantTable(): TableModel {
        const columns = [
            new TableColumnModel({
                title: Strings.ID,
                key: 'id',
                dataType: TableColumnTypes.Text,
                width: 30
            }),
            new TableColumnModel({
                title: Strings.NAME,
                key: 'name',
                dataType: TableColumnTypes.Text,
                width: 30
            }),
            new TableColumnModel({
                title: Strings.USERS,
                key: 'usersCount',
                dataType: TableColumnTypes.Text,
                width: 30
            })
        ];

        return new TableModel({
            columns: columns,
            sourceUrl: Endpoints.GetAllTenants
        });
    }

    static examTable(): TableModel {
        const columns = [
            new TableColumnModel({
                title: Strings.EXAM_ID,
                key: 'id',
                dataType: TableColumnTypes.Text,
                width: 25
            }),
            new TableColumnModel({
                title: Strings.EXAM_TITLE,
                key: 'title',
                dataType: TableColumnTypes.Text,
                width: 25
            }),
            new TableColumnModel({
                title: Strings.EXAM_ISACTIVE,
                key: 'isActive',
                dataType: TableColumnTypes.Boolean,
                width: 25
            }),
            new TableColumnModel({
                title: Strings.EXAM_TAKE,
                key: 'id',
                dataType: TableColumnTypes.Link,
                width: 25
            })
        ];

        return new TableModel({
            columns: columns,
            sourceUrl: Endpoints.ExamTitles
        });
    }
}
