import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'password';
        font-style: normal;
        font-weight: 400;
        src: url(/password.ttf);
      }
    `}
  />
)

export default Fonts
