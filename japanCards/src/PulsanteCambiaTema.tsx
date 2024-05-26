import { Box, Button, PaletteMode } from "@mui/material"
import { useEffect, useState } from "react"


interface PCTProps {
  toggleTheme: () => void,
  paletteMode: PaletteMode
}


const PulsanteCambiaTema: React.FC<PCTProps> = ({ toggleTheme, paletteMode }) => {
  const [isLightMode, setIsLightMode] = useState<boolean>(paletteMode === 'light')
  useEffect(() => {
    setIsLightMode(paletteMode === 'light')
  }, [paletteMode])

  return (
    <Box sx={{ position: 'absolute', top: 16, right: 16, fontSize: 25 }}>
      <Button  variant="outlined" color="primary" onClick={toggleTheme} sx={{ height: 50, width: '100%' }}>
        {isLightMode ? <>月</> : <>日</>}
      </Button>
    </Box>
  )
}


export default PulsanteCambiaTema
