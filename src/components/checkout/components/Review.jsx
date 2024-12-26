import * as React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { formatMoney } from '../../../utils/moneyFomatter';
const payments = [
    { name: 'Card type:', detail: 'Visa' },
    { name: 'Card holder:', detail: ' Nguyen Van A' },
    { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date:', detail: '04/2024' },
];

export default function Review({course}) {
    const totalPrice = course.reduce((sum, course) => sum + course.price, 0);
    return (
        <Stack spacing={2}>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Products" secondary={`${course.length} selected`} />
                    <Typography variant="body2">{formatMoney( totalPrice)}</Typography>
                </ListItem>
                
            </List>
            <Divider />
            <Stack
                direction="column"
                divider={<Divider flexItem />}
                spacing={2}
                sx={{ my: 2 }}
            >
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Shipment details
                    </Typography>
                    <Typography gutterBottom>Nguyen Van A</Typography>
                    <Typography gutterBottom sx={{ color: 'text.secondary' }}>
                        Email: nguyenvana@gmail.com
                    </Typography>
                    <Typography>Phone: 0123456789</Typography>
                </div>
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: '100%', mb: 1 }}
                                >
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        {payment.name}
                                    </Typography>
                                    <Typography variant="body2">{payment.detail}</Typography>
                                </Stack>
                            </React.Fragment>
                        ))}
                    </Grid>
                </div>
            </Stack>
        </Stack>
    );
}
Review.propTypes = {
    course:PropTypes.array,
};