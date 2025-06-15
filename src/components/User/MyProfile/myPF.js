const styles = {
    styleDiv: {
        padding: '20px',
        backgroundImage: 'url("./src/assets/images/BGProfile.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        color: '#333',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    },
    stylesWelconTypo: {
        fontSize: '36px',
        fontWeight: '700',
        color: '#0056b3',
        marginBottom: '10px',
    },
    stylesHiNameTypo: {
        display: 'inline-block',
        fontFamily: 'monospace',
        fontSize: '28px',
        fontWeight: '600',
        color: '#0056b3',
        marginBottom: '10px',
    },
    stylesIntroduceTypo: {
        fontSize: '22px',
        fontWeight: '600',
        color: '#0056b3',
        marginTop: '10px',
    },
    stylesBox: {
        marginTop: '20px',
        padding: '20px',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
        transition: '0.3s',
        marginLeft:'20vh'
    },
    stylesPublicPF: {
        fontSize: '20px',
        fontWeight: '700',
        textAlign: 'center',
        color: 'black',
        marginBottom: '15px',
    },
    stylesAddInfo:{
        fontSize:'14px',
        fontWeight:'lighter',
        color:'grey'
    },
    stylesTable: {
        width: '100%',
        marginTop: '10px',
        borderCollapse: 'collapse', 
       
        
    },
    stylesTd: {
        padding: '12px',
        fontSize: '16px',
        borderBottom: '1px solid #ccc',
        color: '#555',
    },
    stylesButton: {
        marginTop: '20px',
        backgroundColor: '#0056b3',
        color: '#fff',
        fontWeight: '600',
        display: 'flex',
        justifyContent: 'center',
        textAlign:'center',
        
        '&:hover': {
            backgroundColor: '#004494',
        },
    },
};

export default styles;