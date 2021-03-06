import {h} from 'preact';
import clsx from 'clsx';
import transitions from "@material-ui/core/styles/transitions";
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import {PureComponent} from "preact/compat";
import PropTypes from "prop-types";

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
});

class MuiVirtualizedTable extends PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, columns, classes } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const transformTransactions = (transactions) =>
    transactions.map(transaction => ({
        status: transaction.attributes.status,
        description: transaction.attributes.description,
        amount: transaction.attributes.amount.value,
        currency: transaction.attributes.foreignAmount?.currencyCode || transaction.attributes.amount.currencyCode,
        createdAt: transaction.attributes.createdAt,
        parentCategory: transaction.relationships.parentCategory?.data?.id || '',
    }))

const Search = ({transactions}) => {

    const transformedTransations = transformTransactions(transactions);

    return (
        <Paper style={{ height: 1000, width: '100%' }}>
            <VirtualizedTable
                rowCount={transformedTransations.length}
                rowGetter={({ index }) => transformedTransations[index]}
                columns={[
                    {
                        width: 80,
                        label: 'Status',
                        dataKey: 'status',
                        numeric: false,
                    },
                    {
                        width: 200,
                        label: 'Date',
                        dataKey: 'createdAt',
                        numeric: false,
                    },
                    {
                        width: 300,
                        label: 'Description',
                        dataKey: 'description',
                        numeric: false,
                    },
                    {
                        width: 100,
                        label: 'Amount',
                        dataKey: 'amount',
                        numeric: true,
                    },
                    {
                        width: 100,
                        label: 'Currency',
                        dataKey: 'currency',
                        numeric: true,
                    },
                    {
                        width: 150,
                        label: 'Category',
                        dataKey: 'parentCategory',
                        numeric: false,
                    },
                ]}
            />
        </Paper>
    );
}

export {Search}
