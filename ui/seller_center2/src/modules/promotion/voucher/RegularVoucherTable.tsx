import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    activateRegularVoucher,
    deactivateRegularVoucher,
} from "../../../api/voucher.api";
import { VoucherStatus } from "../../../common/enum/voucher.enum";
import { RegularVoucherResponse } from "../../../common/type/voucher.type";
import { formatMoneyVND } from "../../../lib/money.lib";
import {
    getVoucherScopeText,
    getVoucherStatusText,
} from "../../../lib/voucher.lib";

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
                        <TableCell align="left">
                            Thời gian thu thập - Thời gian quy đổi
                        </TableCell>
                        <TableCell align="left">Áp dụng cho</TableCell>
                        <TableCell align="left">Ngân sách</TableCell>
                        <TableCell align="left">Trạng thái</TableCell>
                        <TableCell align="right">Thao tác</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((voucher) => (
                        <VoucherRow
                            voucher={voucher}
                            key={voucher.id}
                        ></VoucherRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

type VoucherRowProps = {
    voucher: RegularVoucherResponse;
};

const VoucherRow = ({ voucher }: VoucherRowProps) => {
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        setActive(voucher.status === VoucherStatus.ACTIVE);
    }, [voucher.status]);

    console.log({ isActive });

    console.log(voucher.status);

    const handleActivateVoucher = async () => {
        toast.promise(activateRegularVoucher(voucher.id), {
            success: () => {
                setActive(true);
                return "Kích hoạt giảm giá thành công";
            },
            error: (error) => {
                console.log(error);
                return "Kích hoạt giảm giá thất bại";
            },
            loading: "Đang kích hoạt giảm giá",
        });
    };

    const handleDeactivateVoucher = async () => {
        toast.promise(deactivateRegularVoucher(voucher.id), {
            success: () => {
                setActive(false);
                return "Tắt giảm giá thành công";
            },
            error: (error) => {
                console.log(error);
                return "Tắt giảm giá thất bại";
            },
            loading: "Đang tắt giảm giá",
        });
    };

    const handleToggleActiveVoucher = async () => {
        if (!isActive) handleActivateVoucher();
        else handleDeactivateVoucher();
    };

    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": {
                    border: 0,
                },
            }}
        >
            <TableCell component="th" scope="row">
                {voucher.name}
            </TableCell>
            <TableCell component="th" scope="row">
                {moment(voucher.periodStartTime).format("DD-MM-YYYY")} đến{" "}
                {moment(voucher.periodEndTime).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell component="th" scope="row">
                {getVoucherScopeText(voucher.scope)}
            </TableCell>

            <TableCell component="th" scope="row">
                {formatMoneyVND(voucher.budget)}
            </TableCell>

            <TableCell component="th" scope="row">
                {getVoucherStatusText(voucher.status)}
            </TableCell>

            <TableCell component="th" scope="row" align="right">
                <Button onClick={handleToggleActiveVoucher}>
                    {isActive ? "Tắt giảm giá" : "Kích hoạt giảm giá"}
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default VoucherTable;
