import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <Box sx={{ display: '', alignItems: 'center', marginBottom: '20px' }}>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/016/462/240/non_2x/empty-shopping-cart-illustration-concept-on-white-background-vector.jpg" 
                    alt="Empty Cart"
                    style={{ width: '400px', height: 'auto', marginRight: '10px' }} 
                />
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    Your cart is empty. Keep shopping to find a course!
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
            >
                Keep Shopping
            </Button>
        </Container>
    );
}

export default EmptyCart;