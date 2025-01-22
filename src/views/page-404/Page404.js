import { Column, Container, Typography } from 'components';

/**
 * 404 page.
 */
const Page404 = () => {
    return (
        <Container
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <Column style={{width: '100%', alignItems: 'center', gap: 0}}>
                <Typography
                    style={{
                        lineHeight: 'min(40vw, 45rem)',
                        fontWeight: 'bold',
                        fontSize: 'min(50vw, 35rem)', 
                        color: 'var(--primary-color)',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    404
                </Typography>
                <Typography
                    style={{
                        fontWeight: 'bold',
                        fontSize: '7vw',
                        color: 'var(--text-color)'
                    }}
                >
                    Page was not found
                </Typography>
            </Column>
        </Container>
    );
}
 
export default Page404;