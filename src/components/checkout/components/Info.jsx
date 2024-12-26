import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { formatMoney } from '../../../utils/moneyFomatter';
import {Table, TableBody, TableCell, TableRow } from '@mui/material';

function Info({ course }) {
    const totalPrice = course.reduce((sum, course) => sum + course.price, 0);
    return (
        <React.Fragment>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                {formatMoney(totalPrice)}
            </Typography>
            <Table sx={{ width: '100%' }}>
                
                <TableBody>
                    {Object.values(course).map((product) => (
                        <TableRow key={product.courseId}>
                            <TableCell>
                                <img src={product.thumbnail} alt={product.name} style={{ width: '60px', height: 'auto' }} />
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatMoney(product.price)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

Info.propTypes = {
    course:PropTypes.array,
};

export default Info;