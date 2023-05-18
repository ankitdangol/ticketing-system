import DeleteTicket from '../DeleteTicket';
import DesktopTicketForum from './DesktopTicketForum';

const TableIcons = (props: any) => {
    return (
        <>
            <DesktopTicketForum selectedRowId={props.selectedRowId} data={props.data} />
            <DeleteTicket selectedRowId={props.selectedRowId} data={props.data} />
        </>
    )
}

export default TableIcons
