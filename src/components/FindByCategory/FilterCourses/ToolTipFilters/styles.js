
const styles = {
    title: {
        fontWeight: 'bolder',
        fontSize: '18px',
        padding: '10px'
    },
    checkIcon: {
        marginRight: '8px',
    },
    cart: {
        backgroundColor: 'rgb(192, 66, 206)',
        padding: '18px',
        color: '#fff',
        width: '70%',
        height: '50px',
        fontWeight: 'bold',
        '&:hover': {
    backgroundColor: 'rgb(160, 50, 170)', 
    color: '#fff', 
  },
    },
    heart: {
        fontSize: '1.8rem',
        margin: 'auto',
        transition: 'transform 0.3s ease-in-out',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        border: '2px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginLeft: '1.5rem',
    }
}
export default styles