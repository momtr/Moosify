import React from 'react'
import {
  Box,
  Card,
  Image,
  Heading,
  Text,
  Button
} from 'rebass'

import { ThemeProvider } from 'emotion-theming'
const theme = {
  fontSizes: [
    12, 14, 16, 24, 32, 48, 64
  ],
  colors: {
    background: 'black',
    primary: 'tomato',
    gray: '#f6f6ff',
  },
  buttons: {
    primary: {
      color: 'white',
      bg: 'primary',
    },
  outline: {
    color: 'primary',
    bg: 'transparent',
    boxShadow: 'inset 0 0 0 2px'
  },
  },
}


export default ({
  image,
  title,
  description
}) =>
  <ThemeProvider theme={theme}>
    <Box width={256}>
    <Card
      sx={{
        p: 1,
        borderRadius: 2,
        boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
      }}>
      <Image src="https://cdn.worldvectorlogo.com/logos/spotify-2.svg" />
      <Box px={2}>
        <Heading as='h3'>
          Moosify Web Application
        </Heading>
        <Text fontSize={0}>
          Hey! Welcome to Moosify
        </Text>
      </Box>
    </Card>
    </Box>
    <Button>Beep</Button>
  </ThemeProvider>
