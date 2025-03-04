import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { RegularVoucherResponse } from "../../../common/type/voucher.type";

type Props = {
    rows: RegularVoucherResponse[];
};

const VoucherTable = ({ rows }: Props) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tên khuyến mãi</TableCell>
                        <TableCell align="right">
                            Thời gian thu thập - Thời gian quy đổi
                        </TableCell>
                        <TableCell align="right">Áp dụng cho</TableCell>
                        <TableCell align="right">Ngân sách</TableCell>
                        <TableCell align="right">Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.periodStartTime} đến {row.periodEndTime}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.scope}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {row.budget}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {row.status}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VoucherTable;
