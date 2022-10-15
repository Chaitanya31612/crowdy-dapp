import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "../../material-dashboard-react";

const tableStyle = (theme) => ({
  warningTableHeader: {
    color: warningColor[0],
  },
  primaryTableHeader: {
    color: primaryColor[0],
  },
  dangerTableHeader: {
    color: dangerColor[0],
  },
  successTableHeader: {
    color: successColor[0],
  },
  infoTableHeader: {
    color: infoColor[0],
  },
  roseTableHeader: {
    color: roseColor[0],
  },
  grayTableHeader: {
    color: grayColor[0],
  },
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
    border: '1px solid #988686',
    padding: '3%',
    fontFamily: 'arial',
  },
  tableHeadCell: {
    ...defaultFont,
    '&, &$tableCell': {
      fontSize: '1em',
    },
    width: 'auto',
    color: 'black',
    fontWeight: 'bolder',
  },
  tableCell: {
    ...defaultFont,
    lineHeight: '1.42857143',
    padding: '6px 6px',
    verticalAlign: 'middle',
    fontSize: '0.8125rem',
    width: 'auto',
    border: '1px solid #988686',
    color: 'black',
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  tableHeadRow: {
    height: '56px',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
  tableBodyRow: {
    height: '48px',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
})

export default tableStyle;
