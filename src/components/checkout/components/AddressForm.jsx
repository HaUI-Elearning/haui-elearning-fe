
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function AddressForm() {
    return (
        <Grid container spacing={3}>
            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="first-name" required>
                    First name
                </FormLabel>
                <OutlinedInput
                    id="first-name"
                    name="first-name"
                    type="name"
                    placeholder="Thanh"
                    autoComplete="first name"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="last-name" required>
                    Last name
                </FormLabel>
                <OutlinedInput
                    id="last-name"
                    name="last-name"
                    type="last-name"
                    placeholder="Long"
                    autoComplete="last name"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="address1" required>
                    Email
                </FormLabel>
                <OutlinedInput
                    id="address1"
                    name="address1"
                    type="address1"
                    placeholder="abc@gmail.com"
                    autoComplete="shipping address-line1"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="address2">Phone number</FormLabel>
                <OutlinedInput
                    id="address2"
                    name="address2"
                    type="address2"
                    placeholder="0123456789 (optional)"
                    autoComplete="shipping address-line2"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="city" required>
                    City
                </FormLabel>
                <OutlinedInput
                    id="city"
                    name="city"
                    type="city"
                    placeholder="Hanoi"
                    autoComplete="City"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="state" required>
                    State
                </FormLabel>
                <OutlinedInput
                    id="state"
                    name="state"
                    type="state"
                    placeholder="NY"
                    autoComplete="State"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="zip" required>
                    Zip / Postal code
                </FormLabel>
                <OutlinedInput
                    id="zip"
                    name="zip"
                    type="zip"
                    placeholder="12345"
                    autoComplete="shipping postal-code"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="country" required>
                    Country
                </FormLabel>
                <OutlinedInput
                    id="country"
                    name="country"
                    type="country"
                    placeholder="Viet Nam"
                    autoComplete="shipping country"
                    required
                    size="small"
                />
            </FormGrid>
        </Grid>
    );
}