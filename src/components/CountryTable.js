import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import numeral from 'numeral';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';

const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

export default function CountryTable({ countriesInfo }) {
    const data = countriesInfo.map((c) => ({
        flag: c.countryInfo.flag,
        country: c.country,
        cases: c.cases,
        recovered: c.recovered,
        deaths: c.deaths,
        // cases: numeral(c.cases).format(),
        // recovered: numeral(c.recovered).format(),
        // deaths: numeral(c.deaths).format(),
    }));

    const columns = [
        {
            title: 'Flag',
            field: 'flag',
            render: (rowData) => <img src={rowData.flag} style={{ width: 50 }} />,
        },
        { title: 'Country', field: 'country' },
        {
            title: 'Cases',
            field: 'cases',
            type: 'numeric',
            defaultSort: 'desc',
            render: (rowData) => <p>{numeral(rowData.cases).format()}</p>,
        },
        {
            title: 'Recovered',
            field: 'recovered',
            type: 'numeric',
            render: (rowData) => <p>{numeral(rowData.recovered).format()}</p>,
        },
        {
            title: 'Deaths',
            field: 'deaths',
            type: 'numeric',
            render: (rowData) => <p>{numeral(rowData.deaths).format()}</p>,
        },
    ];

    return (
        <MaterialTable
            className='country-table'
            style={{ height: '735px', overflowY: 'auto' }}
            icons={tableIcons}
            title='Live Cases By Country'
            columns={columns}
            data={data}
            options={{
                search: false,
                headerStyle: {
                    paddingTop: 0,
                    paddingBottom: 5,
                },
                paging: true,
                pageSize: 8,
            }}
        />
    );
}

// 735
