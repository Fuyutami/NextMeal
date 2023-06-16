import { keyframes } from 'styled-components'

export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

export const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`

export const boxShadowAnim = keyframes`
0% {
    box-shadow: 0px 0px 0px #e3e3e3, 0px 0px 0px #ffffff;
}
20% {
    box-shadow: 0px 0px 0px #e3e3e3, 0px 0px 0px #ffffff;
}
90% {
    box-shadow: 10px 10px 15px #e3e3e3, -10px -10px 15px #ffffff;
}
100% {
    box-shadow: 5px 5px 10px #e3e3e3, -5px -5px 10px #ffffff;
}
`
