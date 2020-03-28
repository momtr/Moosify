import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Text, Box, Link, Heading } from 'rebass'

// https://rebass-v2.now.sh/components/Arrow
// https://github.com/styled-system/styled-system

const theme = {
    fontSizes: [
        12, 14, 16, 24, 32, 48, 64
    ],
    colors: {
        primary: 'white',
        gray: '#f6f6ff',
        background: 'black'
    },
    buttons: {
        primary: {
            color: 'white',
            bg: 'black',
        },
        outline: {
            color: 'primary',
            bg: 'transparent',
            boxShadow: 'inset 0 0 0 2px'
        },
    },
}

class UnderConstruction extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Box
                    color='primary'
                    bg='black'
                    p="10px"
                    fontFamily='Arial'
                    fontWeight='bold'
                    fontSize={[1,2]}
                    textAlign='center'
                >
                    <Heading
                        sx={{
                            color: 'cyan',
                            fontFamily: 'Arial',
                            paddingBottom: '10px'
                        }}>
                        Moosify
                    </Heading>
                    <Text>
                        THIS WEB APP IS UNDER CONSTRUCTION
                    </Text>
                    <Link
                        sx={{
                            ':hover': {
                                color: 'tomato'
                            },
                            ':focus': {
                                outline: 'none'
                            },
                            color: 'primary'
                        }}
                        href="https://github.com/moritzmitterdorfer/Moosify">
                        Please refer to our GitHub repo!
                    </Link>
                </Box>
                
            </ThemeProvider>
        );
    }
}

export default UnderConstruction;